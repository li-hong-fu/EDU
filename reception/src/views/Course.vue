<template>
  <el-container>
    <el-header>
      <div style="width:180px" class="page-title">21313131</div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      course:[],
      chapter:[]
    }
  },
  created() {
    console.log(this.$route.params)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
},
}
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
  background: #F5F5F5;
  .el-header{
    text-align: center;
    line-height: 60px;
    background: #ffffff;
    margin: 20px;
    margin-bottom: 0;
    .page-title{
      text-align: left;
      font-size: 24px;
      font-family: monospace;
      border-right: 20px solid #f5f5ff;
    }
  }
  .el-aside {
    margin: 20px;
    text-align: center;
    line-height: 200px;
    background: #ffffff;
    .el-menu{
      border: none;
    }
  }
  .el-main {
    text-align: center;
    line-height: 160px;
    background: #ffffff;
    margin: 20px;
    margin-left: 0;
  }
}
</style>