<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
      :before-close="handleClose"
    >
      <div class="form">
        <el-form :modal="formData" label-width="100px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'data-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="——"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="formData[item.prop]"
                />
              </template>
              <template v-if="item.type === 'password'">
                <el-input
                  show-password
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.id">
                    <el-option :value="option.id" :label="option.name" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";

//定义props
interface IProps {
  modalConfig: {
    pageName: string;
    header: {
      newTitle: string;
      editTitle: string;
    };
    formItems: any[];
    actions?: {
      newPageDataAction: (formData: any) => void;
      editPageDataAction: (data: any) => void;
    };
  };
}
const props = defineProps<IProps>();

//设置modal的显示和隐藏
const dialogVisible = ref(false);

const initialData: any = {};

for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = "";
}

const formData = reactive<any>(initialData);
const initialFormData = ref<any>();
const isNewRef = ref(true);
const editData = ref();

function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true;
  isNewRef.value = isNew;
  //如果是编辑，需要把数据填充到表单里面
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key];
    }
    editData.value = itemData;
    initialFormData.value = JSON.parse(JSON.stringify(formData));

    //如果是新建，需要把表单数据清空
  } else {
    for (const key in formData) {
      formData[key] = "";
    }
    editData.value = null;
  }
}

//点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false;
  if (isNewRef.value) {
    //创建新用户
    props.modalConfig.actions?.newPageDataAction(formData);
  } else {
    //编辑用户
    formData.id = editData.value.id;

    props.modalConfig.actions?.editPageDataAction(formData);
  }
}

//点击了关闭的逻辑
const handleClose = (done: () => void) => {
  const isDataModified = () => {
    // 如果是新建页面，检查 formData 是否有非空字段
    if (isNewRef.value) {
      return Object.values(formData).some(
        (value) => value !== undefined && value !== ""
      );
    }
    // 如果是编辑页面，检查 formData 是否和初始数据不一致
    return JSON.stringify(formData) !== JSON.stringify(initialFormData.value);
  };

  // 弹出确认提示框并处理关闭逻辑
  const handleConfirmClose = () => {
    ElMessageBox.confirm("关闭了信息将不会保存，您确定要关闭此窗口吗？")
      .then(() => done())
      .catch(() => {});
  };

  // 如果数据有修改，弹出确认提示框，否则直接关闭
  isDataModified() ? handleConfirmClose() : done();
};

defineExpose({ setModalVisible });
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
.modal {
  overflow: visible !important;
}
</style>
