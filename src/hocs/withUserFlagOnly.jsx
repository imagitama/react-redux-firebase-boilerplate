import React from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from '../components/loading'
import useViewDocument from '../hooks/useViewDocument'

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

export default (Component, whichFlagName) =>
  connect(mapStateToProps)(({ auth, ...otherProps }) => {
    if (!whichFlagName) {
      return 'Need flag name to restrict access'
    }

    // On fresh load of a page we wait until firebase gets back to us
    if (!auth.isLoaded) {
      return <LoadingIndicator />
    }

    if (!auth.uid) {
      return 'Not logged in (should wrap this component in redirect on not auth HOC)'
    }

    const [isLoading, isErrored, user] = useViewDocument('users', auth.uid)

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (isErrored || !user) {
      return 'Error fetching your details'
    }

    if (user[whichFlagName] !== true) {
      return 'Sorry you cannot access this area as this user'
    }

    return <Component {...otherProps} />
  })
