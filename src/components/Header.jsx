import React from 'react'
import Navigation from './Navigation.jsx'


const Header = () => {
  return(
    <header className={ 'header' }>
      <h1>{ 'RiST: RItsumeikan Security Team' }</h1>
      <Navigation />
    </header>
  )
}

export default Header
