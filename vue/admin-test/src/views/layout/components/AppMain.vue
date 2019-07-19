<template>
  <section class="app-main" :class="{'app-main-pc': isPc, 'app-main-mobile': isMobile}">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
    ...mapGetters([
      "isMobile",
      "isPc"
    ]),
  }
}
</script>

<style scoped>
.app-main {
  position: relative;
  overflow: hidden;
}
.app-main-pc {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
}
.app-main-mobile {
  min-height: 100vh;
}
</style>
