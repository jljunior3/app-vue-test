<template>
  <div data-testid="button-card" class="user-card" @click="setUserSeletected">
    <span class="user-name">{{ user.name }}</span>
    <span class="user-email">{{ user.email }}</span>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    setUserSeletected() {
      this.$store.commit('SET_USER_SELECTED', this.user)
    }
  }
}
</script>
<style lang="scss">
.user-card {
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: #fff;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }

  .user-name {
    font-size: 1.2em;
    margin: 5px;
  }

  .user-email {
    font-size: 0.9em;
    margin-bottom: 5px;
  }
}
</style>
