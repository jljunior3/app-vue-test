<template>
  <div id="app">
    <search @doSearch="setSearchTerm" />
    <div v-if="errorMessage === ''">
      <user-profile v-for="user in list" :key="user.id" :user="user" />
    </div>
    <span v-else>{{ errorMessage }}</span>
    <span v-if="listEmpty">{{ searchEmpty }}</span>
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
      users: [],
      errorMessage: '',
      searchTerm: '',
      searchEmpty: 'Nenhum usuário encontrado!'
    }
  },
  computed: {
    list() {
      if (this.searchTerm !== '') {
        return this.users.filter(user =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }
      return this.users
    },
    listEmpty() {
      return !this.list.length > 0
    }
  },
  methods: {
    setSearchTerm(filter) {
      this.searchTerm = filter.term
    }
  },
  async created() {
    try {
      this.users = (await axios.get('/api/users')).data.users
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
