import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const styles = {
    flex: {
      display: 'inline',
      padding: '0 5px',
    }
  }

  return (
    <nav>
      <ul>
        <li style={ styles.flex }><Link to={ '/' }>{ 'Home' }</Link></li>
        <li style={ styles.flex }><Link to={ '/about' }>{ 'About' }</Link></li>
        <li style={ styles.flex }><Link to={ '/member' }>{ 'Member' }</Link></li>
        <li style={ styles.flex }><Link to={ '/contact' }>{ 'Contact' }</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation
