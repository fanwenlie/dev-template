<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:Hello</div>
    <div class="dashboard-text">roles:world</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
