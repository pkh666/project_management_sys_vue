<template>
  <div>
    <div class="footer">
      {{ testData.testRes }}
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive } from 'vue'

const testData=reactive({
  testRes:"hello"
})

axios.get("/api/user/test")
.then(res=>{
  console.log(res.data)
  testData.testRes=res.data
})
</script>

<style lang="less" scoped>
.footer {
  color: @mainColor;
  user-select: none; // 添加 user-select 属性，测试浏览器前缀是否有添加
}
</style>
