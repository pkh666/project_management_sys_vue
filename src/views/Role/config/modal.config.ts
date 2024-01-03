const modalConfig = {
  pageName: "role",
  header: {
    newTitle: "新建角色",
    editTitle: "编辑角色",
  },
  formItems: [
    {
      type: "input",
      label: "角色名称",
      prop: "name",
      placeholder: "请输入角色名称",
    },
    {
      type: "input",
      label: "角色权限",
      prop: "intro",
      placeholder: "请输入角色权限",
    },

    {
      type: "custom",
      slotName: "menulist",
    },
  ],
  actions: {
    newPageDataAction: async (formData: any) => {
      console.log("新建的数据", formData);
    },
    editPageDataAction: async (data: any) => {
      console.log("编辑的数据", data);
    },
  },
};

export default modalConfig;
