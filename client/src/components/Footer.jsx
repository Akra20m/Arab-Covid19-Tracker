import React, { useContext } from 'react';
import dateFormat from 'dateformat';
import { CountryContext } from '../contexts/CountryContext';

import '../styles/footer.css';

const Footer = () => {
  const { currentdate, currentStyle } = useContext(CountryContext);

  return (
    <footer>
      <div className={'footer-container ' + currentStyle}>
        <div className='footer-custom'>
          <p>
            جميع الحقوق محفوظة. مصدر البيانات من
            <a
              className={currentStyle === 'style2' && 'style2'}
              href='https://github.com/CSSEGISandData/COVID-19'
            >
              Johns Hopkins CSSE
            </a>
            باستخدام{' '}
            <a
              className={currentStyle === 'style2' && 'style2'}
              href='https://covid19api.com/'
            >
              COVID 19 API
            </a>
          </p>
          <p>
            آخر تحديث في
            <span className={currentStyle === 'style2' && 'style2'}>
              {dateFormat(currentdate, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
