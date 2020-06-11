<template>
  <el-menu
    :default-active="path"
    :router="true"
    background-color="#D3DCE6"
    text-color="#000"
    active-text-color="#55AA00"
  >
    <template v-for="route in filterRoutes">
      <el-submenu
        v-if="hasNavChildren(route)"
        :index="route.path"
        :key="route.path"
      >
        <template slot="title">
          <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
          <span slot="title">{{ route.meta.nav.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="route in route.children"
            :key="route.path"
            :index="route.path"
            :route="{ path: route.path }"
            :id="route.name"
          >
            <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
            <span slot="title">{{ route.meta.nav.title }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item
        v-else
        :key="route.path"
        :disabled="route.disabled"
        :index="route.path"
        :route="{ path: route.path }"
        :id="route.name"
      >
        <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
        <span slot="title">{{ route.meta.nav.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import routes from "@/router/routes";
import userModel from "../models/user";
export default {
  data() {
    return {
      path: this.$route.path,
      slugs: [],
      filterRoutes: []
    };
  },
  created() {
    const TOKEN = localStorage.getItem("token");
    userModel.permission({ TOKEN }).then(res => {
      let permission_slug = res.data.message[0].permission_slug;
      this.slugs = permission_slug.split(",");
      this.slugs.push("index");
      this.getRoutes();
      this.router();
    });
  },
  watch: {
    $route(to) {
      this.path = to.path;
      this.router();
    }
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
          };
          if (data.children) {
            item.children = this.filterNavigator(data.children);
          }
          if (item.meta.slug) {
            let state = this.slugs.some(data => data == item.meta.slug);
            if (state) {
              result.push(item);
            }
          }
        } else if (data.children) {
          this.filterNavigator(data.children).forEach(item =>
            result.push(item)
          );
        }
      });
      return result;
    },
    hasNavChildren(route) {
      const children = route.children || [];
      return children.some(data => data.meta && data.meta.nav);
    },
    router() {
      let slugs = this.$route.meta.slug;
      let state = this.slugs.some(data => data == slugs);
      if (!state && slugs != "index") {
        this.$router.push({ name: "Index" });
        this.$message.error("你没有权限进入该页面");
      }
    }
  }
};
</script>

<style lang="less">
.el-menu {
  border-right: none;
}
</style>
