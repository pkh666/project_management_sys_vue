<template>
  <div class="role">
    <pageSearch
      :search-config="searchConfig"
      @quary-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></pageSearch>

    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditClick"
    ></pageContent>
    <pageModal :modal-config="modalConfig" ref="modalRef"></pageModal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from "@/components/page-search/page-search.vue";
import searchConfig from "./config/search.config.ts";

import pageContent from "@/components/page-content/page-content.vue";
import contentConfig from "./config/content.config";

import pageModal from "@/components/page-modal/page-modal.vue";
import modalConfig from "./config/modal.config";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";

//点击查询，content里面的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

//点击content，modal的操作
const { modalRef, handleNewBtnClick, handleEditClick } = usePageModal();
</script>

<style lang="less" scoped>
.role {
  color: black;
}
</style>
