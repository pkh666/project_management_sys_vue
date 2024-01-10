<template>
    <div>
        <el-header>
            <el-row>
                <el-col :span="6">
                    <span style="color: black;">任务列表</span>
                </el-col>
                <el-col :span="6">
                    <el-checkbox v-model="finishedTaskChecked" @click="showFinishedTask">显示已完成的任务</el-checkbox>
                </el-col>
                <el-col :span="6">
                    <el-checkbox v-model="myTaskChecked" @click="showMyTask">只看自己负责的任务</el-checkbox>
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
            <el-card class="box-card" v-for="item, index in taskLists">
                <template #header>
                    <div class="card-header">
                        <span>{{ item.listName }}</span>
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
                <el-card v-for="task, index in item.tasks">
                    <div>
                        <el-checkbox size="large">{{ task.name }}</el-checkbox>
                    </div>
                    <el-dialog v-model="taskDetailDialogVisible" title="任务详情" width="30%">
                        <el-descriptions v-model="taskDetail" :column="1">
                            <el-descriptions-item label="任务标题"> {{ taskDetail.name }}</el-descriptions-item>
                            <el-descriptions-item label="负责人">{{ taskDetail.executorId }}</el-descriptions-item>
                            <el-descriptions-item label="截止日期">{{ taskDetail.endTime }}</el-descriptions-item>
                            <el-descriptions-item label="任务描述">{{ taskDetail.description }}</el-descriptions-item>
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
            </el-card>
        </el-main>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive, Ref } from 'vue'
import axios from 'axios'

const finishedTaskChecked = ref(false)
const myTaskChecked = ref(false)

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

const lists = ref([
    {
        'id': 1,
        'name': 'A',
    },
    {
        'id': 11,
        'name': 'B',
    },
])
const tasks = ref([
    {
        'listId': 1,
        'name': 'name1',
        'desc': 'desc1',
        'status': '0',
        "endTime": "2023-12-29"
    },
    {
        'listId': 1,
        'name': 'name2',
        'desc': 'desc2',
        'status': '1',
        "endTime": "2023-12-30"
    },
    {
        'listId': 11,
        'name': 'name3',
        'desc': 'desc3',
        'status': '0',
        "endTime": "2023-12-31"
    },
])

const taskLists: Ref<Array<{ listName: String, tasks: Array<Object> }>> = ref([])

onMounted(() => {
    getAllList()
})

const handleAddList = () => {
    addListDialogVisible.value = true
}

const handleAddTask = (index) => {
    addTaskDialogVisible.value = true
}

const handleTaskDetailClick = (index) => {
    taskDetail.value = tasks.value[index]
    taskDetailDialogVisible.value = true
}

const showFinishedTask = () => {
    if (finishedTaskChecked.value == true) {

    } else {

    }
}

const showMyTask = () => {
    if (myTaskChecked.value == true) {

    } else {

    }
}

const getTaskLists = () => {
    lists.value.forEach((list) => {
        var tasksInList = tasks.value.filter((task) => {
            return task.listId === list.id
        })
        if (tasksInList.length > 0) {
            taskLists.value.push({
                listName: list.name,
                tasks: tasksInList
            })
        }
    })
    console.log(taskLists.value)
}

const getAllTask = () => {
    axios.get("/api/task/all", {
        params: {
            executorId: 1
        }
    }).then(res => {
        tasks.value = res.data.data
        getTaskLists()
    }).catch(err => {
        console.log(err)
    }).finally(() => {

    })
}

const getAllList = () => {
    axios.get("/api/task/list/all", {
        params: {
            projectId: 1
        }
    }).then(res => {
        lists.value = res.data.data
        getAllTask()
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
    display: inline-table;
    width: 480px;
}
</style>