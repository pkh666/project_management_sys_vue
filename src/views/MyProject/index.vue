<template>
    <!-- 创建项目的弹窗 -->
    <el-dialog v-model="showDialog" title="创建新项目" :before-close="handleDialogClose">
    <el-form ref="formRef" :model="form">
      <el-form-item label="项目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>

      <el-form-item label="里程碑">
        <el-button type="text" @click="addLandmark">添加里程碑</el-button>
        <div v-for="(landmark, index) in form.landmarks" :key="index">
          <el-input placeholder="里程碑名称" v-model="landmark.name"></el-input>
          <el-input type="textarea" placeholder="里程碑描述" v-model="landmark.description"></el-input>
          <el-button type="text" @click="removeLandmark(index)">移除</el-button>
        </div>
      </el-form-item>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="submitForm">创建</el-button>
      </div>
    </el-form>
  </el-dialog>
    <el-row>
        <el-col :span="3">
            <h1 style="color: black;">项目列表</h1>
        </el-col>
        <el-col :span="19">

        </el-col>

        <el-col :span="2" class="center">
            <el-button type="primary" @click="showDialog = true">新建项目</el-button>
        </el-col>
    </el-row>

    <div class="table">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="2">
                <el-button type="primary" class="left" @click="all">全部项目</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="left" @click="owner">我负责的</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="left" @click="participate">我加入的</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="left" @click="archive">已归档项目</el-button>
            </el-col>
            <el-col :span="10">

            </el-col>
            <el-col :span="4">
                <el-input v-model="searchText" placeholder="请输入搜索内容" clearable @clear="onClear"
                    @keyup.enter.native="onSearch">
                </el-input>
            </el-col>
            <el-col :span="1">
                <el-button @click="onSearch">搜索</el-button>

            </el-col>
            <el-col :span="1">
                <el-button @click="onClear">清空</el-button>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="tableData" border style="width: 100%">
                    <!-- 项目名称列 -->
                    <el-table-column prop="name" label="项目名称" width="450"></el-table-column>
                    <!-- 负责人列 -->
                    <el-table-column prop="user" label="负责人" width="250"></el-table-column>
                    <!-- 项目创建时间列 -->
                    <el-table-column prop="createdAt" label="创建时间" width="250"></el-table-column>
                    <!-- 项目进度列 -->
                    <el-table-column prop="progress" label="项目进度">
                        <template #default="scope">
                            <el-progress :percentage="scope.row.progress" show-text></el-progress>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-pagination class="right mt" background layout="prev, pager, next" :page-count="totalPage"
                    v-model:current-page="currentPage" @current-change="getInfo"></el-pagination>
            </el-col>

        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { state } from '@/store'
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const showDialog = ref(false);
const form = ref({
  name: '',
  description: '',
  landmarks: []
});
const formRef = ref(null);

const addLandmark = () => {
  form.value.landmarks.push({ name: '', description: '' });
};

const removeLandmark = (index) => {
  form.value.landmarks.splice(index, 1);
};

const handleDialogClose = (done) => {
  // 可以在这里添加关闭前的确认
  done();
};


const config = {
  headers:{
    userId: state.userId
  }
}

const submitForm = async () => {
  try {
    await axios.post('/api/project', form.value,config);
    ElMessage.success('项目创建成功');
    showDialog.value = false;
    resetForm();
  } catch (error) {
    ElMessage.error('创建项目失败');
    console.error('Error:', error);
  }
};

const resetForm = () => {
  form.value = { name: '', description: '', landmarks: [] };
};

const searchText = ref('');
const currentPage = ref(1);
const totalPage = ref(1);
const isOwner = ref('');
const status = ref('1');

const onSearch = () => {
    getInfo(1);
};

const onClear = () => {
    searchText.value = '';
    getInfo(1);
};

const all = () => {
    isOwner.value = '';
    status.value = '1';
    getInfo(1);
};

const owner = () => {
    isOwner.value = "1";
    status.value = '1';
    getInfo(1);
};

const participate = () => {
    isOwner.value = "0";
    status.value = '1';
    getInfo(1);
};

const archive = () => {
    status.value = '0';
    getInfo(1);
};


const tableData = ref([
    {
        id: 19,
        user: "testuser1",
        name: "状布压却明",
        description: "能压深我来集果见合龙军发光看群。队如相声程历八展构们相取军。越学能比许立效国出安间需意。明合角持实复持进复论今称。型三动队适情和始周总强我以县除角角问。但风记养打老受常素问路我。",
        status: "1",
        createdAt: "2024-01-04 21:49:38",
        progress: "0"
    }
]);

// 获取列表
function getInfo(currentPage) {
    console.log(state.userId);
    

    axios.get('/api/project', {
        params: {
            isOwner: isOwner.value,
            name: searchText.value,
            projectId: 1,
            pageNum: currentPage,
            status: status.value

        },
        headers:config.headers
    }).then((res) => {
        tableData.value = res.data.data.data;
        totalPage.value = res.data.data.totalPage;
    });
}

onMounted(() => {
    getInfo(1);
});
</script>
  
<style lang="scss" scoped>
.table {
    margin-top: 20px;
    width: 1600px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
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