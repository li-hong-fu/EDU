import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const TOKEN = localStorage.getItem("token");
  if (!TOKEN && to.name !== "Login") {
    next({ name: "Login", replace: true });
    return;
  }
  if (TOKEN) {
    if (to.name === "Login") {
      next({ name: "StackRoot", replace: true });
      return;
    }
  }

  next();
});

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// });

export default router;
