<template>
  <form @submit.prevent="doSearch">
    <input
      class="search"
      v-model="term"
      type="search"
      @keydown.esc.prevent="clear"
      placeholder="Digite o nome do usuário"
    />
  </form>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      term: ''
    }
  },
  methods: {
    doSearch() {
      this.$emit('doSearch', { term: this.term })
    },
    clear() {
      this.term = ''
    }
  },
  watch: {
    term() {
      if (this.term === '') {
        this.doSearch()
      }
    }
  }
}
</script>
<style lang="scss">
.search {
  font-size: 1.1em;
  padding: 5px;
  &:focus {
    outline: none !important;
  }
}

@media only screen and (max-width: 768px) {
  form {
    width: 100%;

    .search {
      width: 300px;
    }
  }
}
</style>
