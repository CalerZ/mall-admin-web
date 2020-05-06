import request from '@/utils/request'

export function fetchList(parentId, params) {
  return request({
    url: '/menu/list/' + parentId,
    method: 'post',
    params: params
  })
}

export function deleteMenu(id) {
  return request({
    url: '/menu/delete/' + id,
    method: 'post'
  })
}

export function createMenu(data) {
  return request({
    url: '/menu/insert',
    method: 'post',
    data: data
  })
}

export function updateMenu(id, data) {
  return request({
    url: '/menu/update' ,
    method: 'post',
    data: data
  })
}

export function getMenu(id) {
  return request({
    url: '/menu/' + id,
    method: 'get',
  })
}

export function updateHidden(id, params) {
  return request({
    url: '/menu/update',
    method: 'post',
    data: params
  })
}

export function fetchTreeList() {
  return request({
    url: '/menu/treeList',
    method: 'get'
  })
}

