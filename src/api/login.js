import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/member/list',
    method: 'get',
    params: params
  })
}
export function fetchAllList() {
  return request({
    url: '/member/listAll',
    method: 'get',
  })
}

export function createAdmin(data) {
  return request({
    url: '/member/insert',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/member/update',
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/member/update/',
    method: 'post',
    data: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/member/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/member/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/member/role/update',
    method: 'post',
    data: data
  })
}
