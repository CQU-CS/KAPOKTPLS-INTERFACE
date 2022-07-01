const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  map: state => state.user.map,
  basicAs: state => state.user.basicAs,
}
export default getters
