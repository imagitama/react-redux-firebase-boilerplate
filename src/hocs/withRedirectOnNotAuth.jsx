import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import * as routes from '../routes'

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

const mapDispatchToProps = { push }

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withRouter(({ auth, push, ...otherProps }) => {
      useEffect(() => {
        // On fresh load of a page we wait until firebase gets back to us
        if (!auth.isLoaded) {
          return
        }

        if (!auth.uid) {
          push(routes.login)
        }
      }, [auth, push])

      if (!auth || !auth.uid) {
        return null
      }

      return <Component {...otherProps} />
    })
  )
