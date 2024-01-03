<template>
  <div class="homeWrap" v-if="!$route.meta.fullPage">
    <el-container class="main_container">
      <el-aside
        left="0rpx"
        :width="menuWith"
        style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%)"
      >
        <Aside></Aside>
      </el-aside>
      <el-container class="el-container">
        <el-header>
          <Header></Header>
        </el-header>
        <el-main style="background-color: #f2f2f2">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <router-view v-if="$route.meta.fullPage" />
</template>

<script setup lang="ts">
import Aside from "../layouts/aside/index.vue";
import Header from "../layouts/header/index.vue";
import { useMenuStore } from "@/store/menu";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();

const { menuWith } = storeToRefs(menuStore);
</script>

<style scoped lang="less">
.homeWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main_container {
  min-height: 100%;
}
.el-container {
  height: 100%;
}
</style>
