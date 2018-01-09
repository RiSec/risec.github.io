import React from 'react'
import { Jumbotron } from 'react-bootstrap'



const Header = () => {
  return(
    <div className={ 'header' }>
      <Jumbotron className={ 'jumbotron-header' }>
        <a href={ 'https://twitter.com/realRiST' }>
          <img
            src={ 'https://pbs.twimg.com/profile_images/851792500469583872/Tu-tDb5J_400x400.jpg' }
            width='230'
            height='230'
          />
        </a>
        <h2 className={ 'header-name' }>{ 'RiST: Ritsumeikan Security Team' }</h2>
      </Jumbotron>
    </div>
  )
}

export default Header
