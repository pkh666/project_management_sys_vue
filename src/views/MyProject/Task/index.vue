<template>
    <div>
        <el-header>
            <el-row>
                <el-col :span="6">
                    <span style="color: black;">任务列表</span>
                </el-col>
                <el-col :span="6">
                    <el-checkbox v-model="finishedTask">显示已完成的任务</el-checkbox>
                </el-col>
                <el-col :span="6">
                    <el-checkbox v-model="myTask">只看自己负责的任务</el-checkbox>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary">新建任务列表</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-card class="box-card" v-for="taskName in listNames">
                <template #header>
                    <div class="card-header">
                        <span>{{ taskName }}</span>
                        <el-button class="button">添加任务</el-button>
                    </div>
                </template>
                <el-card v-for="task in taskList">
                    <div>
                        <el-checkbox></el-checkbox>
                        <span>{{ task.name }}</span>
                    </div>
                    <div>
                        <p>{{ task.desc }}</p>
                    </div>
                </el-card>
            </el-card>
        </el-main>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const finishedTask = ref(false)
const myTask = ref(false)

const listNames = ref(['list1', 'list2'])
const taskList = ref([
    {
        'name': 'name1',
        'desc': 'desc1'
    },
    {
        'name': 'name2',
        'desc': 'desc2'
    }
])
</script>
  
<style lang="css" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-card {
    display: inline-block;
    width: 480px;
}
</style>