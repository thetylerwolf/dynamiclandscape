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
import Maps from '../layouts/Maps'


export class Routes extends Component {

  // componentDidMount() {
  //   if(this.props.location.hash) {

  //   }
  // }

  render() {

    return (
          <main>
            <TransitionGroup>
              <CSSTransition
                key={ this.props.location.key }
                mountOnEnter={ true }
                unmountOnExit={ true }
                timeout={ 300 }
                classNames="page-level"
              >
                <HashRouter location={ this.props.location }>
                  <Switch>
                    <Route path="/" exact component={ Home }/>
                    <Route path="/maps" exact component={ Maps }/>
                    <Route path="*" component={ Home }/>
                  </Switch>
                </HashRouter>
              </CSSTransition>
            </TransitionGroup>
          </main>

    )

  }

}

const RoutesWithRouter = withRouter(Routes)

export { RoutesWithRouter }
