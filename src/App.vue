<template>
  <div id="app">
    <user-profile />
    <search />
  </div>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue'
import Search from './components/Search.vue'

export default {
  name: 'App',
  components: { UserProfile, Search }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
