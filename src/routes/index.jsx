import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Home from '../components/Home.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer'
import Activities from '../components/Activities'
import Navigation from '../components/Navigation.jsx'

const Routes = () => {
  return (
    <Router>
      <Route>
        <div>
          <Navigation />
          <Header />
          <main className={ 'container' }>
            <Route path={ '/' } component={ Home } exact />
            <Route path={ '/about' } component={ About } exact />
            <Route path={ '/contact' } component={ Contact } exact />
            <Route path={ '/activities' } component={ Activities } exact/>
          </main>
        <Footer />
        </div>
      </Route>
    </Router>
  )
}

export default Routes