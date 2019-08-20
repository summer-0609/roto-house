import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/index")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/index")
    }
  ]
});

export default router;
