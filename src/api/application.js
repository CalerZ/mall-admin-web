import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/application/list',
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
export function submitApplication(data) {
  return request({
    url:'/application/submit',
    method:'post',
    data:data
  })
}



export function updateApplication(data) {
  return request({
    url:'/application/update',
    method:'post',
    data:data
  })
}
export function updateApplicationStatus(ids) {
  return request({
    url:'/application/updateStatus',
    method:'post',
    data:ids
  })
}

export function delApplication(id) {
  return request({
    url:'/application/delete/'+id,
    method:'post',
  })
}
export function delApplications(ids) {
  return request({
    url:'/application/delete',
    method:'post',
    data:ids
  })
}

export function getApplication(id) {
  return request({
    url:'/application/'+id,
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
    params:data
  })
}
export function getReviewedApplicationList(data) {
  return request({
    url:'/application/reviewedApplicationList',
    method:'post',
    data:data
  })
}

export function getfinishApplicationList(data) {
  return request({
    url:'/application/finishApplicationList',
    method:'post',
    params:data
  })
}


export function formNo(){
  return request({
    url:'/application/applyFormNo',
    method:'post',
  })
}


export function selectExcelData(data){
  return request({
    url:'/application/selectExcelData',
    method:'post',
    params:data
  })
}

export function finishApplication(data){
  return request({
    url:'/application/finish',
    method:'post',
    data:data
  })
}

export function cancel(id){
  return request({
    url:'/application/cancel/'+id,
    method:'post',
  })
}


