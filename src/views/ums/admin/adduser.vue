<template>

<el-main >
      <el-form :model="form"
               ref="#"
               label-width="150px" size="small" style="width:40%;margin-left:28%">
        <el-form-item label="帐号：">
          <el-input v-model="admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="admin.nickname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="admin.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="公司：">
          <el-select v-model="admin.companyId" placeholder="请选择" size="small" style="width: 34%">
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="admin.password" type="password" style="width: 250px"></el-input>
        </el-form-item>

        <el-form-item label="备注：">
          <el-input v-model="admin.note"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="admin.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        
      </el-form>
         <el-button @click="dialogVisible = false" style="margin-left:34%;width:150px" size="medium " >取 消</el-button> 
         <el-button type="primary" @click="handleDialogConfirm()" size="medium " style="margin-left:2%;width:150px">确 定</el-button>
        
  </el-main>
   
</template>

<script>
//import {fetchList, createAdmin, updateAdmin, updateStatus, deleteAdmin, getRoleByAdmin, allocRole} from '@/api/login';
 // import {fetchAllRoleList} from '@/api/role';
  //import {formatDate} from '@/utils/date';
  import {fetchListAll} from '@/api/company';


  let that;
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null
  };
  const defaultAdmin = {
    id: null,
    username: null,
    password: null,
    nickname: null,
    email: null,
    gender: 1,
    companyId: null,
    note: null,
    status: 1
  };
  export default {
    name: 'adminList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        admin: Object.assign({}, defaultAdmin),
        isEdit: false,
        allocDialogVisible: false,
        allocRoleIds: [],
        allRoleList: [],
        allocAdminId: null,
        companyList: []
      }
    },
    created(){
          this.dialogVisible = true;
        this.isEdit = false;
       // this.admin = Object.assign({}, defaultAdmin);
    }
    }
</script>

<style>

</style>