<template>
  <div>
      <i @click="toggleClick" class="hamburger ion-ios-menu" :class="{'is-active':isActive}"></i>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style>
.hamburger {
	display: inline-block;
  
  height: 100%;
  font-size: 28px;
	transform: rotate(90deg);
	transition: .38s;
  transform-origin: 50% 50%;
  cursor: pointer;
}
.hamburger.is-active {
	transform: rotate(0deg);
}
</style>
