<template>
  <el-container>
    <el-aside style="width:200px;margin-right:20px"><Aside/></el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Aside from "./BasicLayoutUserAside"
export default {
  components:{
    Aside
  }
}
</script>

<style lang="less" scoped>
  .el-aside {
    background: #ffffff;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background: #ffffff;
    color: #333;
    text-align: center;
  }
</style>