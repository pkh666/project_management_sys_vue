<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? "数据列表" }}</h3>
      <div>
        <div
          style="position: relative; display: inline-block; margin-right: 10px"
        >
          <input
            class="input-file"
            type="file"
            :accept="contentConfig?.import?.type"
            multiple
            @change="handleFileSelect"
          />
          <el-button type="warning">导入文件</el-button>
        </div>

        <el-button type="primary" @click="handleNewUserClick">
          {{ contentConfig?.header?.btnTitle ?? "新建数据" }}
        </el-button>
        <el-tooltip content="刷新当前页" placement="top">
          <el-button
            type="success"
            :icon="RefreshRight"
            circle
            @click="refreshPage"
          />
        </el-tooltip>
      </div>
    </div>
    <el-progress
      v-if="showProgress"
      :percentage="uploadPercentage"
      color="#409EFF"
      text-inside
      type="line"
      :stroke-width="12"
    />
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <div class="btns">
                  <el-button
                    text
                    type="primary"
                    icon="Edit"
                    @click="handleEditBtnClick(scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    text
                    type="danger"
                    icon="Delete"
                    @click="handleDeleteBtnClick(scope.row.id)"
                  >
                    删除
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small="small"
        layout="total,sizes, prev, pager, next, jumper,"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatUTC } from "@/utils/format";
import { ref, watch } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { RefreshRight } from "@element-plus/icons-vue";

interface IProps {
  contentConfig: {
    pageName: string;
    header?: {
      title?: string;
      btnTitle?: string;
    };
    import?: {
      type?: string;
    };
    propsList: any[];
    actions?: {
      //写成可选的函数
      deletePageById: (id: any) => Promise<void>;
      fetchPageListData: (formData: any) => Promise<void>;
    };
    list?: {
      pageList?: any;
      pageTotalCount?: any;
    };
  };
}

//父组件传递过来的属性
const props = defineProps<IProps>();

//自定义事件,子组件向父组件传递事件
const emit = defineEmits(["newClick", "editClick"]);

//1.发起action,请求usersList数据
const currentPage = ref(1);
const pageSize = ref(10);

//页面加载的时候就要发起请求,获取数据
fetchPageListData();

//2.获取userslist数据进行展示
//使用storeToRefs作为响应式    先发请求,再获取数据
const pageList = props.contentConfig.list?.pageList;
const pageTotalCount = props.contentConfig.list?.pageTotalCount;

//3.页码相关的逻辑
//每页显示多少条数据切换的时候,也要重新发起请求
function handleSizeChange() {
  fetchPageListData();
}
//换页请求,页码改变的时候,也要重新发起请求
function handleCurrentChange() {
  fetchPageListData();
}

// 4.定义函数，用来发送网络请求
function fetchPageListData(formData: any = {}) {
  //1.获取offset/size
  const size = pageSize.value;
  const offset = currentPage.value;
  //offset就是去第几页，size就是一页多少条数据
  const pageInfo = { size, offset };

  //发起网络请求
  const quaryInfo = { ...pageInfo, ...formData };
  props.contentConfig.actions?.fetchPageListData(quaryInfo);
}

//将函数暴露出去
defineExpose({ fetchPageListData });

//5.删除的操作
function handleDeleteBtnClick(id: number) {
  ElMessageBox.confirm("确认删除该条目吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error",
  })
    .then(() => {
      // 用户点击了确定按钮
      console.log("用户点击了确定");
      props.contentConfig.actions?.deletePageById(id);
      ElMessage.success("删除成功");
    })
    .catch(() => {
      // 用户点击了取消按钮或者关闭了弹窗
    });
}

//编辑的操作
function handleEditBtnClick(itemData: any) {
  //从组件中的scope.row传给这个函数,就是这个itemData

  emit("editClick", itemData);
}

//6.新建用户
function handleNewUserClick() {
  emit("newClick");
}

const refreshPage = () => {
  // 实现刷新当前页的逻辑
  fetchPageListData();
};

//7.导入文件
const showProgress = ref(false);
const uploadPercentage = ref(0);

function handleFileSelect(e: any) {
  const files = e.target.files;
  console.log(files);

  showProgress.value = true;
  let uploadedPercentage = 0;

  const interval = setInterval(() => {
    uploadedPercentage += 10;
    uploadPercentage.value = uploadedPercentage;

    if (uploadedPercentage >= 100) {
      clearInterval(interval);
      showProgress.value = false;
    }
  }, 500);
}

//8.监听showProgress的变化(导入文件)进度条
watch(showProgress, (newValue) => {
  if (!newValue) {
    uploadPercentage.value = 0;
  }
});
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}
.input-file {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.table {
  :deep(.el-table_cell) {
    padding: 12px 0;
  }

  .btns {
    display: flex;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
