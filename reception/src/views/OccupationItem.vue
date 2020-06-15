<template>
  <div class="page-container">
    <div class="zhiye-title">
      <h2>{{zhiye.name}}</h2>
      <p>{{zhiye.description}}</p>
    </div>
    <div class="zhiye-container">
      <div class="zhiye-content">
        <h3>学习路线</h3>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{zhiyePathItem.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
          <el-col
            :span="8"
            v-for="course in course"
            :key="course.id"
            @click.native="courseItem">
            <el-card
              :body-style="{ padding: '0px' }"
              shadow="hover">
              <img :src="course.image_url" class="image">
              <div style="padding:0 14px;">
                <p>{{course.name}}</p>
                <p>{{course.short_name}}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-menu :default-active="`${path}`">
        <el-menu-item
          v-for="item in zhiyePath"
          :key="item.id"
          :index="`${item.id}`"
          @click="openItem(item.id)">
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import zhiyePathModel from "../models/zhiye"
export default {
  data() {
    return {
      path:'1',
      zhiye:{},
      zhiyePath:[],
      course:[],
      zhiyePathItem:{}
    }
  },
  created() {
    let id = this.$route.params.id;
    zhiyePathModel.indexItem(id).then(res => {
      this.zhiye = res.data.message;
      this.zhiyePath = res.data.zhiyePath;
      this.openItem(this.path)
    })
  },
  watch: {
    path(val){
      this.openItem(val)
    }
  },
  methods: {
    openItem(id){
      zhiyePathModel.indexItemCourse(id).then(res => {
        this.course = res.data.message
        this.zhiyePathItem = res.data.zhiyePath[0]
      })
    },
    courseItem(){
      console.log(123)
    }
  },
}
</script>

<style lang="less" scoped>
.page-container{
  .zhiye-title{
    padding-bottom: 20px;
    font-family: monospace;
    h2{
      font-size: 42px;
    }
    p{
      font-size: 18px;
    }
  }
  .zhiye-container{
    background: #ffffff;
    display: flex;
    align-items: stretch;
    justify-content: center;
    .zhiye-content{
      width: 60%;
      margin: 20px;
      text-align: left;
      border: 1px solid;
      padding: 10px 20px;
      .el-breadcrumb{
        height: 50px;
        line-height: 50px;
        border: 1px solid;
        padding: 0 20px;
        border-radius: 50px;
        margin-bottom: 20px;
      }
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
    .el-menu{
      border: 1px solid;
      margin: 20px 0;
      width: 200px;
      text-align: left;
    }
  }
}
</style>