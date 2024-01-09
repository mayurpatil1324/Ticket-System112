import fetch from 'auth/FetchMasterInterceptor'

const masterService = {}

masterService.getTicket = function (data) {
  return fetch({
    url: '/ticket/list',
    method: 'post',
    data:data
  })
}
masterService.addTicket = function (data) {
  return fetch({
    url: '/ticket/create',
    method: 'post',
    data:data
  })
}
masterService.editTicket = function (data) {
  return fetch({
    url: '/ticket/update',
    method: 'post',
    data:data
  })
}
masterService.deleteTicket = function (data) {
  return fetch({
    url: '/ticket/delete',
    method: 'post',
    data:data
  })
}
    
    
export default masterService