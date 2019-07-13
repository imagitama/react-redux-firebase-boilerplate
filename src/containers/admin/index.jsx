import React from 'react'
import { connect } from 'react-redux'
import withAdminsOnly from '../../hocs/withAdminsOnly'

const AdminContainer = () => (
  <div>Admin only area. You must have isAdmin=true in users collection.</div>
)

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
})

export default connect(mapStateToProps)(withAdminsOnly(AdminContainer))
