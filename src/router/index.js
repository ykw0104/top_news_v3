import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  // 访问页面不是login
  if (to.path !== "/login") {
    // 用户不存在 返回登录页
    if (!user) {
      return "/login";
    }
  }
});

export default router;
