<template>
  <div id="app">
    <user-profile />
    <search />
  </div>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue'
import Search from './components/Search.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: { UserProfile, Search },
  async created() {
    try {
      const teste = await axios.get('/api/users')
      console.log(teste.data.users)
    } catch (error) {
      this.errorMessage = 'Problemas ao carregar a lista!'
    }
  }
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
