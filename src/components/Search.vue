<template>
  <form @submit.prevent="doSearch">
    <input v-model="term" type="search" @keydown.esc.prevent="clear" />
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
