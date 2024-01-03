import useSystemStore from "@/store/main/main";
import { storeToRefs } from "pinia";

const systemStore = useSystemStore();

const { pageList, pageTotalCount } = storeToRefs(systemStore);

const contentConfig = {
  pageName: "role",
  header: {
    title: "角色列表",
    btnTitle: "新建角色",
  },
  import: {
    type: ".docx",
  },
  propsList: [
    // { type: "selection", label: "选择", width: "80px" },
    { type: "index", label: "序号", width: "80px" },
    { type: "normal", prop: "name", label: "角色名称", width: "180px" },
    { type: "normal", prop: "intro", label: "角色权限", width: "180px" },
    { type: "timer", prop: "createAt", label: "创建时间" },
    { type: "timer", prop: "updateAt", label: "更新时间" },
    { type: "handler", label: "操作", width: "180px" },
  ],
  actions: {
    deletePageById: async (id: any) => {
      console.log("删除了的id", id);
    },
    fetchPageListData: async (formData: any = {}) => {
      console.log("获取数据需要传的参数", formData);
    },
  },
  list: { pageList, pageTotalCount },
};
export default contentConfig;
