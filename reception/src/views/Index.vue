<template>
  <div class="page-container">
    <div class="page-banner">
      <el-image :src="src"></el-image>
    </div>
    <div class="page-course">
      <h2 class="course-title">最新课程</h2>
      <p class="course-describe">最新的课程是最好的课程</p>
      <el-row>
        <el-col
          :span="8" v-for="item in filterCourse"
          :key="item.id"
          @click.native="courseItem(item)">
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover">
            <img :src="item.image_url" class="image">
            <div style="padding:0 14px;">
              <p>{{item.name}}</p>
              <p>{{item.short_name}}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import indexModel from "../models/index"
export default {
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      course:[],
      filterCourse:[]
    }
  },
  created() {
    indexModel.indexCourse().then(res => {
      this.course = res.data.message;
      this.getCourse()
    })
  },
  methods: {
    getCourse() {
      this.filterCourse = this.filterGetCourse(this.course)
    },
    filterGetCourse(node) {
      let courseSort = node.sort((a, b) => {
        return b.created_at > a.created_at ? 1 : -1
      })
      let courses = courseSort.filter((item, index) => {
        return index+1>4*0 && index+1<=4*0+4
      })
      return courses
    },
    courseItem(row) {
      this.$router.push({ path: "/api/index/item/" + row.id });
    }
  },
}
</script>

<style lang="less" scoped>
.page-container{
  .page-banner{
    .el-image{
      /deep/img{
        max-height: 300px;
        max-width: 1280px;
      }
    }
  }
  .page-course{
    max-width: 1280px;
    margin: 0 auto;
    text-align: left;
    .el-row{
      display: flex;
      justify-content: space-between;
      /deep/.el-col{
        max-width: 235px;
        margin: 0;
        float: none;
        cursor: pointer;
        .image {
          width: 100%;
          height: 150px;
          display: block;
        }
      }
    }
    .el-row::after{content:none;}
    .el-row::before{content: none;}
  }
}
</style>