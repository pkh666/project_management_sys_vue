<template>
    <div>
        <el-header>
            <span style="color: black;">我的信息</span>
        </el-header>
        <el-main>
            <el-card class="box-card">
                <el-descriptions title="个人信息" direction="vertical" :column="1">
                    <el-descriptions-item label="姓名"> {{ }}</el-descriptions-item>
                    <el-descriptions-item label="邮箱">{{ }}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{ }}</el-descriptions-item>
                </el-descriptions>
                <el-dialog v-model="myInfoDialogVisible" title="修改个人信息" width="30%">
                    <el-form :model="myInfoForm">

                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="myInfoDialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="myInfoDialogVisible = false">确认</el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-button @click="updateMyInfo">修改个人信息</el-button>
            </el-card>
            <el-card class="box-card">
                <el-descriptions title="所在项目信息" direction="vertical">
                </el-descriptions>
            </el-card>
        </el-main>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue';

const myInfoDialogVisible = ref(false)
const myInfoForm = reactive({

})

const updateMyInfo = () => {
    myInfoDialogVisible.value = true
}
</script>
  
<style lang="css" scoped>
.box-card {
    display: inline-block;
    width: 480px;
}
</style>