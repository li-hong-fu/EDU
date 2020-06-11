<template>
  <div class="page-header">
    <div class="header-item left">
      <span>极客 EDU</span>
    </div>
    <div class="header-item middle">
      <div class="header-title"></div>
    </div>
    <el-col :span="12" class="header-item right">
      <el-dropdown trigger="click" @command="handLeave">
        <span class="el-dropdown-link">
          <img
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-remove">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handLeave() {
      localStorage.removeItem("token");
      this.$message.success("退出成功!");
      location.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .header-item {
    height: 50%;
    width: 180px;
    line-height: 30px;
  }
  .header-item.left {
    font-size: 24px;
    font-family: monospace;
    font-weight: 600;
  }
  .header-item.middle {
    flex: 1;
    margin: 0 20px;
    text-align: left;
    .header-title {
      width: 80px;
      text-align: center;
      font-size: 18px;
      font-family: monospace;
      font-weight: 600;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  display: flex;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
.el-icon-arrow-down {
  font-size: 12px;
  font-weight: 600;
  line-height: 30px;
  color: #000000;
}
.demonstration {
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
