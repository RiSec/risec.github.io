import React from 'react'

const Member = () => {
  return (
    <div className={ 'member' }>
      <h2>Team member</h2>
      <p>
        <ul>
          {/* test */}
          <li>{ 'RiST => ' }
            <a href={ 'https://twitter.com/realRiST' } target="_blank">
              { 'realRiST' }
            </a>
          </li>
        </ul>
      </p>
    </div>
  )
}

export default Member
