import React from 'react'
import Navigation from './Navigation.jsx'


const Header = () => {
  return(
    <header className={ 'header' }>
      <Navigation />
      <h1>{ 'RiST: Ritsumeikan Security Team' }</h1>
    </header>
  )
}

export default Header
