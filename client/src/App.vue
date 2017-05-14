<template>
  <div id="app">
    <img src="./assets/flowoverstack.png" alt="logo" class="logo">
    <top-nav></top-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from './components/TopNav'
export default {
  name: 'app',
  components: {TopNav}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 50px;
}
.logo{
  width: 155px;
  height: 120px;
}
</style>
