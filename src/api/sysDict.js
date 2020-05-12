import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/sysDict/list',
    method:'post',
    params:data,
  })
}
export function insert(data) {
  return request({
    url:'/sysDict/insert',
    method:'post',
    data:data
  })
}
export function updateStatus(data) {
  return request({
    url:'/sysDict/update',
    method:'post',
    data:data
  })
}

export function del(id) {
  return request({
    url:'/sysDict/delete/'+id,
    method:'post',
  })
}
export function dels(ids) {
  return request({
    url: '/sysDict/delete',
    method:'post',
    data:ids
  })
}

export function get(id) {
  return request({
    url:'/sysDict/'+id,
    method:'get',
  })
}

export function update(data) {
  return request({
    url:'/sysDict/update',
    method:'post',
    data:data
  })
}

export function fetchaAllList() {
  return request({
    url:'/sysDict/list',
    method:'get',
  })
}

