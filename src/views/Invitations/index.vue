<template>
    <div>
        <el-header>
            <span style="color: black;">邀请信息</span>
        </el-header>
        <el-main>
            <el-card>
                <el-card v-for="invitation in invitationList">
                    <span>{{ invitation.inviter }}邀请你加入{{ invitation.projectName }}</span>
                    <el-button @click="refuse">拒绝</el-button>
                    <el-button type="primary" @click="accept">接受</el-button>
                </el-card>
            </el-card>
        </el-main>
    </div>
</template>
  
<script lang="ts" setup>
import { state } from '@/store';
import axios from 'axios';
import { onMounted, ref } from 'vue'

const invitationList = ref([
    {
        "inviter": "张三",
        "projectName": "A"
    },
    {
        "inviter": "李四",
        "projectName": "B"
    }
])

onMounted(() => {
    getInvitations()
})

const getInvitations = () => {
    axios.get('/api/member/invitations', {
        params: {
            projectId: state.projectid,
            memberId: state.userId
        }
    }).then((res) => {
        invitationList.value = res.data.data
    })
}

const refuse = () => {
    axios.put('/api/member', {
        id: null,
        projectId: state.projectid,
        memberId: state.userId,
        checkTime: null,
        score: 0,
        status: 1
    }).then((res) => {

    }).finally(() => {
        getInvitations()
    })
}

const accept = () => {
    axios.put('/api/member', {
        id: null,
        projectId: state.projectid,
        memberId: state.userId,
        checkTime: null,
        score: 0,
        status: 1
    }).then((res) => {

    }).finally(() => {
        getInvitations()
    })
}
</script>
  
<style lang="css" scoped></style>