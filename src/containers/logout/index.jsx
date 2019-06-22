import React, { useEffect } from 'react'
import { logout } from '../../firebase'
import * as routes from '../../routes'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'

const Logout = ({ history: { push } }) => {
  useEffect(() => {
    logout()

    setTimeout(() => push(routes.home), 1500)
  }, [push])

  return <>You are now logged out. Redirecting you to homepage...</>
}

export default withRedirectOnNotAuth(Logout)
