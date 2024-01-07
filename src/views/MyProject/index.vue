<template>
    <el-row>
        <el-col :span="3">
            <h1 style="color: black;">项目列表</h1>
        </el-col>
        <el-col :span="19">

        </el-col>

        <el-col :span="2" class="center">
            <el-button type="primary">新建项目</el-button>
        </el-col>
    </el-row>

    <div class="table">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="2">
                <el-button type="primary" class="left">全部项目</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="left">我负责的</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="left">我加入的</el-button>
            </el-col>
            <el-col :span="12">

            </el-col>
            <el-col :span="6">
                <el-input v-model="searchText" placeholder="请输入搜索内容" clearable @clear="onClear"
                    @keyup.enter.native="onSearch">
                    <template #append>
                        <el-button icon="el-icon-search" @click="onSearch"></el-button>
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="tableData" border style="width: 100%">
                    <!-- 项目名称列 -->
                    <el-table-column prop="projectName" label="项目名称" width="450"></el-table-column>
                    <!-- 负责人列 -->
                    <el-table-column prop="leader" label="负责人" width="250"></el-table-column>
                    <!-- 我的贡献度列 -->
                    <el-table-column prop="contribution" label="我的贡献度" width="150">

                    </el-table-column>
                    <!-- 项目进度列 -->
                    <el-table-column prop="progress" label="项目进度">
                        <template #default="scope">
                            <el-progress :percentage="scope.row.progress" show-text></el-progress>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-pagination style="margin-top: 10px;" small background layout="prev, pager, next" :total="50"
                    class="right" />
            </el-col>

        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const searchText = ref('');

const onSearch = () => {
    console.log('执行搜索:', searchText.value);
    // 在这里添加搜索逻辑
};

const onClear = () => {
    console.log('清空搜索框');
    // 在这里添加清空后的逻辑
};

const tableData = ref([
    {
        projectName: 'xxxxxxx',
        leader: 'xxxxxxx',
        contribution: 20,
        progress: 60
    },
    {
        projectName: 'xxxxxxx',
        leader: 'xxxxxxx',
        contribution: 20,
        progress: 60
    },
    {
        projectName: 'xxxxxxx',
        leader: 'xxxxxxx',
        contribution: 20,
        progress: 60
    },
    {
        projectName: 'xxxxxxx',
        leader: 'xxxxxxx',
        contribution: 20,
        progress: 60
    },
    {
        projectName: 'xxxxxxx',
        leader: 'xxxxxxx',
        contribution: 20,
        progress: 60
    },
    {
        projectName: 'xxxxxxx',
        leader: 'xxxxxxx',
        contribution: 20,
        progress: 60
    },
    {
        projectName: 'xxxxxxx',
        leader: 'xxxxxxx',
        contribution: 20,
        progress: 60
    }

]);
</script>
  
<style lang="scss" scoped>
.table {
    margin-top: 20px;
    width: 1600px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    margin: auto;
}

// 水平垂直居中
.center {
    display: flex;
    align-items: center;
    justify-content: center;
}

// 元素靠右
.right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

// 元素靠左
.left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

// 上方间距
.mt {
    margin-top: 20px;
}
</style>