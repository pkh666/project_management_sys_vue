<template>
    <div>
        <el-header>
            <span style="color: black;">邀请信息</span>
        </el-header>
        <el-main>
            <el-card>
                <el-card v-for="invitation in invitationList">
                    <span>{{ invitation.inviter }}邀请你加入{{ invitation.projectName }}</span>
                    <el-button>拒绝</el-button>
                    <el-button type="primary">接受</el-button>
                </el-card>
            </el-card>
        </el-main>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

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
</script>
  
<style lang="css" scoped></style>