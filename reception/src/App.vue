<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,body{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  min-width: 800px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
