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
    path: '/sale',
    component: Layout,
    redirect: '/sale/index',
    name: 'sale',
    meta: {
      title: '购销存管理',
      icon: 'el-icon-s-help'
    },
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }, {
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  },

  {
    path: '/vehicle-fix',
    component: Layout,
    redirect: '/vehicle-fix/menu1',
    name: 'vehicle-fix',
    meta: {
      title: '汽车修检管理',
      icon: 'nested'
    },
    children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: 'Menu1'
        },
        children: [{
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {
              title: 'Menu1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {
              title: 'Menu1-2'
            },
            children: [{
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'Menu1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {
                  title: 'Menu1-2-2'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {
              title: 'Menu1-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: {
          title: 'menu2'
        }
      }
    ]
  },

  {
    path: 'transport',
    component: Layout,
    redirect: '/transport/menu1',
    name: 'transport',
    meta: {
      title: '运输调度管理',
      icon: 'nested'
    },
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: 'External Link',
        icon: 'link'
      }
    }, {
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: 'External Link',
        icon: 'link'
      }
    }]
  },

  {
    path: 'coop',
    component: Layout,
    redirect: '/coop/menu1',
    name: 'coop',
    meta: {
      title: '对外合作管理',
      icon: 'nested'
    },
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: 'External Link',
        icon: 'link'
      }
    }, {
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: 'External Link',
        icon: 'link'
      }
    }]
  },

  {
    path: 'statistic',
    component: Layout,
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: '数据统计分析',
        icon: 'link'
      }
    }]
  },

  {
    path: 'permission',
    component: Layout,
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: '权限管理',
        icon: 'link'
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
