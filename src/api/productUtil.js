import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/putil/list',
    method:'post',
    params:params
  })
}

export function deleteUtil(data) {
  return request({
    url:'/putil/delete/'+data,
    method:'post',
  })
}

export function deleteUtils(data) {
  return request({
    url:'/putil/delete',
    method:'post',
    data:data
  })
}

export function createUtil(data) {
  return request({
    url:'/putil/insert',
    method:'post',
    data:data
  })
}

export function updateUtil(id,data) {
  return request({
    url:'/putil/update',
    method:'post',
    data:data
  })
}
export function updateUtilStatus(data) {
  return request({
    url:'/putil/update',
    method:'post',
    data:data
  })
}
export function getUtil(id) {
  return request({
    url:'/putil/'+id,
    method:'get'
  })
}

export function fetchAllList() {
  return request({
    url:'/putil/list',
    method:'get',
  })
}

