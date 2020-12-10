<template>
  <div id="app">
    <div class="header">
      <img
        class="logo"
        src="https://dasa.com.br/sites/dasa.com.br/themes/custom/dasa/dist/images/dasa-logo.png"
      />
      <search @doSearch="setSearchTerm" />
    </div>

    <user-selected v-if="!listEmpty" />

    <div class="users-cards" v-if="errorMessage === ''">
      <user-profile v-for="user in list" :key="user.id" :user="user" />
    </div>

    <span v-else>{{ errorMessage }}</span>

    <span class="empty-message" v-if="listEmpty">{{ searchEmpty }}</span>
  </div>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue'
import Search from './components/Search.vue'
import axios from 'axios'
import UserSelected from './components/UserSelected.vue'

export default {
  name: 'App',
  components: { UserProfile, Search, UserSelected },
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
        return this.users.filter(
          user =>
            user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
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
body {
  background-color: #3d2892;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.users-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.empty-message {
  color: #fff;
  font-size: 1.5em;
}

@media only screen and (max-width: 768px) {
  .header {
    flex-direction: column;
    img {
      margin-bottom: 10px;
    }
  }
}
</style>
