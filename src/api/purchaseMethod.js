import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/purchase/list',
    method:'post',
    data:params
  })
}
export function createPurchaseMethod(data) {
  return request({
    url:'/purchase/insert',
    method:'post',
    data:data
  })
}
export function updatePurchaseMethodStatus(data) {
  return request({
    url:'/purchase/update',
    method:'post',
    data:data
  })
}

export function deletePurchaseMethod(id) {
  return request({
    url:'/purchase/delete/'+id,
    method:'post',
  })
}
export function deletePurchaseMethods(ids) {
  return request({
    url:'/purchase/delete',
    method:'post',
    data:ids
  })
}

export function getPurchaseMethod(id) {
  return request({
    url:'/purchase/'+id,
    method:'get',
  })
}

export function updatePurchaseMethod(id,data) {
  return request({
    url:'/purchase/update',
    method:'post',
    data:data
  })
}

export function fetchaAllList() {
  return request({
    url:'/purchase/list',
    method:'get',
  })
}

