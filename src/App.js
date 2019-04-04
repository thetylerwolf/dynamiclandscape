import React, { Component } from 'react'
import {
  Router,
} from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'

import { RoutesWithRouter as Routes } from './components/Routes'

const history = createHistory()
history.listen((location, action) => {
  window.gtag('config', 'UA-137717045-1', {
    'page_title' : location.pathname,
    'page_path': location.pathname
  });
})

export default class App extends Component {

  render() {
    return (

      <Router history={ history }>
        <Routes />
      </Router>

    )

  }

}
