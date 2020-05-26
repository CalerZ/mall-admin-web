import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/product/list',
    method:'post',
    params:params
  })
}
//发布的物料
export function releaseList(params) {
  return request({
    url:'/product/releaseList',
    method:'post',
    params:params
  })
}

export function fetchSimpleList(params) {
  return request({
    url:'/product/simpleList',
    method:'get',
    params:params
  })
}

export function updateDeleteStatus(params) {
  return request({
    url:'/product/update/deleteStatus',
    method:'post',
    params:params
  })
}

export function  deleteProducts(ids){
  return request({
    url:'/product/delete',
    method:'delete',
    data:ids
  })
}
export function  deleteProduct(id){
  return request({
    url:'/product/delete/'+id,
    method:'post',
  })
}


export function updateNewStatus(params) {
  return request({
    url:'/product/update/newStatus',
    method:'post',
    params:params
  })
}

export function updateRecommendStatus(params) {
  return request({
    url:'/product/update/recommendStatus',
    method:'post',
    params:params
  })
}

export function updatePublishStatus(params) {
  return request({
    url:'/product/updateStatus',
    method:'post',
    params:params
  })
}

export function createProduct(data) {
  return request({
    url:'/product/insert',
    method:'post',
    data:data
  })
}

export function updateProduct(data) {
  return request({
    url:'/product/update',
    method:'put',
    data:data
  })
}

export function getProduct(id) {
  return request({
    url:'/product/'+id,
    method:'get',
  })
}

export function fetchPurchaseMethodList() {
  return request({
    url:'/product/purchaseMethod',
    method:'get',
  })
}


export function getApplicationProductList(data) {
  return request({
    url:'/product/applicationProductList',
    method:'post',
    data:data
  })
}

export function partNo(data) {
  return request({
    url:'/product/productNo',
    method:'post',
    params:data
  })
}


