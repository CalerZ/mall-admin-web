import request from '@/utils/request'
export function exportList(data) {
  return request({
    url:'/info/exportExcel',
    method:'post',
    data:data,
    responseType: 'arraybuffer' // 表明返回服务器返回的数据类型
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


