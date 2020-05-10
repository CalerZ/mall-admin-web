<template>
  <el-main>
    
    <el-form
    :model="listQuery"
      ref="listQuery"
      label-width="150px"
      size="small"
      style="width: 40%; margin-left: 28%;"
      :rules="rules"
    >
   
      <el-form-item label="帐号：" prop="username">
        <el-input v-model="listQuery.username" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="nickname">
        <el-input v-model="listQuery.nickname" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio-group v-model="listQuery.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="listQuery.phone" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="listQuery.email" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item label="公司：">
        <el-select
          v-model="listQuery.companyId"
          placeholder="请选择"
          size="small"
          style="width: 34%;"
        >
          <el-option
            v-for="item in listQuery.companyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input
          v-model="listQuery.password"
          type="password"
          style="width: 250px;"
        ></el-input>
      </el-form-item>

      <el-form-item label="备注：">
        <el-input
          v-model="listQuery.note"
          type="textarea"
          :rows="5"
          style="width: 250px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-radio-group v-model="listQuery.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
       
    </el-form>
    <el-button
      @click="dialogVisible = false"
      style="margin-left: 34%; width: 150px;"
      size="medium "
      >取 消</el-button
    >
    <el-button
      type="primary"
      @click="getPeopleData()"
      size="medium "
      style="margin-left: 2%; width: 150px;"
      >确 定</el-button
    >
   
  </el-main>
</template>

<script>
//import {fetchList, createAdmin, updateAdmin, updateStatus, deleteAdmin, getRoleByAdmin, allocRole} from '@/api/login';
import { addPeople, getCompany } from "@/api/people";
import { formatDate } from "@/utils/date";
//import {fetchListAll} from '@/api/company';
let that;

export default {
  name: "adminList",
  data() {
    return {
     listQuery: {
       
      companyList:[],

      companyId:null,
      createTime: "",
      email: "",
      gender: 1,

      nickname: "",
      note: "",
      password: "",
      phone: "",
      status: 0,
      username: "",
     },
      // list: null,
      ///total: null,
      //listLoading: false,
      // dialogVisible: false,
    
      // isEdit: false,
      // allocDialogVisible: false,
      // allocRoleIds: [],
      // allRoleList: [],
      // allocAdminId: null,
      // companyList: []
      rules: {
          'username': [
            {required: false, message: '请输入账号', trigger: 'blur'},
            {type: 'number', message: '账号为英文字母'}

          ],
          'nickname': [
            {required: false, message: '请输入姓名', trigger: 'blur'},
            {type: 'string', message: '姓名为汉字'}
          ],
          'stock.onHandInventory': [
            {required: false, message: '请输入现有库存', trigger: 'blur'},
            {type: 'number', message: '现有库存必须为数字值'}
          ],
          'stock.reportedQuantity': [
            {required: false, message: '请输入本月提报数量', trigger: 'blur'},
            {type: 'number', message: '本月提报数量必须为数字值'}
          ],
          'stock.prodLineMembers': [
            {required: false, message: '请输入生产线人数', trigger: 'blur'},
            {type: 'number', message: '生产线人数必须为数字值'}
          ],
      }

    };
  },
  created() {
    let date = new Date();
    this.createTime = formatDate(date, "yyyy-MM-dd hh:mm:ss");
    //页面加载的时候获取公司的名称
    this.getCompanys();
 
    this.dialogVisible = true;
    this.isEdit = false;
   
    // this.admin = Object.assign({}, defaultAdmin);
  },
  methods: {
    //获取公司的名称
    getCompanys: function () {
      getCompany().then((response) => {
        this.listQuery.companyList = response.data;
        console.log(response.data);
      });
    },
    
    //提交用户数据
    getPeopleData: function () {


  
      let data={
	"birthday": "",
	"city": "",
	"companyId": this.listQuery.companyId,
	"createTime":"",
	"email": this.listQuery.email,
	"gender": this.listQuery.gender,
	"id": 0,
	"job": "",
	"lastLoginTime": "",
	"memberLevelId": 0,
	"nickname": this.listQuery.nickname,
	"note": this.listQuery.note,
	"password": this.password,
	"phone": this.listQuery.phone,
	"status": this.listQuerystatus,
	"username": this.listQuery.username
}
      console.log(data);
//添加用户
addPeople(data).then((response)=>{
     this.$message({
              type: 'success',
              message: '添加成功!'
            });
         this.$router.push({path: '/ums/admin'})


})
    },
  },
  //获取时间
  getdata: function () {
    let date = new Date();
    this.createTime = formatDate(date, "yyyy-MM-dd hh:mm:ss");
  },
};
</script>

<style></style>
