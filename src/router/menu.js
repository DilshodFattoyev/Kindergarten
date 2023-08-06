export const menuLink = [
   {
      title:'Bosh sahifa',
      icon:'home-filled',
      path:'/dashboard',
      name:'dashboard',
      component:() =>import('@/views/dashboard.vue')
    },
    {
      title:'Mahsulotlar',
      icon:'document',
      path:'/products',
      name:'products',
      component:() =>import('@/views/product/products.vue')
    },
    {
      title:'Narxlar',
      icon:'money',
      path:'/pricesprod',
      name:'pricesprod',
      component:() =>import('@/views/product/priceprod.vue')
    }
]