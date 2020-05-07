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
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '物品分类', icon: 'product-cate'}
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {title: '物品单位', icon: 'product-attr'},
        hidden: true
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {title: '物品单位列表'},
        hidden: true
      },
      {
        path: 'productUtil',
        name: 'productUtil',
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
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {title: '添加物品单位'},
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {title: '修改物品单位'},
        hidden: true
      },
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
        hidden:true

      },
      {
        path: 'updateSupplier',
        name: 'updateSupplier',
        component: () => import('@/views/pms/supplier/update'),
        meta: {title: '修改供应商'},
        hidden:true

      },
      {
        path: 'purchaseMethodList',
        name: 'purchaseMethodList',
        component: () => import('@/views/pms/purchaseMethod/index'),
        meta: {title: '采购方式管理',icon: 'product-brand'}
      },
      {
        path: 'addPurchaseMethod',
        name: 'addPurchaseMethod',
        component: () => import('@/views/pms/purchaseMethod/add'),
        meta: {title: '添加采购方式'},
        hidden:true

      },
      {
        path: 'updatePurchaseMethod',
        name: 'updatePurchaseMethod',
        component: () => import('@/views/pms/purchaseMethod/update'),
        meta: {title: '修改采购方式'},
        hidden:true

      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '编辑品牌'},
        hidden: true
      }
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
        meta: {title: '物品申请单',icon: 'product-add'},
      },
      {
        path: 'productViewList',
        name: 'productViewList',
        component: () => import('@/views/oms/application/productViewList'),
        meta: {title: '物品查看列表'},
        hidden:true
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
        hidden:true
      },
      {
        path: 'reviewedApplicationFormList',
        name: 'reviewedApplicationFormList',
        component: () => import('@/views/oms/reviewedAppllication/index'),
        meta: {title: '待审核单据', icon: 'product-list'}
      },
      {
        path: 'allApplicationFormList',
        name: 'allApplicationFormList',
        component: () => import('@/views/oms/allAppllication/index'),
        meta: {title: '单据监控', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
    ]
  },
  {
    path:'/info',
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
        path: 'import',
        name: 'import',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '导入物品信息', icon: 'sms-flash'}
      },
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '申请单导入', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '秒杀时间段列表'},
        hidden:true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择'},
        hidden:true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden:true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'},
        hidden:true
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden:true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden:true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden:true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'},
        hidden:true
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'},
        hidden:true
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'},
        hidden:true
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'},
        hidden:true
      },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {title: '广告列表', icon: 'sms-ad'},
        hidden:true
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {title: '添加广告'},
        hidden:true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {title: '编辑广告'},
        hidden:true
      }
    ]
  },
  {
    path:'/ums',
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
        meta: {title: '字典列表'},
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
    path:'/sys',
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
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '菜单列表', icon: 'ums-menu'},
        hidden: true
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
        meta: {title: '资源列表', icon: 'ums-resource'},
        hidden: true
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/ums/company/index'),
        meta: {title: '公司列表', icon: 'ums-admin'},
        hidden: true
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

