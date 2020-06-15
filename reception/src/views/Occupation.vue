<template>
  <div class="page-container">
    <h2 class="page-title">成长学习计划</h2>
    <div class="page-list">
      <div
        class="page-item"
        v-for="item in zhiye"
        :key="item.id">
        <img :src="item.image_url" alt="" class="item-img">
        <div class="item-content">
          <div class="item-title">{{item.name}}</div>
          <div class="item-description">{{item.description}}</div>
          <el-button
            type="primary"
            plain
            round
            v-if="item.status == 1"
            @click="getCourse(item.id)">进入学习</el-button>
          <el-button
            type="info"
            plain
            round
            v-if="item.status != 1">敬请期待</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ZhiYeModel from "../models/zhiye"
export default {
  data() {
    return {
      zhiye:[]
    }
  },
  created() {
    ZhiYeModel.index().then(res => {
      this.zhiye = res.data.message
    })
  },
  methods: {
    getCourse(id){
      this.$router.push({ path:"/api/occupation/item/" + id })
    }
  },
}
</script>

<style lang="less" scoped>
.page-container{
  .page-list{
    width: 90%;
    margin: auto;
    .page-item{
      display: flex;
      background: #ffffff;
      margin-bottom: 10px;
      padding: 20px;
      img{
        width: 178px;
        height: 178px;
        border: 1px solid #999999;
      }
      .item-content{
        flex: 1;
        padding-left: 20px;
        text-align: left;
        position: relative;
        button{
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
}
</style>