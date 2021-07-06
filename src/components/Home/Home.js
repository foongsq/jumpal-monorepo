import React from 'react';
import './Home.css';
import quote1 from '../../images/quote-1.jpg';
import quote2 from '../../images/quote-2.jpg';
import quote3 from '../../images/quote-3.jpg';
import quote4 from '../../images/quote-4.jpg';
import quote5 from '../../images/quote-5.jpg';
import quote6 from '../../images/quote-6.jpg';
import quote7 from '../../images/quote-7.jpg';

export default class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h2 style={{textAlign:'center'}}>Motivational Quotes</h2>
        <img src={quote1} className='motivation-img' alt='' />
        <img src={quote2} className='motivation-img' alt='' />
        <img src={quote3} className='motivation-img' alt='' />
        <img src={quote4} className='motivation-img' alt='' />
        <img src={quote5} className='motivation-img' alt='' />
        <img src={quote6} className='motivation-img' alt='' />
        <img src={quote7} className='motivation-img' alt='' />
      </div>
    );
  }
}