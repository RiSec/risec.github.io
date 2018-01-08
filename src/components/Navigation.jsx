import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Navigation = () => {

// TODO: awesome-font導入, navbar-brandアイコン作成

  return (
    <Navbar className={ 'navigation-bar' }>
      <Navbar.Header>
        <Navbar.Brand>
          {/* navbar-brandをどうにかする */}
          <Link to={ '/' } className={ 'navbar-brand' }>{ 'りすと' }</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1}>
            <Link to={ '/' } className={ 'navbar-prop' } >{ 'Home' }</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to={ '/about' } className={ 'navbar-prop' }>{ 'About' }</Link>
          </NavItem>
          <NavItem eventKey={3}>
            <Link to={ '/contact' } className={ 'navbar-prop' }>{ 'Contact' }</Link>
          </NavItem>
          <NavItem eventKey={4}>
            <Link to={ '/activities' } className={ 'navbar-prop' }>{ 'Activities' }</Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
