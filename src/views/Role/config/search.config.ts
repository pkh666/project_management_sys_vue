const searchConfig = {
  formItem: [
    {
      type: "input",
      prop: "name",
      label: "用户名称",
      placeholder: "请输入查询的用户名称",
    },
    {
      type: "input",
      prop: "leader",
      label: "权限介绍",
      placeholder: "请输入权限介绍",
    },

    {
      type: "data-picker",
      prop: "createAt",
      label: "创建时间",
    },
    {
      type: "input",
      prop: "demo",
      label: "无敌是",
      placeholder: "是什么",
    },
    {
      type: "select",
      prop: "parentId",
      label: "父级部门",
      placeholder: "请选择父级部门",
      options: [
        { id: 1, name: "部门1" },
        { id: 2, name: "部门2" },
      ],
    },
  ],
};

export default searchConfig;
