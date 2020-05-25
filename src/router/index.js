import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/new-home/index')
    },
    {
      path: '/shopCart',
      name: 'shopCart',
      component: () => import('@/pages/shopCart/index')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/pages/shopCart/index')
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('@/pages/statistics/index')
    },
    {
      path: '/placeWindow',
      name: 'placeWindow',
      component: () => import('@/pages/placeWindow/placeWindow')
    },
    {
      path: '/pay/:id',
      name: 'pay',
      component: () => import('@/pages/pay/index')
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      component: () => import('@/pages/product-detail/detail')
    },
    {
      path: '/orders',
      name: 'order',
      component: () => import('@/pages/orders/orders')
    },
    {
      path: '/order_detail/:orederId',
      name: 'orderDetail',
      component: () => import('@/pages/orderDetail/index')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/pages/news/news')
    },
    {
      path: '/serviceDetail/:id',
      name: 'service',
      component: () => import('@/pages/service-detail/index')
    },
    {
      path: '/culturaltrade',
      name: 'trade',
      component: () => import('@/pages/culturalTrade/index'),
      children: [{
        path: 'product',
        name: 'culturalproduct',
        component: () => import('@/pages/culturalTrade/components/culturalProduct'),
      },
      {
        path: 'service',
        name: 'culturalservice',
        component: () => import('@/pages/culturalTrade/components/culturalService'),
      }
      ]
    },,
    {
      // 404页面
      path: '*',
      name: 'notfound',
      component: () => import('@/pages/notfound/index')
    }
  ]
})

// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g
//   const isChunkLoadFailed = error.message.match(pattern)
//   // const targetPath = router.history.pending.fullPath
//   if (isChunkLoadFailed) {
//     // router.replace(targetPath)
//     window.location.reload()
//   }
// })

export default router
