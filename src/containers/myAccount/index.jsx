import React from 'react'
import { connect } from 'react-redux'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'

const MyAccountContainer = ({ auth }) => <div>Hello, {auth.uid}!</div>

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
})

export default connect(mapStateToProps)(
  withRedirectOnNotAuth(MyAccountContainer)
)
