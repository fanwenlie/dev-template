const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  isPc: state => state.app.isPc,
  isMobile: state => state.app.isMobile,
  serverTime: state => state.app.serverTime,
}
export default getters
