<template>
    <div>
        <el-header>
            <span style="color: black;">我的信息</span>
        </el-header>
        <el-main>
            <el-card class="box-card">
                <el-descriptions title="个人信息" direction="vertical" :column="1">
                    <el-descriptions-item label="姓名">{{ myInfo.username }}</el-descriptions-item>
                    <el-descriptions-item label="邮箱">{{ myInfo.mail }}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{ myInfo.phone }}</el-descriptions-item>
                </el-descriptions>
                <el-dialog v-model="updateMyInfoDialogVisible" title="修改个人信息" width="30%">
                    <el-form :model="updateMyInfoForm">
                        <el-form-item label="姓名">
                            <el-input v-model="updateMyInfoForm.username" placeholder="输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="updateMyInfoForm.mail" placeholder="输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label=" 手机号">
                            <el-input v-model="updateMyInfoForm.phone" placeholder="输入手机号"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="updateMyInfoDialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="updateMyInfoDialogVisible = false">确认</el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-button @click="handleUpdateMyInfo">修改个人信息</el-button>
                <el-button @click="">修改密码</el-button>
            </el-card>
            <el-card class="box-card">
                <el-descriptions title="所在项目信息" direction="vertical">
                    <el-descriptions-item v-for="project in myProjects">
                        <el-card>
                            <span>{{ project.name }}</span>
                        </el-card>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
        </el-main>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';

const updateMyInfoDialogVisible = ref(false)
const updateMyInfoForm = reactive({
    username: "",
    mail: "",
    phone: ""
})

const myInfo = ref({
    id: "",
    username: "",
    mail: "",
    phone: ""
})
const myProjects = ref([])

onMounted(() => {
    getMyInfo()
    getMyProjects()
})

const getMyInfo = () => {
    axios.get("/api/user", {
        params: {
            id: 1
        }
    }).then(res => {
        myInfo.value = res.data.data
    }).catch(err => {
        console.error(err)
    }).finally(() => {

    })
}

const getMyProjects = () => {
    axios.get("/api/member/projects", {
        params: {
            memberId: 1
        }
    }).then(res => {
        console.log(res.data)
        myProjects.value = res.data
    }).catch(err => {
        console.error(err)
    }).finally(() => {

    })
}

const handleUpdateMyInfo = () => {
    updateMyInfoDialogVisible.value = true
}
</script>

<style lang="css" scoped>
.box-card {
    display: inline-table;
    width: 480px;
}
</style>
