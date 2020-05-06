import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/supplier/list',
    method:'post',
    data:params
  })
}
export function createSupplier(data) {
  return request({
    url:'/supplier/insert',
    method:'post',
    data:data
  })
}
export function updateSupplierStatus(data) {
  return request({
    url:'/supplier/update',
    method:'post',
    data:data
  })
}

export function deleteSupplier(id) {
  return request({
    url:'/supplier/delete/'+id,
    method:'post',
  })
}
export function deleteSuppliers(ids) {
  return request({
    url:'/supplier/delete',
    method:'post',
    data:ids
  })
}

export function getSupplier(id) {
  return request({
    url:'/supplier/'+id,
    method:'get',
  })
}

export function updateSupplier(id,data) {
  return request({
    url:'/supplier/update',
    method:'post',
    data:data
  })
}

export function fetchaAllList() {
  return request({
    url:'/supplier/list',
    method:'get',
  })
}

