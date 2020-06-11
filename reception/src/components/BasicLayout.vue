<template>
  <el-container>
    <el-header><Header/></el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Header from "./BasicLayoutHeader";
export default {
  components:{
    Header
  }
}
</script>

<style lang="less" scoped>
  .el-container{
    height: 100%;
  }

  .el-main {
    background: #F5F5F5;
    color: #333;
    text-align: center;
  }
</style>