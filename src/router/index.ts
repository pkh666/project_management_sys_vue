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
    redirect: "/login",
    children: [
      {
        path: "home",
        name: "首页",
        component: () => import("../views/Home/index.vue"),
        meta: { requiresAuth: false, breadcrumb: "首页" }, //requiresAuth意思是是否需要登录才能访问
      },
      {
        path: "myProject",
        name: "我的项目",
        component: () => import("../views/MyProject/index.vue"),
        meta: { requiresAuth: false, breadcrumb: "我的项目" },
      },
      {
        path: "myProject",
        children: [
          {
            path: "overview",
            name: "项目概览",
            component: () => import("../views/MyProject/Overview/index.vue"),
            meta: { requiresAuth: false, breadcrumb: "项目概览" },
          },
          {
            path: "task",
            name: "任务列表",
            component: () => import("../views/MyProject/Task/index.vue"),
            meta: { requiresAuth: false, breadcrumb: "任务列表" },
          },
          {
            path: "fileManagement",
            name: "文件管理",
            component: () => import("../views/MyProject/FileManagement/index.vue"),
            meta: { requiresAuth: false, breadcrumb: "文件管理" },
          },
          {
            path: "team",
            name: "团队情况",
            component: () => import("../views/MyProject/Team/index.vue"),
            meta: { requiresAuth: false, breadcrumb: "团队情况" },
          },
        ]
      },
      {
        path: "myInfo",
        name: "我的信息",
        component: () => import("../views/MyInfo/index.vue"),
        meta: { requiresAuth: false, breadcrumb: "我的信息" },
      },
      {
        path: "invitations",
        name: "邀请信息",
        component: () => import("../views/Invitations/index.vue"),
        meta: { requiresAuth: false, breadcrumb: "邀请信息" },
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
