<template lang="">
  <div class="message">
    <span v-if="userSelected !== ''">
      <span class="icon">&#9733;</span>
      Usuário selecionado: {{ userSelected.name }}
    </span>
    <span v-else>Nenhum usuário selecionado</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserSelected',
  computed: {
    ...mapState(['userSelected'])
  }
}
</script>

<style lang="scss">
.message {
  font-size: 1.2em;
  color: white;

  .icon {
    color: yellow;
  }
}
</style>
