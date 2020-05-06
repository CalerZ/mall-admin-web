import request from '@/utils/request'
export function fetchList(cid,params) {
  return request({
    url:'/putil/list',
    method:'post',
    data:params
  })
}

export function deleteProductAttr(data) {
  return request({
    url:'/putil/delete/'+data,
    method:'post',
  })
}

export function createProductAttr(data) {
  return request({
    url:'/putil/insert',
    method:'post',
    data:data
  })
}

export function updateProductAttr(id,data) {
  return request({
    url:'/putil/update',
    method:'post',
    data:data
  })
}
export function getProductAttr(id) {
  return request({
    url:'/putil/'+id,
    method:'get'
  })
}

export function getProductAttrInfo(productCategoryId) {
  return request({
    url:'/putil/attrInfo/'+productCategoryId,
    method:'get'
  })
}


