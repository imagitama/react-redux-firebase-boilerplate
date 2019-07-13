import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PageHeader from './components/header'
import PageFooter from './components/footer'
import * as routes from './routes'
import * as containers from './containers'

const App = () => (
  <>
    <PageHeader />
    <main className="main">
      <Switch>
        <Route exact path={routes.login} component={containers.login} />
        <Route exact path={routes.logout} component={containers.logout} />
        <Route exact path={routes.myAccount} component={containers.myAccount} />
        <Route exact path={routes.admin} component={containers.admin} />
        <Route exact path={routes.home} component={containers.home} />
      </Switch>
    </main>
    <PageFooter />
  </>
)

export default App
