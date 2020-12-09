<template>
  <div>
    <span>{{ user.name }}</span>
    <span>{{ user.email }}</span>
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
  created() {}
}
</script>
