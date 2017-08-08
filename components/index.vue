<template>
  <component :is="name"></component>
</template>
<script>
  module.exports = {
    props: ['type'],
    computed: {
      name() {
        return `feather-${this.type}`
      }
    }
  }
</script>