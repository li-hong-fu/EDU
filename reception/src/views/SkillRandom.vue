<template>
  <div class="page-container">
    <div class="title">
      <p>{{stack.name}}</p>
      <el-avatar :size="20" :src="stack.image_url"></el-avatar>
    </div>
    <div class="content">
      <div class="number">
        <span>共{{pageSize}}/{{total}}题</span>
      </div>
      <div class="subtitle">
        <span>{{question.stem}}</span>
      </div>
      <ul class="list">
        <li class="item"
          v-for="(item,index) in option"
          :key="index"
          @click="next(index)">{{option[index]}}</li>
      </ul>
      <div class="foot">
        <p>答对{{number}}题</p>
      </div>
    </div>
  </div>
</template>

<script>
import stackModel from "../models/stack"
export default {
  data() {
    return {
      stack:{},
      question:[],
      option:[],
      pageSize:1,
      total:null,
      number:0
    }
  },
  created() {
    let id = this.$route.params.id;
    let pageSize = this.pageSize;
    stackModel.indexRandom(id,{pageSize}).then(res => {
      this.stack = res.data.stacks;
      this.question = res.data.message;
      this.option = JSON.parse(this.question.option)
      this.total = res.data.total;
      console.log(this.option,this.question)
    })
  },
  methods: {
    next(index) {
      let id = this.$route.params.id;
      if(this.pageSize >= this.total){
        this.$message.error('已经最后一题了')
        return
      }else{
        let pageSize = this.pageSize ++;
        console.log(pageSize)
        stackModel.indexRandom(id,{pageSize}).then(res => {
          this.stack = res.data.stacks;
          this.question = res.data.message;
          this.option = JSON.parse(this.question.option)
          this.total = res.data.total;
          if(index == this.question.correct){
            this.number ++
          }
        })
      }
      
    }
  },
}
</script>

<style lang="less" scoped>
.page-container{
  font-family: monospace;
  font-size: 18px;
  padding: 0 60px;
  .title{
    display: flex;
    align-items: center;
    p{
      margin-right: 5px;
    }
  }
  .content{
    .number{
      text-align: right;
      height: 60px;
      line-height: 60px;
    }
    .subtitle{
      text-align: left;
      font-weight: 600;
    }
    ul{
      padding: 0;
      li{
      border: 1px solid #6666;
      list-style: none;
      border-radius: 5px;
      text-align: left;
      padding: 20px;
      margin-bottom: 10px;
      }
      li:hover{
        background: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>