import React, { useContext, useState, useEffect } from 'react';
import { CountryContext } from '../contexts/CountryContext';

import '../styles/main.css';

const MainData = () => {
  const { countries, currentStyle } = useContext(CountryContext);
  const [cases, setCasese] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  useEffect(() => {
    let result = [0, 0, 0];
    countries.map((country) => {
      result[0] += country.TotalConfirmed;
      result[1] += country.TotalDeaths;
      result[2] += country.TotalRecovered;
    });
    setCasese(result[0]);
    setDeaths(result[1]);
    setRecovered(result[2]);
  }, []);
  return (
    <div className={'data-container ' + currentStyle}>
      <div className='data-col'>
        <h2>إجمالي الإصابات</h2>
        <p>{cases.toLocaleString('ar-EG')}</p>
      </div>
      <div className='data-col'>
        <h2>إجمالي المتعافين</h2>
        <p>{recovered.toLocaleString('ar-EG')}</p>
      </div>
      <div className='data-col'>
        <h2>إجمالي الوفيات</h2>
        <p>{deaths.toLocaleString('ar-EG')}</p>
      </div>
    </div>
  );
};

export default MainData;
