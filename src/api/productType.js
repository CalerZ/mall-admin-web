import request from '@/utils/request'
export function fetchList(parentId,params) {
  return request({
    url:'/ptype/list/'+parentId,
    method:'post',
    data:params
  })
}

export function deleteProductCate(id) {
  return request({
    url:'/ptype/delete/'+id,
    method:'post'
  })
}

export function deleteProductCates(ids) {
  return request({
    url:'/ptype/delete',
    method:'post',
    data:ids
  })
}

export function createProductCate(data) {
  return request({
    url:'/ptype/insert',
    method:'post',
    data:data
  })
}

export function updateProductCate(id,data) {
  return request({
    url:'/ptype/update',
    method:'post',
    data:data
  })
}

export function getProductCate(id) {
  return request({
    url:'/ptype/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/ptype/update',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/ptype/update/navStatus',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    url:'/ptype/list/withChildren',
    method:'get'
  })
}



export function fetchAllList() {
  return request({
    url:'/ptype/list',
    method:'get',
  })
}

export function fetchTreeList() {
  return request({
    url:'/ptype/treeList',
    method:'get'
  })
}
