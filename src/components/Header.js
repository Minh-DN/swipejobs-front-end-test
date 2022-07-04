import React from 'react';
import './Header.css';
import LogoText from '../logo_text.png';

function Header(props) {
  const { firstName, lastName } = props.worker;

  return (
    <div className='header-bar' data-testid="HEADER-BAR">
      <img src={LogoText} alt='swipejobs' data-testid="HEADER-BAR-LOGO"/>
      
      <span className='header-bar__username' data-testid="HEADER-BAR-USERNAME">
        {`${firstName} ${lastName}`}
      </span>
    </div>  
  )
}

export default Header;