import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as routes from '../../routes'
import LoginForm from '../../components/login-form'
import withRedirectOnAuth from '../../hocs/withRedirectOnAuth'

const Login = ({ push }) => (
  <>
    <h1>Login</h1>
    <LoginForm onSuccess={() => push(routes.home)} />
  </>
)

export default connect(
  null,
  { push }
)(withRedirectOnAuth(Login))
