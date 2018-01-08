import React from 'react'
import { render as reactRender } from 'react-dom'
import { AppContainer as HMRContainer } from 'react-hot-loader'
import App from './routes'
import 'styles/style.css'


/**
 * render React App
 * @param  {ReactComponent} Component React Component
 * @return {void}
 */
const render = Component =>
  reactRender(
    <HMRContainer>
      <Component />
    </HMRContainer>,
    document.getElementById('app')
  )

// Go!
render(App)

// Hot Module Replacement settings
if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default
    render(NextApp)
  })
}
