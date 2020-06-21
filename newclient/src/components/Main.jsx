import React, { useState, useContext } from 'react';
import NewMap from './NewMap';
import PieChart from './PieChart';
import TwitterFeed from './TwitterFeed';
import MainData from './MainData';
import CasesList from './CasesList';

import '../styles/main.css';

const Main = () => {
  return (
    <main className='main-container'>
      <section className='right-container'>
        <MainData />
        <CasesList />
      </section>
      <section className='left-container'>
        <NewMap />
        <PieChart />
        <TwitterFeed />
      </section>
    </main>
  );
};

export default Main;
