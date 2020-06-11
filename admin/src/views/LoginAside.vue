<template>
  <div class="page-container">
    <div class="aside-title">EDU Pro</div>
    <div class="aside-container">
      <div class="aside-describe">
        整合企业与学校资源，实现企业实战替代理论知识，打造实用性人才
      </div>
      <div class="aside-image"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-container {
  .aside-title {
    text-align: left;
    line-height: 100px;
    font-size: 38px;
    font-family: monospace;
    font-weight: 600;
    padding: 0 25px;
    border-bottom: 1px solid #999999;
  }
  .aside-container {
    margin-top: 30px;
    padding: 0 25px;
    .aside-describe {
      line-height: 25px;
      text-align: left;
      font-size: 18px;
      font-family: monospace;
    }
    .aside-image {
      margin-top: 50px;
      // margin: 50px auto 0;
      width: 0;
      height: 0;
      border: 125px solid;
      border-color: orange blue red green;
    }
  }
}
</style>
