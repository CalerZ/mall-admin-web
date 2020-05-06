import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/application/list',
    method:'post',
    params:params
  })
}

export function fetchSimpleList(params) {
  return request({
    url:'/application/simpleList',
    method:'get',
    params:params
  })
}

export function updateDeleteStatus(params) {
  return request({
    url:'/application/update',
    method:'post',
    data:params
  })
}

export function updateNewStatus(params) {
  return request({
    url:'/application/update/newStatus',
    method:'post',
    params:params
  })
}

export function updateRecommendStatus(params) {
  return request({
    url:'/application/update/recommendStatus',
    method:'post',
    params:params
  })
}

export function updatePublishStatus(params) {
  return request({
    url:'/application/update/publishStatus',
    method:'post',
    params:params
  })
}

export function createApplication(data) {
  return request({
    url:'/application/insert',
    method:'post',
    data:data
  })
}

export function updateApplication(id,data) {
  return request({
    url:'/application/update',
    method:'post',
    data:data
  })
}

export function getApplication(id) {
  return request({
    url:'/application/'+id,
    method:'get',
  })
}

export function fetchPurchaseMethodList() {
  return request({
    url:'/application/purchaseMethod',
    method:'get',
  })
}


export function getApplicationProductList(data) {
  return request({
    url:'/application/applicationProductList',
    method:'post',
    data:data
  })
}
export function getMyApplicationList(data) {
  return request({
    url:'/application/myApplicationList',
    method:'post',
    data:data
  })
}
export function getReviewedApplicationList(data) {
  return request({
    url:'/application/reviewedApplicationList',
    method:'post',
    data:data
  })
}


