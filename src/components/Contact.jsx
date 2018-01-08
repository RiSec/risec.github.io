import React from 'react'

const Link = () => {
  return (
    <div className={ 'link container' }>
      <h2>Contact</h2>
      <ul>
        <li>
          { 'GitHub  => ' }
          <a href={ 'https://github.com/risec' } target="_blank">
            { 'RiSec' }
          </a>
        </li>
        <li>
          { 'Mail    => ' }
          { 'rits.sec (at) gmail.com' }
        </li>
        <li>
          { 'Twitter => ' }
          <a href={ 'https://twitter.com/realRiST' } target="_blank">
            { 'realRiST' }
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Link
