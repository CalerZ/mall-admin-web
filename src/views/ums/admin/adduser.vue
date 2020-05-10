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
      <el-card style="padding-top: 5%;">
        <el-form-item label="帐号：" prop="username" >
          <el-input
            v-model="listQuery.username"
            style="width: 250px;" v-on:blur='sureUsername'
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="nickname">
          <el-input
            v-model="listQuery.nickname"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="listQuery.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="listQuery.phone" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱："
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="listQuery.email" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="公司：" porp="companyIds" >
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
        <el-form-item label="密码：" prop="password">
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
      </el-card>
    </el-form>

    <el-button
      @click="dialogVisible = false"
      style="margin-left: 34%; width: 150px; margin-top: 30px;"
      size="medium "
      >取 消</el-button
    >
    <el-button
      type="primary"
      @click="getPeopleData()"
      size="medium "
      style="margin-left: 2%; width: 150px; margin-top: 30px;"
      >确 定</el-button
    >
  </el-main>
</template>

<script>
//import {fetchList, createAdmin, updateAdmin, updateStatus, deleteAdmin, getRoleByAdmin, allocRole} from '@/api/login';
import { addPeople, getCompany,getOnePeopelUsername} from "@/api/people";
import { formatDate } from "@/utils/date";
//引入自定义校验规则
//import {isvalidUsername} from '/vaildata'
//import {fetchListAll} from '@/api/company';
let that;

export default {
  name: "adminList",
  data() {
    var validUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (!this.isvalidUsername(value)) {
        callback(
          new Error(
            "账号由字母和数字组成,必须存在字母 长度为3-15"
          )
        );
      }
    };

    return {
      
      listQuery: {
        companyList: [],
        companyIds:'',
        companyId: null,
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
        username: [
          { required: true, validator: validUsername, trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
         
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // 这个只能验证手机号
          // { pattern:/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: "请输入合法手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "输入密码不能为空", trigger: "blur" },
          { type: "string", message: "请输入密码" },
        ],
        
        companyIds: [
          { required: true, message: "请选择公司", trigger: "change" },
         
        ],
      },
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
    //账号填写后失去焦点验证用户名是否重复
    sureUsername:function(){
     if(this.listQuery.username==''){
    
     }else{
        getOnePeopelUsername(this.listQuery.username).then((response)=>{
    if(response.data.data==true){
    }else{
    this.$message('账号重复');
    }



})
     }
     


    },
    isvalidUsername: function (str) {
      const reg = /^(?![^A-Za-z]+$)[0-9A-Za-z_]{3,15}$/;
      return reg.test(str);
    },
    //获取公司的名称
    getCompanys: function () {
      getCompany().then((response) => {
        this.listQuery.companyList = response.data;
        console.log(response.data);
      });
    },

    //提交用户数据
    getPeopleData: function () {
      let data = {
        birthday: "",
        city: "",
        companyId: this.listQuery.companyId,
        createTime: "",
        email: this.listQuery.email,
        gender: this.listQuery.gender,
        id: 0,
        job: "",
        lastLoginTime: "",
        memberLevelId: 0,
        nickname: this.listQuery.nickname,
        note: this.listQuery.note,
        password: this.password,
        phone: this.listQuery.phone,
        status: this.listQuerystatus,
        username: this.listQuery.username,
      };
      console.log(data);
      //添加用户
      addPeople(data).then((response) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.$router.push({ path: "/ums/admin" });
      });
    },
  },
  //获取时间
  getdata: function () {
    let date = new Date();
    this.createTime = formatDate(date, "yyyy-MM-dd hh:mm:ss");
  },
};
</script>

<style>
.from-border {
  border: 1px solid #f2f2f2;
}
</style>
