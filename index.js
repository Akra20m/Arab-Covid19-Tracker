const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const Axios = require('axios');
const cron = require('node-cron');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

require('dotenv').config({ path: './.env' });

const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);
client.auth(process.env.REDIS_PASSWORD);

client.on('error', function (error) {
  console.error(error);
});

const countryCodes = [
  'DZ',
  'BH',
  'KM',
  'DJ',
  'EG',
  'IQ',
  'JO',
  'KW',
  'LB',
  'LY',
  'MR',
  'MA',
  'OM',
  'PS',
  'QA',
  'SA',
  'SO',
  'SD',
  'SY',
  'TN',
  'AE',
  'YE'
];

// const mongoose = require('mongoose');

// const { authRoute } = require('./src/routes/auth');

// const path = require('path');
// const User = require('./src/models/user');

// require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(json());
// app.use(authRoute);

cron.schedule('*/30 * * * *', () => {
  console.log('running a task every minute');
  let result = Axios.get('https://api.covid19api.com/summary')
    .then((res) => {
      const { Countries } = res.data;
      let modifiedCountries = {};

      Countries.forEach((item) => {
        if (countryCodes.includes(item.CountryCode)) {
          modifiedCountries[item.Country] = item;
        }
      });

      const msg = client.set(
        'key',
        JSON.stringify(modifiedCountries),
        redis.print
      );
    })
    .catch((err) => {
      console.log(err.response);
    });
});

app.get('/', (req, res) => {
  client.get('key', (err, reply) => {
    res.send(reply);
  });
});

// app.all('/api/*', (req, res) => {
//   res.status(404).send({ msg: 'Not Found' });
// });

// try {
//   mongoose.connect(
//     process.env.DB_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//     () => {
//       console.log('connected to db');
//     }
//   );
// } catch (err) {
//   console.error(err);
// }

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   });
// }

app.listen(process.env.PORT || 4000, () => {
  console.log('listening on port 4000');
});
