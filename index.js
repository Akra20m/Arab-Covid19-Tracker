const express = require('express');
const cors = require('cors');
const sslRedirect = require('heroku-ssl-redirect');
const { json } = require('body-parser');
const Axios = require('axios');
const cron = require('node-cron');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env' });
}

const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);
client.auth(process.env.REDIS_PASSWORD);

client.on('error', function (error) {
  console.error(error);
});

const slug = [
  'algeria',
  'bahrain',
  'comoros',
  'djibouti',
  'egypt',
  'iraq',
  'jordan',
  'kuwait',
  'lebanon',
  'libya',
  'mauritania',
  'morocco',
  'oman',
  'palestine',
  'qatar',
  'saudi-arabia',
  'somalia',
  'sudan',
  'syria',
  'tunisia',
  'united-arab-emirates',
  'yemen'
];

const app = express();
app.use(cors());
app.use(json());

cron.schedule('0 */2 * * *', () => {
  //running a task every two hours at minute 0.
  let result = Axios.get('https://api.covid19api.com/summary')
    .then((res) => {
      const { Countries } = res.data;
      let modifiedCountries = {};
      let now = new Date();

      Countries.forEach((item) => {
        if (slug.includes(item.Slug)) {
          modifiedCountries[item.Country] = item;
        }
      });

      const msg = client.set(
        'key',
        JSON.stringify({ modifiedCountries, dateNow: now }),
        redis.print
      );
    })
    .catch((err) => {
      console.log(err.response);
    });
});

// enable ssl redirect
app.use(sslRedirect());

app.get('/api/', (req, res) => {
  client.get('key', (err, reply) => {
    res.send(reply);
  });
});

app.all('/api/*', (req, res) => {
  res.status(404).send({ msg: 'Not Found' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('listening on port 5000');
});
