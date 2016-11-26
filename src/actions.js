export default {
  nextStep: () => ({
    type: 'NEXT'
  }),
  prevStep: () => ({
    type: 'PREVIOUS'
  }),
  setLocation: (router) => {
    return {
      type: 'LOCATION_CHANGE',
      router
    }
  }
}
