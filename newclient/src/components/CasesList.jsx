import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { CountryContext } from '../contexts/CountryContext';
import { translateName } from '../helper';

const CasesList = () => {
  const { countries, currentStyle } = useContext(CountryContext);
  return (
    <div className={'list-container ' + currentStyle}>
      <h2>الحالات لكل دولة</h2>
      <Tabs direction={'rtl'}>
        <TabList className='tab-list'>
          <Tab className={'tab-button ' + currentStyle}>إصابة</Tab>
          <Tab className={'tab-button ' + currentStyle}>وفاة</Tab>
          <Tab className={'tab-button ' + currentStyle}>تعافي</Tab>
        </TabList>
        <TabPanel>
          <ul className={'result-list ' + currentStyle}>
            {countries.map((country) => (
              <li key={country.CountryCode} className='result-entry'>
                <div className='country-name'>
                  {translateName[country.Slug]}
                </div>
                <div>{country.TotalConfirmed.toLocaleString('ar-EG')}</div>
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul className={'result-list ' + currentStyle}>
            {countries.map((country) => (
              <li key={country.CountryCode} className='result-entry'>
                <div className='country-name'>
                  {translateName[country.Slug]}
                </div>
                <div>{country.TotalDeaths.toLocaleString('ar-EG')}</div>
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul className={'result-list ' + currentStyle}>
            {countries.map((country) => (
              <li key={country.CountryCode} className='result-entry'>
                <div className='country-name'>
                  {translateName[country.Slug]}
                </div>
                <div>{country.TotalRecovered.toLocaleString('ar-EG')}</div>
              </li>
            ))}
          </ul>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CasesList;
