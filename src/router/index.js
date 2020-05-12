import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '物品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '物品列表', icon: 'product-list'}
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '添加物品', icon: 'product-add'}
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '修改物品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'viewProduct',
        name: 'viewProduct',
        component: () => import('@/views/pms/product/view'),
        meta: {title: '查看物品', icon: 'product-add'},
        hidden: true
      },

      //物品类型
      {
        path: 'productTypeList',
        name: 'productTypeList',
        component: () => import('@/views/pms/productType/index'),
        meta: {title: '物品分类', icon: 'product-cate'}
      },
      {
        path: 'addProductType',
        name: 'addProductType',
        component: () => import('@/views/pms/productType/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateProductType',
        name: 'updateProductType',
        component: () => import('@/views/pms/productType/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },

      //单位
      {
        path: 'productUtilList',
        name: 'productUtilList',
        component: () => import('@/views/pms/productUtil/index'),
        meta: {title: '物品单位', icon: 'product-attr'}
      },
      {
        path: 'addProductUtil',
        name: 'addProductUtil',
        component: () => import('@/views/pms/productUtil/add'),
        meta: {title: '添加物品单位'},
        hidden: true
      },
      {
        path: 'updateProductUtil',
        name: 'updateProductUtil',
        component: () => import('@/views/pms/productUtil/update'),
        meta: {title: '修改物品单位'},
        hidden: true
      },

      //供应商
      {
        path: 'supplierList',
        name: 'supplierList',
        component: () => import('@/views/pms/supplier/index'),
        meta: {title: '供应商管理', icon: 'product-brand'}
      },
      {
        path: 'addSupplier',
        name: 'addSupplier',
        component: () => import('@/views/pms/supplier/add'),
        meta: {title: '添加供应商'},
        hidden: true

      },
      {
        path: 'updateSupplier',
        name: 'updateSupplier',
        component: () => import('@/views/pms/supplier/update'),
        meta: {title: '修改供应商'},
        hidden: true

      },
      //采购方式
      {
        path: 'purchaseMethodList',
        name: 'purchaseMethodList',
        component: () => import('@/views/pms/purchaseMethod/index'),
        meta: {title: '采购方式管理', icon: 'product-brand'}
      },
      {
        path: 'addPurchaseMethod',
        name: 'addPurchaseMethod',
        component: () => import('@/views/pms/purchaseMethod/add'),
        meta: {title: '添加采购方式'},
        hidden: true

      },
      {
        path: 'updatePurchaseMethod',
        name: 'updatePurchaseMethod',
        component: () => import('@/views/pms/purchaseMethod/update'),
        meta: {title: '修改采购方式'},
        hidden: true

      },

    ]
  },
  {
    path: '/apply',
    component: Layout,
    redirect: '/apply/applicationFormList',
    name: 'apply',
    meta: {title: '申请', icon: 'order'},
    children: [
      {
        path: 'addApplication',
        name: 'addApplication',
        component: () => import('@/views/oms/application/add'),
        meta: {title: '物品申请单', icon: 'product-add'},
      },
      {
        path: 'productViewList',
        name: 'productViewList',
        component: () => import('@/views/oms/application/productViewList'),
        meta: {title: '物品查看列表'},
        hidden: true
      },
      {
        path: 'applicationFormList',
        name: 'applicationFormList',
        component: () => import('@/views/oms/application/index'),
        meta: {title: '我的申请', icon: 'product-list'}
      },
      {
        path: 'updateApplication',
        name: 'updateApplication',
        component: () => import('@/views/oms/application/update'),
        meta: {title: '更新申请单'},
        hidden: true
      },
      {
        path: 'reviewedApplicationFormList',
        name: 'reviewedApplicationFormList',
        component: () => import('@/views/oms/reviewedAppllication/index'),
        meta: {title: '待审核单据', icon: 'product-list'}
      },
      {
        path: 'updateReviewedApplication',
        name: 'updateReviewedApplication',
        component: () => import('@/views/oms/reviewedAppllication/update'),
        meta: {title: '修改审核单据', icon: 'product-list'},
        hidden:true
      },
      {
        path: 'allApplicationFormList',
        name: 'allApplicationFormList',
        component: () => import('@/views/oms/allAppllication/index'),
        meta: {title: '单据监控', icon: 'product-list'}
      },
    ]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/export',
    name: 'info',
    meta: {title: '信息', icon: 'sms'},
    children: [
      {
        path: 'export',
        name: 'export',
        component: () => import('@/views/sms/export/index'),
        meta: {title: '物品信息导出', icon: 'sms-flash'}
      },
      {
        path: 'importProduct',
        name: 'importProduct',
        component: () => import('@/views/sms/import/index'),
        meta: {title: '导入物品信息', icon: 'sms-flash'}
      },
      {
        path: 'importApplication',
        name: 'importApplication',
        component: () => import('@/views/sms/applyImport/index'),
        meta: {title: '申请单导入', icon: 'sms-flash'}
      },

    ]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '权限', icon: 'ums'},
    children: [

      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'adduser',
        name: 'adduser',
        component: () => import('@/views/ums/admin/adduser'),
        hidden:true
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {title: '资源列表', icon: 'ums-resource'}
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/ums/company/index'),
        meta: {title: '公司列表', icon: 'ums-admin'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      },
      {
        path: 'sysDictList',
        name: 'sysDictList',
        component: () => import('@/views/ums/sysDict/index'),
        meta: {title: '字典列表',icon: 'ums-resource'},
      },
      {
        path: 'addSysDict',
        name: 'addSysDict',
        component: () => import('@/views/ums/sysDict/add'),
        meta: {title: '添加'},
        hidden: true
      },
      {
        path: 'updateSysDict',
        name: 'updateSysDict',
        component: () => import('@/views/ums/sysDict/update'),
        meta: {title: '修改'},
        hidden: true
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/apidoc',
    name: 'sys',
    meta: {title: '系统', icon: 'ums'},
    children: [

      {
        path: 'apidoc',
        name: 'apidoc',
        component: () => import('@/views/sys/api/index'),
        meta: {title: 'API接口文档', icon: 'ums-admin'}
      },
      {
        path: 'database',
        name: 'database',
        component: () => import('@/views/sys/database/index'),
        meta: {title: '数据库监控', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '系统日志'},
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {title: '系统监控'},
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  // base: '/psdweb',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

