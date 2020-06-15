<template>
  <div class="page-container">
    <div class="zhiye-title">
      <h1>{{zhiye.name}}</h1>
      <p>{{zhiye.description}}</p>
    </div>
    <div class="zhiye-container">
      <div class="zhiye-content">
        123123123
      </div>
      <el-menu default-active="2">
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
      zhiye:{},
      zhiyePath:[]
    }
  },
  created() {
    let id = this.$route.params.id;
    zhiyePathModel.indexItem(id).then(res => {
      this.zhiye = res.data.message;
      this.zhiyePath = res.data.zhiyePath;
    })
  },
  methods: {
    openItem(id){
      console.log(id)
    }
  },
}
</script>

<style lang="less" scoped>
.page-container{
  .zhiye-title{
    padding-bottom: 20px;
    font-family: monospace;
    h1{
      font-size: 42px;
    }
    p{
      font-size: 18px;
    }
  }
  .zhiye-container{
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    .zhiye-content{
      width: 60%;
      margin-right: 20px;
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