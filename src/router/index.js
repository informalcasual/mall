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
