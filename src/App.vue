<template>
  <div id="app">
    <search />
    <user-profile v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue'
import Search from './components/Search.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: { UserProfile, Search },
  data() {
    return {
      users: []
    }
  },
  async created() {
    try {
      this.users = (await axios.get('/api/users')).data.users
      console.log('user', this.users)
    } catch (error) {
      console.log(error)
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
