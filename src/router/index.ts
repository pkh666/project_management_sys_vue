import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 导入其他路由组件...

// 定义路由配置数组
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/",
    component: () => import("../layouts/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "首页",
        component: () => import("../views/Home/index.vue"),
        meta: { requiresAuth: false, breadcrumb: "首页" }, //requiresAuth意思是是否需要登录才能访问
      },
      {
        path: "import",
        name: "信息导入",
        meta: { requiresAuth: false, breadcrumb: "信息导入" },
        children: [
          {
            path: "material",
            name: "物料",
            component: () => import("../views/Import/material/material.vue"),
            meta: { requiresAuth: false, breadcrumb: "物料" },
          },
          // 添加其他信息导入的子菜单路由...
        ],
      },
      {
        path: "publish",
        name: "发布任务",
        component: () => import("../views/Publish/index.vue"),
        meta: { requiresAuth: false, breadcrumb: "发布任务" },
      },

      {
        path: "roleManage",
        name: "用户管理",
        component: () => import("../views/RoleManage/index.vue"),
        meta: { requiresAuth: false, breadcrumb: "用户管理" },
      },
      {
        path: "role",
        name: "角色管理",
        component: () => import("../views/Role/role.vue"),
        meta: { requiresAuth: false, breadcrumb: "角色管理" },
      },
      {
        path: "/:pathMatch(.*)",
        name: "NotFound",
        component: () => import("../views/not-found/NotFound.vue"),
        meta: {
          fullPage: true,
        },
      },
    ],
  },
  // 添加其他路由配置...
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由前置守卫

export default router;
