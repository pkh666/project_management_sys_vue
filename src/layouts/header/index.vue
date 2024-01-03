<template>
  <el-menu
    class="el-menu"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    style="background-color: #ffffff; padding: 0"
  >
    <div class="scroll-container">
      <el-tag
        class="tag"
        v-for="tag in tags"
        size="large"
        :key="tag.name"
        :closable="true"
        :effect="calculateTagEffect(tag)"
        @close="handleTagClose(tag)"
        @click="handleTagClick(tag)"
        @mouseenter="handleTagMouseEnter(tag)"
        @mouseleave="handleTagMouseLeave()"
        :style="{ cursor: tagHovered === tag ? 'pointer' : 'default' }"
      >
        {{ tag.name }}
      </el-tag>
    </div>

    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <span class="name">admin</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleCloseFilled /></el-icon>
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();
const tags: any = ref([]);
const tagHovered = ref(null);

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

function handleExitClick() {
  router.push("/login");
}

// 处理标签页点击逻辑，进行路由导航
const handleTagClick = (tag: any) => {
  router.push(tag.route);
};

// 处理关闭标签页逻辑，不进行路由导航
const handleTagClose = (tag: any) => {
  const index = tags.value.indexOf(tag);
  if (index !== -1) {
    tags.value.splice(index, 1);
  }
};

// 根据当前路由与标签页的匹配情况设置不同的效果,在当前页面的话是呈明显状态
const calculateTagEffect = (tag: any) => {
  const currentRoute = router.currentRoute.value;
  return tag.route === currentRoute.fullPath ? "dark" : "plain";
};

const handleTagMouseEnter = (tag: any) => {
  // 鼠标悬停时记录当前悬停的标签
  tagHovered.value = tag;
};

const handleTagMouseLeave = () => {
  // 鼠标离开时重置悬停标签
  tagHovered.value = null;
};

// 监听路由变化，动态更新标签页

watchEffect(() => {
  const currentRoute = router.currentRoute.value;
  const existingTag = tags.value.find(
    (tag: any) => tag.route === currentRoute.fullPath
  );
  if (!existingTag) {
    // 如果当前路由不存在于标签页中，则添加新标签
    tags.value.push({
      name: currentRoute.meta.breadcrumb || currentRoute.name,
      route: currentRoute.fullPath,
    });
  }
});
</script>

<style scoped lang="less">
.info {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 25px;
  margin-top: 22px;
  display: flex;
  align-items: center;
}
.tag {
  margin-top: 14px;
  margin-left: 5px;
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer; //放上去变手
  outline: none;
  border: none;
  box-shadow: none;

  .name {
    margin-left: 8px;
    font-size: large;
  }
}
</style>
