<template>
  <el-container>
    <el-header>
      <div style="width:180px" class="page-title">{{course.name}}</div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="`${path}`"
          class="el-menu-vertical-demo">
          <el-submenu 
            v-for="(item) in chapter"
            :key="item.id"
            :index="`chapter${item.id}`">
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group
              v-for="section in item.section"
              :key="section.id">
              <el-menu-item 
                :index="`${section.id}`"
                @click="handleOpen(section.id)">{{section.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import indexModel from "../models/index"
export default {
  data() {
    return {
      course:[],
      chapter:[],
      path:null
    }
  },
  created() {
    let id = this.$route.params.id;
    let sectionId = this.$route.params.sectionId;
    indexModel.indexItem(id).then(res => {
      this.course = res.data.course[0];
      this.chapter = res.data.chapter;
      this.getPath(sectionId)
    })
  },
  methods: {
    getPath(id) {
      this.path = id
    },
    handleOpen(sectionId){
      let id = this.$route.params.id;
      this.$router.push({ path: "/api/web/course/video/" + id + '/' + sectionId});
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