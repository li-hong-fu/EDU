<template>
  <div class="main-container">
    <div class="mian-description">
      <div class="title">Project</div>
      <div class="text">project description</div>
    </div>
    <div class="main-content">
      <Version />
      <Storie />
    </div>
  </div>
</template>

<script>
import Version from "../views/IndexProjectVersion";
import Storie from "../views/IndexProjectStories";
export default {
  components: {
    Version,
    Storie
  }
};
</script>

<style lang="less" scoped>
.mian-description {
  text-align: left;
  margin-bottom: 15px;
  line-height: 24px;
  color: #000000;
  padding: 10px 0;
  border-bottom: 2px solid #000000;
  .title {
    font-size: 24px;
  }
}
.main-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
