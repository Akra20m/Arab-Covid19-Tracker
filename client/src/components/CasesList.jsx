import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { CountryContext } from '../contexts/CountryContext';
import { translateName } from '../helper';

const CasesList = () => {
  const { countries, currentStyle } = useContext(CountryContext);
  const sortedCountriesConfirmed = countries
    .slice()
    .sort((a, b) => parseInt(b.TotalConfirmed) - parseInt(a.TotalConfirmed));
  const sortedCountriesRecovered = countries
    .slice()
    .sort((a, b) => parseInt(b.TotalRecovered) - parseInt(a.TotalRecovered));
  const sortedCountriesDeaths = countries
    .slice()
    .sort((a, b) => parseInt(b.TotalDeaths) - parseInt(a.TotalDeaths));

  return (
    <div className={'list-container ' + currentStyle}>
      <h2>الحالات لكل دولة</h2>
      <Tabs direction={'rtl'}>
        <TabList className='tab-list'>
          <Tab className={'tab-button ' + currentStyle}>إصابة</Tab>
          <Tab className={'tab-button ' + currentStyle}>تعافي</Tab>
          <Tab className={'tab-button ' + currentStyle}>وفاة</Tab>
        </TabList>
        <TabPanel>
          <ul className={'result-list ' + currentStyle}>
            {sortedCountriesConfirmed.map((country) => (
              <li
                key={country.CountryCode}
                className={'result-entry ' + currentStyle}
              >
                <div
                  className={
                    'country-name ' + currentStyle === 'style2' && 'style2'
                  }
                >
                  {translateName[country.Slug]}
                </div>
                <div>{country.TotalConfirmed.toLocaleString('ar-EG')}</div>
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul className={'result-list ' + currentStyle}>
            {sortedCountriesRecovered.map((country) => (
              <li
                key={country.CountryCode}
                className={'result-entry ' + currentStyle}
              >
                <div
                  className={
                    'country-name ' + currentStyle === 'style2' && 'style2'
                  }
                >
                  {translateName[country.Slug]}
                </div>
                <div>{country.TotalRecovered.toLocaleString('ar-EG')}</div>
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul className={'result-list ' + currentStyle}>
            {sortedCountriesDeaths.map((country) => (
              <li
                key={country.CountryCode}
                className={'result-entry ' + currentStyle}
              >
                <div
                  className={
                    'country-name ' + currentStyle === 'style2' && 'style2'
                  }
                >
                  {translateName[country.Slug]}
                </div>
                <div>{country.TotalDeaths.toLocaleString('ar-EG')}</div>
              </li>
            ))}
          </ul>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CasesList;
