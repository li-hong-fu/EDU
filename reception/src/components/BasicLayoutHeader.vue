<template>
  <div class="page-header">
    <div class="header-logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <el-menu :default-active="path" class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item
        v-for="route in filterRoutes"
        :key="route.path"
        :index="route.path"
        :route="{ path: route.path }">{{route.meta.nav.title}}</el-menu-item>
    </el-menu>
    <el-col :span="12" class="header-setup">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img
            :src="avatar_url"
          />
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{name:'UserEdit'}"><i class="el-icon-user-solid"></i> 个人设置</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{name:'UserSecurity'}"><i class="el-icon-s-tools"></i> 账号安全</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" @click="handLeave"><i class="el-icon-remove"></i> 退出登录</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </div>
</template>

<script>
import routes from "@/router/routes";
import userModel from "../models/users"
export default {
  data() {
    return {
      path: this.$route.path,
      filterRoutes:[],
      avatar_url:''
    };
  },
  created() {
    this.getRoutes();
    let id = localStorage.getItem("user_id");
    userModel.userInfo(id).then(res => {
      this.avatar_url = res.data.message[0].avatar_url
    })
  },
  watch: {
    $route(to) {
      this.path = to.path;
    },
  },
  methods: {
    getRoutes() {
      this.filterRoutes = this.filterNavigator(routes);
    },
    filterNavigator(node) {
      let result = [];
      node.forEach(data => {
        if (data.meta && data.meta.nav) {
          let item = {
            path: data.path,
            name: data.name,
            meta: data.meta
          }
          result.push(item);
        }else if (data.children) {
          this.filterNavigator(data.children).forEach(item =>
            result.push(item)
          );
        }
      })
      return result;
    },
    hasNavChildren(route) {
      const children = route.children || [];
      return children.some(data => data.meta && data.meta.nav);
    },
    handLeave() {
      let id = localStorage.getItem("user_id");
      userModel.logout(id).then(res => {
        if(res.data.code == 200){
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.$message.success("退出成功!");
          location.reload();
        }
      })
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
  line-height: 100%;
  .header-logo {
    width: 200px;
  }
  .el-menu-demo {
    flex: 1;
    text-align: left;
  }
  .el-col-12{
    width: 100px;
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
.el-dropdown-menu{
  a{
    text-decoration: none;
    color: #000000;
  }
  button{
    color: #000000;
  }
}
</style>
