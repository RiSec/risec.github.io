import React from 'react'

const Footer = () => {
  const styles = {
    bottom: 0,
    height: '5em',
    position: 'absolute',
  }

  return (
    <footer style={ styles }>
      <p><small>{ 'Copyright (C) 2016-2017 RiST All rights reserved.' }</small></p>
    </footer>
  )
}

export default Footer
