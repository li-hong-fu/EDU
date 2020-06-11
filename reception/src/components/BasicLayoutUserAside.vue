<template>
  <el-menu
    :default-active="path" :router="true">
    <el-menu-item 
      v-for="route in filterRoutes"
      :key="route.path"
      :index="route.path"
      :route="{ path: route.path }">
      <i v-if="route.meta.info.icon" :class="route.meta.info.icon"></i>
      <span slot="title">{{route.meta.info.title}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import routes from "@/router/routes";
export default {
  data() {
    return {
      path: this.$route.path,
      filterRoutes: []
    }
  },
  created() {
    this.getRoutes();
  },
  watch: {
    $route(to) {
      this.path = to.path;
    }
  },
  methods: {
    getRoutes() {
      this.filterRoutes = this.filterNavigator(routes);
    },
    filterNavigator(node) {
      let result = [];
      node.forEach(data => {
        if(data.meta && data.meta.info){
          let item = {
            path: data.path,
            name: data.name,
            meta: data.meta
          };
          result.push(item)
        }else if(data.children){
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
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  border: none;
}
</style>