import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

export default Component =>
  connect(mapStateToProps)(({ auth, ...otherProps }) => {
    return <Component auth={auth} {...otherProps} />
  })
