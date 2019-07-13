import withUserFlagOnly from './withUserFlagOnly'

export default Component => withUserFlagOnly(Component, 'isAdmin')
