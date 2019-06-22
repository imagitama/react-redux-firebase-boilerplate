export const DO_SOMETHING = 'DO_SOMETHING'
export const doSomething = someVar => ({
  type: DO_SOMETHING,
  payload: {
    someVar
  }
})
