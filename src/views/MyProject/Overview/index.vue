<template>
    <div style="height: 100%;">
        <el-row class="landmark">
            <el-col :span="24">
                <el-steps :active="active" align-center>
                    <el-step v-for="proj in projectSteps" :title="proj.step" :description="proj.deadline">
                    </el-step>
                </el-steps>
            </el-col>
        </el-row>
        <el-row class="messageAndInfo">
            <el-col :span="17" class="message">

            </el-col>
            <el-col :span="1">

            </el-col>
            <el-col :span="6" class="info">

            </el-col>
        </el-row>

    </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, ref} from 'vue'
import router from "@/router";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
const route = useRoute()
onBeforeMount( () => {
  console.log(route.query)
})
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


<style lang="scss" scoped>
.landmark {
    width: 98%;
    background-color: #fff;
    border-radius: 30px;
    padding: 20px;
    min-height: 20%;
    margin: auto;
}

.messageAndInfo {
    width: 98%;
    border-radius: 30px;
    padding: 20px;
    height: 77%;
    margin: auto;
    margin-top: 1%;
}

.message {
    background-color: #fff;
    border-radius: 30px;
    padding: 20px;
    height: 100%;
    margin: auto;
}
.info {
    background-color: #fff;
    border-radius: 30px;
    padding: 20px;
    height: 100%;
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
