<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>EDU</span>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "EDU 是一个多功能管理项目 " + o }}
    </div>
  </el-card>
</template>
