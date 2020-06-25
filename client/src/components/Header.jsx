import React, { useContext } from 'react';
import { CountryContext } from '../contexts/CountryContext';

import '../styles/header.css';

const Header = ({ changeStyle }) => {
  const { currentStyle } = useContext(CountryContext);
  return (
    <header>
      <nav className={currentStyle}>
        <div className='nav-custom'>
          <p>كوفيد-19 الوطن العربي</p>
          <div className='theme-container'>
            <p>لون الخلفية</p>
            <div
              className='theme-item first-theme'
              onClick={() => {
                changeStyle('');
              }}
            ></div>
            <div
              className='theme-item second-theme'
              onClick={() => {
                changeStyle('style1');
              }}
            ></div>
            <div
              className='theme-item third-theme'
              onClick={() => {
                changeStyle('style2');
              }}
            ></div>
          </div>
        </div>
      </nav>
      <div className={'page-title'}>
        <h1 className={currentStyle === 'style2' && 'style2'}>
          إحصائيات انتشار فايروس كورونا (كوفيد-19) في البلدان العربية
        </h1>
      </div>
    </header>
  );
};

export default Header;
