<template>
  <div class="page-container">
    <div class="skill-list">
      <el-button
        v-for="item in stack"
        :key="item.id"
        @click="handStackItem(item.id)">{{item.name}}</el-button>
    </div>
  </div>
</template>

<script>
import stackModel from "../models/stack"
export default {
  data() {
    return {
      stack:[]
    }
  },
  created() {
    stackModel.index().then(res => {
      this.stack = res.data.message
      this.stack.sort((a, b) => {
        return b.created_at > a.created_at ? 1 : -1
      })
    })
  },
  methods: {
    handStackItem(id){
      this.$router.push({path:`/api/skill/${id}`})
    }
  },
}
</script>

<style lang="less" scoped>
.skill-list{
  max-width: 1080px;
  margin: auto;
  text-align: left;
  button{
    margin: 10px;
  }
}
</style>