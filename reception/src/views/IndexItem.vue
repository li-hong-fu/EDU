<template>
  <div class="page-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/api/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{course.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="course">
        <el-image :src="course.image_url"></el-image>
        <div class="course-content">
          <div class="course-title">
            <h3>{{course.name}}</h3>
            <span>{{course.short_name}}</span>
          </div>
          <span class="course-describe">{{course.description}}</span>
        </div>
      </div>
    </el-card>
    <el-card class="box-card"
      v-for="item in chapter"
      :key="item.id">
      <div slot="header" class="clearfix">
        <span>{{item.name}}</span>
      </div>
      <div
        v-for="section in item.section"
        :key="section.id"
        class="text item">
        <span>{{section.name}}</span>
        <el-button type="text" @click="sectionItem(section)">开始学习</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import indexModel from "../models/index"
export default {
  data() {
    return {
      course:[],
      chapter:[]
    }
  },
  created() {
    let id = this.$route.params.id;
    indexModel.indexItem(id).then(res => {
      this.course = res.data.course[0]
      this.chapter = res.data.chapter
    })
  },
  methods: {
    sectionItem(row) {
      let id = this.$route.params.id;
      this.$router.push({ path: "/api/web/course/" + id + "/" + row.id });
    }
  },
}
</script>

<style lang="less" scoped>
.page-container{
  .el-breadcrumb{
    margin-bottom: 20px;
  }
  .box-card{
    width: 90%;
    margin: 0 auto 30px;
    text-align: left;
    font-size: 18px;
    font-family: monospace;
    .course{
      display: flex;
      justify-content: space-between;
      .el-image{
        max-width: 200px;
        border: 1px solid #999999;
      }
      .course-content{
        flex: 1;
        padding: 0px 20px;
        .course-title{
          display: flex;
          align-items: baseline;
          margin-bottom: 20px;
          h3{
            font-size: 24px;
            margin: 0 30px 0 0;
          }
        }
      }
    }
    .text {
      font-size: 14px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button{
        color: #666666;
      }
      button:hover{
        color: #000000;
      }
    }
  }
}
</style>