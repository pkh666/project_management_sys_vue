<template>
    <div>
        <el-header>
            <el-row>
                <el-col :span="2">
                    <span style="color: black;">团队情况</span>
                </el-col>
                <el-col :span="6">
                    <el-button @click="handleMemberListClick">成员列表</el-button>
                    <el-button @click="handleTeacherListClick">指导老师列表</el-button>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="searchName" placeholder="输入姓名" v-on:keyup.enter="handleSearchName"
                        class="search-input">
                        <template #append>
                            <el-button @click="handleSearchName">搜索</el-button>
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-dialog v-model="addMemberDialogVisible" title="添加成员" width="30%">
                        <el-form :model="addMemberForm">
                            <el-form-item label="姓名" :label-width="formLabelWidth">
                                <el-input v-model="addMemberForm.id" placeholder="输入成员姓名"></el-input>
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="addMemberDialogVisible = false">取消</el-button>
                                <el-button type="primary" @click="confirmAddMember">确认</el-button>
                            </span>
                        </template>
                    </el-dialog>
                    <el-dialog v-model="addTeacherDialogVisible" title="添加成员" width="30%">
                        <el-form :model="addTeacherForm">
                            <el-form-item label="姓名" :label-width="formLabelWidth">
                                <el-select v-model="addTeacherForm.id" placeholder="选择指导老师姓名">
                                    <el-option v-for="user in teacherOptionList" :label="user.username" :value="user.id" />
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="addTeacherDialogVisible = false">取消</el-button>
                                <el-button type="primary" @click="addTeacherDialogVisible = false">确认</el-button>
                            </span>
                        </template>
                    </el-dialog>
                    <el-button type="primary" @click="handleAddMemberClick">添加成员</el-button>
                    <el-button type="primary" @click="handleAddTeacherClick">添加指导老师</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table :data="memberList" style="width: 100%">
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="role" label="身份"></el-table-column>
                <el-table-column prop="mail" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="score" label="贡献度"></el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="50" />
            <div id="chart" ref="chartRef" style="width: 100%; height: 400%"></div>
        </el-main>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts'
import { state } from "@/store";
import { ElMessage } from 'element-plus';

const addMemberDialogVisible = ref(false)
const addTeacherDialogVisible = ref(false)
const formLabelWidth = '140px'

const addMemberForm = reactive({
    id: '',
})
const addTeacherForm = reactive({
    id: '',
})

const chosenRole = ref('0')
const searchName = ref('')
const memberList = ref([])
const memberOptionList = ref([])
const teacherOptionList = ref([])
const xAxisName = ref([''])
const yAxisScore = ref([''])

const chartRef = ref()

onMounted(() => {
    initChart()
    getChartData()
    getMemberList(1, chosenRole.value)
})

const handleMemberListClick = () => {
    chosenRole.value = '1'
    getMemberList(1, chosenRole.value)
    getChartData()
}

const handleTeacherListClick = () => {
    chosenRole.value = '0'
    getMemberList(1, chosenRole.value)
    getChartData()
}

const handleSearchName = () => {
    getMemberList(1, chosenRole.value)
}

const confirmAddMember = () => {
    axios.post("/api/member", {
        id: null,
        projectId: state.projectid,
        memberId: addMemberForm.id,
        checkTime: null,
        score: 0,
        status: 0
    }).then((res) => {
        if (res.data.code == 200) {
            ElMessage.success("添加成功")
        }
    }).finally(() => {
        addMemberDialogVisible.value = false
    })
}

const handleAddMemberClick = () => {
    axios.get("/api/user/all", {
        params: {
            role: '1',
        }
    }).then(res => {
        memberOptionList.value = res.data.data
    }).catch(err => {
        console.error(err)
    }).finally(() => {
        addMemberDialogVisible.value = true
    })
}

const confirmAddTeacher = () => {
}

const handleAddTeacherClick = () => {
    axios.get("/api/user/all", {
        params: {
            role: '0',
        }
    }).then(res => {
        teacherOptionList.value = res.data.data
    }).catch(err => {
        console.error(err)
    }).finally(() => {
        addTeacherDialogVisible.value = true
    })
}

const getMemberList = (pageNumber: number, role: string) => {
    axios.get("/api/member", {
        params: {
            projectId: state.projectid,
            memberName: searchName.value,
            pageNumber: pageNumber,
            role: role,
        }
    }).then(res => {
        memberList.value = res.data
    }).catch(err => {
        console.error(err)
    }).finally(() => {

    })
}

const getChartData = () => {
    axios.get("/api/member/chart", {
        params: {
            projectId: state.projectid
        }
    }).then(res => {
        var chartData = res.data
        var nameList = []
        var scoreList = []
        for (let i = 0; i < chartData.length; i++) {
            nameList.push(chartData[i].memberName)
            scoreList.push(chartData[i].score)
        }
        xAxisName.value = [...nameList]
        yAxisScore.value = [...scoreList]
        updateChart()
    }).catch(err => {
        console.error(err)
    }).finally(() => {

    })
}

const initChart = () => {
    var myChart = echarts.init(chartRef.value)
    myChart.setOption({
        xAxis: {
            data: xAxisName.value
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'bar',
                data: yAxisScore.value
            }
        ]
    })
    window.onresize = () => {
        myChart.resize();
    }
}

const updateChart = () => {
    var myChart = echarts.getInstanceByDom(chartRef.value)
    if (myChart) {
        myChart.setOption({
            xAxis: {
                data: xAxisName.value
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    type: 'bar',
                    data: yAxisScore.value
                }
            ]
        })
    }
}
</script>
  
<style lang="css" scoped></style>