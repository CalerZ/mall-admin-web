import request from '@/utils/request'

export function fetchListAll(params) {
  return request({
    url: '/company/list',
    method: 'get',
    params: params
  })
}

export function companyAll() {
  return request({
    url: '/company/list',
    method: 'get',
    
  })
}

export function fetchList(params) {
  return request({
    url: '/company/list',
    method: 'post',
    params: params
  })
}

export function createCompany(data) {
  return request({
    url: '/company/insert',
    method: 'post',
    data: data
  })
}

export function updateCompany(id, data) {
  return request({
    url: '/company/update',
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/company/update',
    method: 'post',
    data: params
  })
}

export function deleteCompany(id) {
  return request({
    url: '/company/delete/' + id,
    method: 'post'
  })
}

export function getCompany(id) {
  return request({
    url: '/company/' + id,
    method: 'get'
  })
}



