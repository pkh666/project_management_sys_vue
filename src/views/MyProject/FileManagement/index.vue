<template>
    <div class="file-manager-toolbar">
        <el-input v-model="searchText" placeholder="搜索" class="search-input">
            <template #append>
                <el-button @click="search">搜索</el-button>
                
            </template>
        </el-input>
        <el-button @click="search(true)">重置</el-button>

        <el-upload action="http://localhost:7000/file/upload" :before-upload="beforeUpload" :on-success="handleSuccess"
            :on-error="handleError" :data="uploadData">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
    <el-table :data="fileList" style="width: 100% min-height: 200;">
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column prop="name" label="名称" width="260"></el-table-column>
        <el-table-column prop="size" label="大小" width="180"></el-table-column>
        <el-table-column prop="uploadTime" label="日期" width="200"></el-table-column>
        <el-table-column prop="user" label="上传者" width="180"></el-table-column>
        <el-table-column prop="fileType" label="类型" width="180"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="text" @click="downloadFile(scope.row.id)">下载</el-button>
                <el-button type="text" @click="deleteFile(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-count="totalPage" v-model:current-page="currentPage"
        @current-change="getInfo"></el-pagination>
</template>
  
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';

// 搜索文件
const search = (clear) => {
    if (clear == true) {
        searchText.value = '';
    }
    getInfo(1);
};

const deleteFile = (fileId) => {
    ElMessageBox.confirm('确定要删除这个文件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            // 调用删除文件的逻辑
            console.log('删除文件的 ID:', fileId);
            axios.delete(`/api/file`,
                {
                    params: {
                        id: fileId
                    }
                }
            ).then((res) => {
                ElMessage.success('文件删除成功');
                getInfo(currentPage.value);
            });
        })
        .catch(() => {
            // 取消删除操作
            console.log('取消删除');
        });
};
const totalPage = ref(1); // 总页数

const uploadData = ref({ projectId: 1 }); // 设置上传时附带的额外参数

const beforeUpload = (file: File) => {
    // 在这里可以添加文件大小或类型的检查
    console.log('File to be uploaded:', file.name);
    return true; // 返回 false 则停止上传
};


function downloadFile(fileId) {

    // 构造下载接口的 URL
    const downloadUrl = `http://localhost:7000/file/download?id=${fileId}`;
    // 触发浏览器下载
    window.open(downloadUrl, '_blank');
}

// 上传成功时的回调
const handleSuccess = (response: any, file: File, fileList: File[]) => {
    ElMessage.success('文件上传成功');
    console.log('Response:', response);
    getInfo(currentPage.value);
};

// 上传失败时的回调
const handleError = (error: any, file: File, fileList: File[]) => {
    ElMessage.error('文件上传失败');
    console.log('Error:', error);
};

const searchText = ref('');
const fileList = ref([
    {
        id: 1,
        name: "示例1.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    {
        id: 2,
        name: "示例2.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    {
        id: 3,
        name: "示例2.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    {
        id: 4,
        name: "示例2.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    {
        id: 5,
        name: "示例2.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    {
        id: 6,
        name: "示例2.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    {
        id: 7,
        name: "示例2.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    {
        id: 8,
        name: "示例2.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    {
        id: 9,
        name: "示例2.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    {
        id: 10,
        name: "示例2.docx",
        size: "30.56 KB",
        fileType: "Word",
        user: "testuser1",
        uploadTime: "2024-01-10 01:53:22"
    },
    
]);



const currentPage = ref(1);


// 获取文件列表
function getInfo(currentPage) {

    axios.get('/api/file', {
        params: {
            name: searchText.value,
            projectId: 1,
            pageNum: currentPage

        }
    }).then((res) => {
        fileList.value = res.data.data.data;
        totalPage.value = res.data.data.totalPage;
    });
}

// 进入页面的时候，获取文件列表

onMounted(() => {
    getInfo(1);

});

</script>
  
<style scoped>
.file-manager-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

.search-input {
    flex-grow: 1;
    max-width: 300px;
}
</style>
  