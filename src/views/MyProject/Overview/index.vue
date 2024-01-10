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
              <el-col :span="3">
                <h2>我的动态</h2>
              </el-col>
              <el-col :span="19" />
              <el-col>
              <el-descriptions v-for="(message, id) in  messageList.messageList" :key="id">

                    <el-descriptions-item>
                      <h4>{{ message.title }}</h4>
                      {{ message.content }}
                      <el-divider />
                    </el-descriptions-item>

                  </el-descriptions>

              </el-col>

            </el-col>

            <el-col :span="1">

            </el-col>

            <el-col :span="6" class="info">
                <div class="project-details">
                    <h3 class="project-title left">{{ projectInfo.name }}</h3>
                    <p class="project-meta left ">{{ projectInfo.user }} 创建于 {{ projectInfo.createdAt }}</p>
                    <p class="project-description left">{{ projectInfo.description }}</p>
                    <div class="stats">
                        <el-row :gutter="20">
                            <el-col :span="8" v-for="stat in projectStatistics" :key="stat.name" class="stat-col">
                                <div class="stat-item">
                                    <div class="stat-value">{{ stat.scoreStr || stat.score }}</div>
                                    <div class="stat-name">{{ stat.name }}</div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, reactive, ref} from 'vue'
import router from "@/router";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from 'element-plus';
const message = {
  projectId: "1",
  userId: "",
}
const messageList = reactive({
  messageList: []
})
const projectId = ref('1'); // 假设已经有一个方法来设置这个项目ID
const projectInfo = ref({
    name: '项目名称',
    description: '项目描述',
    user: '项目创建者',
    createdAt: '2021-01-01',

});
const projectStatistics = ref([
    { name: '已发布任务', score: 100 },
    { name: '未完成任务', score: 100 },
    { name: '已完成任务', score: 100 },
    { name: '今日到期任务', score: 100 },
    { name: '逾期任务', score: 100 },
    { name: '里程碑进度', score: 10 / 10 }
]);
//请求动态
axios.get("/api/message", { params: message }).then(res => {
  messageList.messageList = res.data.data.data


})
const fetchProjectInfo = async () => {
    try {
        const response = await axios.get('/api/project/info', { params: { id: projectId.value } });
        projectInfo.value = response.data.data;
    } catch (error) {
        console.error('Error fetching project info:', error);
        ElMessage.error('获取项目详情失败');
    }
};

const fetchProjectStatistics = async () => {
    try {
        const response = await axios.get('/api/statistics/project', { params: { projectId: projectId.value } });
        projectStatistics.value = response.data.data;
    } catch (error) {
        console.error('Error fetching project statistics:', error);
        ElMessage.error('获取项目统计信息失败');
    }
};

onMounted(() => {
    fetchProjectInfo();
    fetchProjectStatistics();
});
const route = useRoute()
onBeforeMount(() => {
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

.info .project-details {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 10px;
    height: 90%;
}

.info .project-title {
    font-size: 1.5em;
    margin-bottom: 10px;
}

.info .project-meta {
    font-size: 0.9em;
    color: #999999;
    margin-bottom: 20px;
}

.info .project-description {
    font-size: 1em;
    color: #666666;
    margin-bottom: 20px;
    text-align: left;
    min-height: 40%;
}

.stats .stat-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.stats .stat-item {
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 6px;
    width: 100%;
    margin-bottom: 10px;
}

.stats .stat-value {
    font-size: 1.2em;
    font-weight: bold;
    color: #333333;
}

.stats .stat-name {
    font-size: 0.9em;
    color: #999999;
}
</style>
