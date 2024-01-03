import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const isCollapse = ref(false);
  const menuWith = ref("200px");
  const state = reactive({
    tagList: [
      {
        path: "/home",
        label: "首页",
      },
    ],
  });
  function collapseMenu() {
    isCollapse.value = !isCollapse.value;
    if (isCollapse.value) {
      menuWith.value = "55px";
      console.log(menuWith.value);
    } else {
      menuWith.value = "200px";
      console.log(menuWith.value);
    }
  }
  function closeMenu() {
    isCollapse.value = true;
    menuWith.value = "55px";
  }
  function addTag(val: any) {
    //判断添加的数据是否为首页
    if (val.label !== "首页") {
      const index = state.tagList.findIndex((item) => item.label == val.label);
      //如果不存在
      if (index === -1) {
        state.tagList.push(val);
      }
    }
    localStorage.setItem("currentUserRole", val.path);
  }
  function cleanTag() {
    state.tagList = [
      {
        path: "/home",
        label: "首页",
      },
    ];
    localStorage.setItem("currentUserRole", "home");
  }
  return {
    isCollapse,
    collapseMenu,
    menuWith,
    state,
    addTag,
    cleanTag,
    closeMenu,
  };
});
