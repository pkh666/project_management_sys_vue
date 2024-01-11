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
                                <el-button type="primary" @click="confirmAddList">确认</el-button>
                            </span>
                        </template>
                    </el-dialog>
                    <el-button @click="handleAddListClick" type="primary">新建任务列表</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-scrollbar>
                <el-card class="box-card" v-for="item, listIndex in taskLists">
                    <template #header>
                        <div class="card-header">
                            <span>{{ item.listName }}</span>
                            <el-dialog v-model="addTaskDialogVisible" title="新建任务" width="30%">
                                <el-form :model="addTaskForm">
                                    <el-form-item label="任务标题">
                                        <el-input v-model="addTaskForm.name" placeholder="输入任务标题"></el-input>
                                    </el-form-item>
                                    <el-form-item label="负责人">
                                        <el-select v-model="addTaskForm.executor" placeholder="选择负责人">
                                            <el-option v-for="user in executorOptionList" :key="user.username"
                                                :value="user.id" />
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="截止日期">
                                        <el-date-picker v-model="addTaskForm.endTime" type="datetime"
                                            placeholder="选择截止日期" />
                                    </el-form-item>
                                    <el-form-item label="任务描述">
                                        <el-input v-model="addTaskForm.description" placeholder="输入任务描述"></el-input>
                                    </el-form-item>
                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="addTaskDialogVisible = false">取消</el-button>
                                        <el-button type="primary" @click="confirmAddTask">确认</el-button>
                                    </span>
                                </template>
                            </el-dialog>
                            <el-button type="primary" @click="handleAddTaskClick(listIndex)">添加任务</el-button>
                        </div>
                    </template>
                    <el-scrollbar height="400px">
                        <el-card v-for="task, taskIndex in item.tasks">
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
                            <el-button type="info" @click="handleShowDetailClick(listIndex, taskIndex)">查看详情</el-button>
                            <el-button type="danger" @click="handleDeleteTaskClick(taskIndex)">删除任务</el-button>
                        </el-card>
                    </el-scrollbar>
                </el-card>
            </el-scrollbar>
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
const clearAddListForm = () => {
    addListForm.name = ""
}

const addTaskDialogVisible = ref(false)
const addTaskForm = reactive({
    name: "",
    executor: "",
    endTime: "",
    description: "",
})
const executorOptionList = ref([])
const clearAddTaskForm = () => {
    addTaskForm.name = ""
    addTaskForm.executor = ""
    addTaskForm.endTime = ""
    addTaskForm.description = ""
}

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

const taskLists: Ref<Array<Object>> = ref([])

onMounted(() => {
    getAllList()
})

const confirmAddList = () => {
    axios.post('/api/task/list', {
        "name": addListForm.name,
        "projectId": 1
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    }).finally(() => {
        addListDialogVisible.value = false
        getAllList()
    })
}

const chosenList = ref(-1)

const confirmAddTask = () => {
    axios.post('/api/task', {
        listId: chosenList.value,
        name: addTaskForm.name,
        description: addTaskForm.description,
        endTime: addTaskForm.endTime,
        executorId: 1
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    }).finally(() => {
        addTaskDialogVisible.value = false
        getAllTask('')
    })
}

const handleAddListClick = () => {
    clearAddListForm()
    addListDialogVisible.value = true
}

const handleAddTaskClick = (index) => {
    clearAddTaskForm()
    getExcutorOptionList().then((res) => {
        executorOptionList.value = res.data
    }).finally(() => {
        addTaskDialogVisible.value = true
        chosenList.value = lists.value[index].id
    })
}

const getExcutorOptionList = async () => {

}

const handleShowDetailClick = (listIndex: number, taskIndex: number) => {
    taskDetail.value = taskLists.value[listIndex].tasks[taskIndex]
    taskDetailDialogVisible.value = true
}

const handleDeleteTaskClick = (index) => {

}

const showFinishedTask = () => {
    if (finishedTaskChecked.value == false) {
        getAllTask('1')
    } else {
        getAllTask('')
    }
}

const showMyTask = () => {
    if (myTaskChecked.value == false) {

    } else {

    }
}

const getTaskLists = () => {
    taskLists.value = []
    lists.value.forEach((list) => {
        var tasksInList = tasks.value.filter((task) => {
            return task.listId === list.id
        })
        taskLists.value.push({
            listName: list.name,
            tasks: tasksInList
        })
    })
    console.log(taskLists.value)
}

const getAllTask = (status) => {
    axios.get("/api/task/all", {
        params: {
            executorId: 1,
            status: status
        }
    }).then(res => {
        tasks.value = res.data.data
        getTaskLists()
    }).catch(err => {
        console.error(err)
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
        getAllTask('')
    }).catch(err => {
        console.error(err)
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
    width: 400px;
}
</style>