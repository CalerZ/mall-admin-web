import request from "@/utils/request";
export function addPeople(data) {
  //添加用户
  return request({
    url: "/member/insert",
    method: "post",
    data: data,
  });
}
export function getCompany() {
  //获取所有的公司
  return request({
    url: "/company/list",
    method: "get",
  });
  
}
//验证账号是否存在

export function getOnePeopelUsername(username) {
  //获取所有的公司
  return request({
    url: "/member/checkName?username="+username,
    method: "get",
   
  });
  
}