import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import LOADING from '../images/loading.gif';
import { CountryContext } from '../contexts/CountryContext';

import '../styles/normalize.css';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [currentdate, setDateNow] = useState('');
  const [currentStyle, setStyle] = useState('');

  const getData = async () => {
    try {
      const response = await Axios.get('/api/');
      const { modifiedCountries, dateNow } = response.data;
      setDateNow(dateNow);
      setCountries(Object.values(modifiedCountries));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const changeStyle = (styleName) => {
    setStyle(styleName);
  };

  return (
    <div className={'page ' + currentStyle}>
      {countries ? (
        <CountryContext.Provider
          value={{ countries, currentdate, currentStyle }}
        >
          <Header changeStyle={changeStyle} />
          <Main />
          <Footer />
        </CountryContext.Provider>
      ) : (
        <div className='loading'>
          <img className='loading-icon' src={LOADING} />
        </div>
      )}
    </div>
  );
};

export default App;
