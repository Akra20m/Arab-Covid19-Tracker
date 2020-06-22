import React from 'react';

const TwitterFeed = () => {
  return (
    <div className='twitterfeed-container'>
      <a
        className='twitter-timeline'
        data-lang='ar'
        data-width='400'
        data-height='500'
        href='https://twitter.com/WHO_Arabic?ref_src=twsrc%5Etfw'
      >
        Tweets by WHO_Arabic
      </a>
    </div>
  );
};

export default TwitterFeed;
