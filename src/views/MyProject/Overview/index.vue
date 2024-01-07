<template>
    <div>
        <el-header>
            <el-steps :active="active" align-center>
                <el-step v-for="proj in projectSteps" :title="proj.step" :description="proj.deadline">
                </el-step>
            </el-steps>
        </el-header>
        <el-main>

        </el-main>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(2)
const projectSteps = ref([
    {
        "step": "数据库设计",
        "deadline": "2023.12.1"
    },
    {
        "step": "数据库设计",
        "deadline": "2023.12.1"
    },
    {
        "step": "数据库设计",
        "deadline": "2023.12.1"
    },
    {
        "step": "数据库设计",
        "deadline": "2023.12.1"
    }
])
</script>
  
<style lang="css" scoped></style>