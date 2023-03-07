import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  scrollBehavior(to, from, savePosition){
    // return {
    //   top:0
    // }
  },
  routes: [
    {
      path: "/",
      component: ()=>import("../views/AdminLoginView.vue")
    },
    {
      path: "/admin",
      component: ()=>import("../views/DashboardView.vue"),
      children: [
        {
          path: "",
          name: "dashboard",
          component: ()=>import("../views/AdminOrdersView.vue")
         },
         {
          path: "orders",
          redirect: "/admin/orders/1"
         },
       {
        path: "orders/:orderpageid",
        component: ()=>import("../views/AdminOrdersView.vue")
       },
       {
        path: "products",
        component: ()=>import("../views/AdminProductsView.vue")
       },
       {
        path: "products/:pageid",
        component: ()=>import("../views/AdminProductsView.vue")
       },
       {
        path: "coupons",
        component: ()=>import("../views/AdminCouponsView.vue")
       },
       {
        path: "articles",
        component: ()=>import("../views//AdminArticlesView.vue")
       },
      ]
    },
    // {
    //   path: "/notFound",
    //   component: ()=>import("../views/NotFoundView.vue")
    // },
    // {
    //   path: "/:pathMatch(.*)*",
    //   redirect: "/notFound"
    // },

    // {
    //   path: "/admin/:pathMatch(.*)*",
    //   redirect: "/"
    // }
  ],
});

export default router;
