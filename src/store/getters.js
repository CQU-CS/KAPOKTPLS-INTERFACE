const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  map: state => state.user.map,
  basicAs: state => state.user.basicAs,
  tradeAs: state => state.user.tradeAs,
  vehicleFixAs: state => state.user.vehicleFixAs,
  schedulerAs: state => state.user.schedulerAs,
  exhibitionAs: state => state.user.exhibitionAs,
}
export default getters
