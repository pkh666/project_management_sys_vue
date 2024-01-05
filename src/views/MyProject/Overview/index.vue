<template>
    <div class="file-manager-toolbar">
        <el-input v-model="searchText" placeholder="搜索" class="search-input">
            <template #append>
                <el-button icon="el-icon-search"></el-button>
            </template>
        </el-input>
        <el-button type="primary" icon="el-icon-upload">上传文件</el-button>
        <el-button type="success" icon="el-icon-folder-add">新建文件</el-button>
    </div>
    <el-table :data="fileList" style="width: 100%">
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column prop="name" label="名称" width="260"></el-table-column>
        <el-table-column prop="size" label="大小" width="180"></el-table-column>
        <el-table-column prop="date" label="日期" width="200"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="text">下载</el-button>
                <el-button type="text">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
const searchText = ref('');
const fileList = ref([
    { name: 'a.txt', size: '1KB', date: '2024-1-1' },
    { name: 'b.txt', size: '2KB', date: '2024-1-2' }
]);
</script>
  
<style scoped>
.file-manager-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

.search-input {
    flex-grow: 1;
    max-width: 300px;
}
</style>
  