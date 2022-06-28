import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
  roles: ['admin','editor']    control the page roles (you can set multiple roles)
  title: 'title'               the name show in sidebar and breadcrumb (recommend set)
  icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
  breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
  activeMenu: '/basic/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '主页',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/basic',
    component: Layout,
    redirect: '/basic/staff',
    name: 'basic',
    meta: {
      title: '基本信息管理',
      icon: 'el-icon-document'
    },
    children: [{
        path: 'staff',
        name: 'staff',
        component: () => import('@/views/basic/staff'),
        meta: {
          title: '人员信息',
          icon: 'el-icon-user'
        }
      },
      {
        path: 'vehicle',
        name: 'vehicle',
        component: () => import('@/views/basic/vehicle'),
        meta: {
          title: '车辆信息',
          icon: 'el-icon-truck'
        }
      },
      {
        path: 'address',
        name: 'address',
        component: () => import('@/views/basic/address'),
        meta: {
          title: '地址基本信息',
          icon: 'el-icon-location-information'
        }
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/basic/company'),
        meta: {
          title: '公司信息',
          icon: 'el-icon-suitcase'
        }
      },
      {
        path: 'supplies',
        name: 'supplies',
        component: () => import('@/views/basic/supplies'),
        meta: {
          title: '物资信息',
          icon: 'el-icon-coin'
        }
      },
      {
        path: 'certificate',
        name: 'certificate',
        component: () => import('@/views/basic/certificate'),
        meta: {
          title: '证件基本信息',
          icon: 'el-icon-bank-card'
        }
      },
      {
        path: 'cargo',
        name: 'cargo',
        component: () => import('@/views/basic/cargo'),
        meta: {
          title: '货物基本信息',
          icon: 'el-icon-box'
        }
      },
      {
        path: 'building',
        name: 'building',
        component: () => import('@/views/basic/building'),
        meta: {
          title: '建筑构物信息',
          icon: 'el-icon-office-building'
        }
      },
      {
        path: 'facility',
        name: 'facility',
        component: () => import('@/views/basic/facility'),
        meta: {
          title: '机电设备基本信息',
          icon: 'el-icon-cpu'
        }
      }
    ]
  },

  {
    path: '/trade',
    component: Layout,
    redirect: '/trade/office-consumables',
    name: 'trade',
    meta: {
      title: '购销存管理',
      icon: 'el-icon-receiving'
    },
    children: [{
      path: 'office-consumables',
      component: () => import('@/views/trade/office_consumables'),
      name: 'office-consumables',
      meta: {
        title: '办公耗材采购'
      }
    }, {
      path: 'supplies',
      redirect: '/trade/supplies',
      name: 'suppliesM',
      meta: {
        title: '物资购销存'
      },
      children: [{
          path: 'purchase',
          component: () => import('@/views/trade/supplies/purchase'),
          name: 'suppliesP',
          meta: {
            title: '物资采购'
          }
        },
        {
          path: 'sell',
          component: () => import('@/views/trade/supplies/sell'),
          name: 'suppliesS',
          meta: {
            title: '物资销售'
          }
        },
        {
          path: 'inventory',
          component: () => import('@/views/trade/supplies/inventory'),
          name: 'suppliesI',
          meta: {
            title: '物资库存'
          }
        }
      ]
    }, {
      path: 'vehicle',
      redirect: '/trade/vehicle',
      name: 'vehicleM',
      meta: {
        title: '汽车购销'
      },
      children: [{
          path: 'purchase',
          component: () => import('@/views/trade/vehicle/purchase'),
          name: 'vehicleP',
          meta: {
            title: '汽车采购'
          }
        },
        {
          path: 'sell',
          component: () => import('@/views/trade/vehicle/sell'),
          name: 'vehicleS',
          meta: {
            title: '汽车销售'
          }
        }
      ]
    }, {
      path: 'cargo',
      redirect: '/trade/cargo',
      name: 'cargoM',
      meta: {
        title: '货物购销存'
      },
      children: [{
          path: 'purchase',
          component: () => import('@/views/trade/cargo/purchase'),
          name: 'cargoP',
          meta: {
            title: '货物采购'
          }
        },
        {
          path: 'sell',
          component: () => import('@/views/trade/cargo/sell'),
          name: 'cargoS',
          meta: {
            title: '货物销售'
          }
        },
        {
          path: 'inventory',
          component: () => import('@/views/trade/cargo/inventory'),
          name: 'cargoI',
          meta: {
            title: '货物库存'
          }
        }
      ]
    }, {
      path: 'building',
      redirect: '/trade/building',
      name: 'buildingM',
      meta: {
        title: '建筑构物租售'
      },
      children: [{
          path: 'lease',
          component: () => import('@/views/trade/building/lease'),
          name: 'buildingL',
          meta: {
            title: '建筑构物租赁'
          }
        },
        {
          path: 'sell',
          component: () => import('@/views/trade/building/sell'),
          name: 'buildingS',
          meta: {
            title: '建筑构物出售'
          }
        }
      ]
    }]
  },

  {
    path: '/vehicle-fix',
    component: Layout,
    redirect: '/vehicle-fix/materials-used',
    name: 'vehicle-fix',
    meta: {
      title: '汽车修检管理',
      icon: 'el-icon-truck'
    },
    children: [{
        path: 'materials-used',
        component: () => import('@/views/vehicle_fix/materials_used'),
        name: 'materials-used',
        meta: {
          title: '物资使用记录'
        }
      },
      {
        path: 'repairman-maintenance',
        component: () => import('@/views/vehicle_fix/repairman_maintenance'),
        name: 'repairman-maintenance',
        meta: {
          title: '修理工维修记录'
        }
      },
      {
        path: 'vehicle-maintenance',
        component: () => import('@/views/vehicle_fix/vehicle_maintenance'),
        name: 'vehicle-maintenance',
        meta: {
          title: '车辆维修记录'
        }
      }
    ]
  },

  {
    path: '/scheduler',
    component: Layout,
    redirect: '/scheduler/transportation-task',
    name: 'scheduler',
    meta: {
      title: '运输调度管理',
      icon: 'el-icon-guide'
    },
    children: [{
        path: 'transportation-task',
        component: () => import('@/views/scheduler/transportation_task'),
        name: 'transportation-task',
        meta: {
          title: '运输任务'
        }
      },
      {
        path: 'carrier-business',
        component: () => import('@/views/scheduler/carrier_business'),
        name: 'carrier-business',
        meta: {
          title: '承运商业务记录'
        }
      }
    ]
  },

  {
    path: '/exhibition',
    component: Layout,
    redirect: '/exhibition/introduction',
    name: 'exhibition',
    meta: {
      title: '对外展示管理',
      icon: 'el-icon-connection'
    },
    children: [{
      path: 'introduction',
      component: () => import('@/views/exhibition/introduction'),
      name: 'introduction',
      meta: {
        title: '公司简介公告',
        icon: 'link'
      }
    }, {
      path: 'advertisement',
      component: () => import('@/views/exhibition/advertisement'),
      name: 'advertisement',
      meta: {
        title: '销售广告',
        icon: 'link'
      }
    }]
  },

  {
    path: '/statistic',
    component: Layout,
    children: [{
      path: 'chart',
      component: () => import('@/views/statistic/statistic'),
      name: 'statistic',
      meta: {
        title: '数据统计分析',
        icon: 'el-icon-data-analysis'
      }
    }]
  },

  {
    path: '/permission',
    component: Layout,
    children: [{
      path: 'permission',
      component: () => import('@/views/permission/permission'),
      name: 'permission',
      meta: {
        title: '权限管理',
        icon: 'el-icon-lock'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
