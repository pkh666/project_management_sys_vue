<template>
    <div>
        <el-header>
            <el-row>
                <el-col :span="6">
                    <span style="color: black;">任务列表</span>
                </el-col>
                <el-col :span="6">
                    <el-checkbox v-model="finishedTask" @click="showFinishedTask">显示已完成的任务</el-checkbox>
                </el-col>
                <el-col :span="6">
                    <el-checkbox v-model="myTask" @click="showMyTask">只看自己负责的任务</el-checkbox>
                </el-col>
                <el-col :span="6">
                    <el-dialog v-model="addListDialogVisible" title="新建任务列表" width="30%">
                        <el-form :model="addListForm">
                            <el-form-item label="任务列表名">
                                <el-input v-model="addListForm.name" placeholder="输入列表名"></el-input>
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="addListDialogVisible = false">取消</el-button>
                                <el-button type="primary" @click="addListDialogVisible = false">确认</el-button>
                            </span>
                        </template>
                    </el-dialog>
                    <el-button @click="handleAddList" type="primary">新建任务列表</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-card class="box-card" v-for="listName, index in listNames">
                <template #header>
                    <div class="card-header">
                        <span>{{ listName }}</span>
                        <el-dialog v-model="addTaskDialogVisible" title="新建任务" width="30%">
                            <el-form :model="addTaskForm">
                                <el-form-item label="任务标题">
                                    <el-input v-model="addTaskForm.title" placeholder="输入任务标题"></el-input>
                                </el-form-item>
                                <el-form-item label="负责人">
                                    <el-select v-model="addTaskForm.executor" placeholder="选择负责人">
                                        <el-option></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="截止日期">
                                    <el-date-picker v-model="addTaskForm" type="date" placeholder="选择截止日期" />
                                </el-form-item>
                                <el-form-item label="任务描述">
                                    <el-input v-model="addTaskForm.description" placeholder="输入任务描述"></el-input>
                                </el-form-item>
                            </el-form>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="addTaskDialogVisible = false">取消</el-button>
                                    <el-button type="primary" @click="addTaskDialogVisible = false">确认</el-button>
                                </span>
                            </template>
                        </el-dialog>
                        <el-button @click="handleAddTask(index)">添加任务</el-button>
                    </div>
                </template>
                <el-scrollbar>
                    <el-card v-for="task, index in taskList">
                        <div>
                            <el-checkbox></el-checkbox>
                            <span>{{ task.name }}</span>
                        </div>
                        <el-dialog v-model="taskDetailDialogVisible" title="任务详情" width="30%">
                            <el-descriptions v-model="taskDetail">
                                <el-descriptions-item label="任务标题"> {{ taskDetail.name }}</el-descriptions-item>
                                <el-descriptions-item label="负责人">{{ }}</el-descriptions-item>
                                <el-descriptions-item label="截止日期">{{ taskDetail.endTime }}</el-descriptions-item>
                                <el-descriptions-item label="任务描述">{{ taskDetail.desc }}</el-descriptions-item>
                            </el-descriptions>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="taskDetailDialogVisible = false">取消</el-button>
                                    <el-button type="primary" @click="taskDetailDialogVisible = false">确认</el-button>
                                </span>
                            </template>
                        </el-dialog>
                        <el-button @click="handleTaskDetailClick(index)">查看详情</el-button>
                    </el-card>
                </el-scrollbar>
            </el-card>
        </el-main>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'

const finishedTask = ref(false)
const myTask = ref(false)

const addListDialogVisible = ref(false)
const addListForm = reactive({
    name: ""
})

const addTaskDialogVisible = ref(false)
const addTaskForm = reactive({
    title: "",
    executor: "",
    endTime: "",
    description: "",
})

const taskDetailDialogVisible = ref(false)
const taskDetail = ref({})

const listNames = ref(['list1', 'list2', 'list3',])
const taskList = ref([
    {
        'name': 'name1',
        'desc': 'desc1',
        "endTime": "2023-12-29"
    },
    {
        'name': 'name2',
        'desc': 'desc2',
        "endTime": "2023-12-30"
    },
    {
        'name': 'name3',
        'desc': 'desc3',
        "endTime": "2023-12-31"
    },
])

onMounted(() => {
    getAllTask()
})

const handleAddList = () => {
    addListDialogVisible.value = true
}

const handleAddTask = (index) => {
    addTaskDialogVisible.value = true
}

const handleTaskDetailClick = (index) => {
    taskDetail.value = taskList.value[index]
    taskDetailDialogVisible.value = true
}

const showFinishedTask = () => {

}

const showMyTask = () => {

}

const getAllTask = () => {
    axios.get("/api/task/all", {
        params: {
            executorId: ""
        }
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    }).finally(() => {

    })
}
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