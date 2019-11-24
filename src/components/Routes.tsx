import React, { Component } from 'react'
import {
  Route,
  Switch,
  HashRouter
} from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import Home from '../layouts/Home'
// import Maps from '../layouts/Maps'


interface props {
  location: any
}

const Routes = ({ location }: props) => {

  return (
    <main>
      <TransitionGroup>
        <CSSTransition
          key={ location.key }
          mountOnEnter={ true }
          unmountOnExit={ true }
          timeout={ 300 }
          classNames="page-level"
        >
          <HashRouter>
            <Switch>
              <Route path="/" exact component={ Home }/>
              {/* <Route path="/maps" exact component={ Maps }/> */}
              <Route path="*" component={ Home }/>
            </Switch>
          </HashRouter>
        </CSSTransition>
      </TransitionGroup>
    </main>
  )
  
}

const RoutesWithRouter = withRouter(Routes)

export { RoutesWithRouter }
