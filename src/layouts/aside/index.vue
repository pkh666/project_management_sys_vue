<template>
  <div class="main_container">
    <div class="logo">
      <img class="img" src="@assets/layouts/logo.svg" alt="" />
      <h2 class="title">项目管理系统</h2>
    </div>

    <div class="menue">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" text-color="#b7bdc3"
        active-text-color="#fff" background-color="#001529" :unique-opened="true" collapse-transition="false" router>
        <el-menu-item index="/home" @click="cleanTag">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <template #title>工作台</template>
        </el-menu-item>

        <el-menu-item index="/myProject">
          <el-icon>
            <Document />
          </el-icon>
          <template #title>我的项目</template>
        </el-menu-item>

        <el-sub-menu index="/myProject" v-model="isMyProjectMenuOpen">
          <template #title>
            <el-icon>
              <BottomLeft />
            </el-icon>
            <span>项目详情</span>
          </template>
          <el-menu-item class="itemMenu" index="/myProject/overview"
            @click="addTag({ label: '项目概览', path: '/myProject/overview' })">
            <template #title>项目概览</template>
          </el-menu-item>
          <el-menu-item class="itemMenu" index="/myProject/task"
            @click="addTag({ label: '任务列表', path: '/myProject/task' })">
            <template #title>任务列表</template>
          </el-menu-item>
          <el-menu-item class="itemMenu" index="/myProject/fileManagement"
            @click="addTag({ label: '文件管理', path: '/myProject/fileManagement' })">
            <template #title>文件管理</template>
          </el-menu-item>
          <el-menu-item class="itemMenu" index="/myProject/team"
            @click="addTag({ label: '团队情况', path: '/myProject/team' })">
            <template #title>团队情况</template>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/myInfo" @click="addTag({ label: '我的信息', path: 'myInfo' })">
          <el-icon>
            <setting />
          </el-icon>
          <template #title>我的信息</template>
        </el-menu-item>
        <el-menu-item index="/invitations" @click="addTag({ label: '邀请信息', path: 'invitations' })">
          <el-icon>
            <setting />
          </el-icon>
          <template #title>邀请信息</template>
        </el-menu-item>
      </el-menu>
    </div>

    <el-tooltip content="点击折叠" placement="right">
      <div size="default" class="collapse_icon hidden-sm-and-down" type="primary" @click="collapseMenu()">
        <el-icon :color="'#0a60bd'">
          <Fold />
        </el-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useMenuStore } from "@/store/menu";
import { storeToRefs } from "pinia";
import { Setting } from "@element-plus/icons-vue";
const menuStore = useMenuStore();
const { addTag, cleanTag, closeMenu, collapseMenu } = menuStore;
const { isCollapse } = storeToRefs(menuStore);

const isMyProjectMenuOpen = ref(false); // 我的项目菜单的展开状态

const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 768px)");

const handleMediaChange = (event: MediaQueryListEvent): void => {
  if (event.matches) {
    // 当屏幕宽度小于等于 768 像素时执行的函数
    console.log("nnn");
    closeMenu();
  }
};

// 在组件挂载到 DOM 后添加事件监听器
onMounted(() => {
  mediaQuery.addEventListener("change", handleMediaChange);
  if (mediaQuery.matches) {
    closeMenu();
  }
});

// 在组件销毁之前移除事件监听器
onBeforeUnmount(() => {
  mediaQuery.removeEventListener("change", handleMediaChange);
  localStorage.removeItem("currentRoute");
});
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  margin-top: 0px;
  width: 202px;
  min-height: 100%;
  background-color: #001529;
}

.main_container {
  height: 100%;
  background-color: #001529;
}

/* 菜单背景色 */

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  width: 178px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu .el-menu-item.is-active {
  color: #fff;
  background-color: #0a60bd;
}

.el-menu-item.no-hover {
  pointer-events: none;
  cursor: default;
  background-color: #001529;
  font-weight: bold;
}

.itemMenu {
  padding-left: 50px !important;
}

.collapse_icon {
  cursor: pointer;
  height: 30px;
  width: 30px;
  left: 12px;
  bottom: 10px;
  position: fixed;
}
</style>
