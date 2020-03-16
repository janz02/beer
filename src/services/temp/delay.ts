// TODO: Only for simulating async actions, api calls
export const delay = (retval = {}, ms = 2000): Promise<unknown> =>
  new Promise(resolve => {
    console.log('mocked delayed api call', retval)
    setTimeout(() => {
      resolve(retval)
    }, ms)
  })
