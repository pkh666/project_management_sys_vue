<template>
  <el-row>
    <h1>你好，{{ user.user.username }} 欢迎开始工作</h1>
  </el-row>
  <el-row>
    <el-col :span="24" />
    <el-col>
      <el-descriptions column="1">

        <el-descriptions-item label="手机号">{{ user.user.phone }}</el-descriptions-item>

        <el-descriptions-item label="邮箱">
          <el-tag size="small">{{ user.user.mail }}</el-tag>
        </el-descriptions-item>

      </el-descriptions>
    </el-col>


  </el-row>
<el-row>

    <el-col :span="3">
      <h2>进行中的项目</h2>
    </el-col>
    <el-col :span="19" />
    <el-col :span="2" class="center">
      <el-button type="primary" v-on:click="goToMyProjectAll">全部项目</el-button>
    </el-col>
  <el-col class="el-main">
    <el-card class="box-card" @click="goToProject(project)" v-for="(project, id) in  projectList.projectList.data"
      :key="id">

      <el-descriptions>
        <el-descriptions-item label=项目名称 class="box">

          {{ project.name }}

        </el-descriptions-item>

      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="项目描述" class="box">
          项目描述项目描述项目描述项目描述项目描述
        </el-descriptions-item>

      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item>
          <div>项目进度</div>
          <div class="demo-progress">
            <el-progress :percentage="50" />
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-col>
 <el-col> <el-pagination layout="prev, pager, next" :page-count="projectList.projectList.totalPage"
    v-model:current-page="pageData.pageNum" @current-change="currentPageChange" /></el-col>
<!-- <el-col :span="300"/>-->
</el-row>

  <el-row class="messageAndInfo">
    <el-col :span="24" class="message" v-infinite-scroll="load"  style="overflow: auto" >
      <el-col :span="3">
        <h2>我的动态</h2>
      </el-col>
      <el-col :span="19" />
      <el-col >
        <el-descriptions v-for="(message, id) in  messageList.messageList" :key="id">

          <el-descriptions-item>
            <h4>{{ message.title }}</h4>
            {{ message.content }}
            <el-divider />
          </el-descriptions-item>

        </el-descriptions>

      </el-col>

    </el-col>

</el-row>

  <div>
    <div class="footer">
    </div>
  </div>
</template>

<script setup lang="ts" >
import axios from 'axios'
import {onMounted, reactive, ref} from 'vue'

import { useRouter } from "vue-router";
import { state } from "@/store";

const router = useRouter()
const user = reactive({
  user: "hello"
})
const count=ref(0)
//分页传参
const pageData = reactive(
  {
    pageNum: 1,
    pageSize: 4,

  })
const load = () => {
  count.value += 2
}
// const paginationData = ref({})

const projectList = reactive({
  projectList: []
})
const config = {
  headers:{
    userId: state.userId
  }
}
const message = {
  projectid: "",
}
const messageList = reactive({
  messageList: []
})
/*用户信息的id参数
* */
const params = {
  id: 1,
}

/*请求动态
* */
axios.get("/api/message", { params: {projectid: message.projectid,
    userid: state.userId,
} }).then(res => {
  messageList.messageList = res.data.data.data
  console.log(res.data)

})
/*获取用户基本信息，存在testRes中
* */
axios.get("/api/user", { params })
  .then(res => {
    console.log(res.data)
    user.user = res.data.data
  })


// 跳转到我的项目列表
function goToMyProjectAll() {
  router.push("/myProject")
}
//跳转到选择的项目概览

function goToProject(project) {


  router.push({
    name: "项目概览",
    query: { projectId: project.id }
  })
}
//改变页码后调整传参数据，并发送一次请求
function currentPageChange(pageNum) {
  pageData.pageNum = pageNum
  console.log(pageData)
  axios.get("/api/project", {
    params: {
      pageSize: pageData.pageSize,
      pageNum: pageData.pageNum
    },
    headers: config.headers
  }).then(res => {
    //用户id找到项目id，项目id找到项目
    projectList.projectList = res.data.data
    console.log(res.data.data.totalPage)
  })
}
onMounted(() => {

  currentPageChange(1)
})


</script>

<style lang="less" scoped>
.footer {
  color: @mainColor;
  user-select: none; // 添加 user-select 属性，测试浏览器前缀是否有添加
}
.messageAndInfo {
  width: 98%;
  border-radius: 30px;
  padding: 20px;
  height: 77%;
  margin: auto;
  margin-top: 1%;
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

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.el-main {
  display: flex;
}
.message {
  background-color: #fff;
  border-radius: 30px;
  padding: 20px;
  height: 100%;
  //margin: auto;
}
</style>
