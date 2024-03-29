import Main from '@/components/main'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/pages/About.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    children: [
      {
        path: 'message_page',
        name: 'About2',
        meta: {
          icon: 'md-notifications',
          title: 'about2'
        },
        component: () => import('@/pages/About2.vue')
      }
    ]
  },
  {
    path: '/raw',
    name: 'Raw',
    meta: {
      icon: 'logo-buffer',
      title: 'Raw'
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'Raw',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: 'RAW'
        },
        component: () => import('@/pages/Raw.vue')
      }
    ]
  },
  {
    path: '/rotatemat',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: 'RotaMat'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'RotaMat',
        meta: {
          icon: 'ios-document',
          title: 'RotaMat'
        },
        component: () => import('@/pages/RotaMat.vue')
      }
    ]
  },
  {
    path: '/rotate',
    name: 'rotate',
    meta: {
      icon: 'ios-stats',
      title: '旋转'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'Rotate',
        meta: {
          icon: 'md-add',
          title: '旋转'
        },
        component: () => import('@/pages/Rotate.vue')
      }
    ]
  },
  {
    path: '/translate',
    name: 'tools_methods',
    meta: {
      hideInBread: false,
      title: '旋转'
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'Translate',
        meta: {
          icon: 'ios-hammer',
          title: 'Translate',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/pages/Translate.vue')
      },
      {
        path: 'tools_methods_page2',
        name: 'Muti',
        meta: {
          icon: 'ios-hammer',
          title: 'Muti',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/pages/MutiAttribute.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
