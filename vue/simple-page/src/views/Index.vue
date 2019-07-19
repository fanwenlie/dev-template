<template>
  <p class="container">
    Hello world!!!! 
  </p>
</template>
<script>
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
NProgress.configure({ showSpinner: false })


import { json2QueryStr } from '@/utils/index'

export default {
  name: "Index",
  // components: {},
	data() {
		return {

		};
	},
	computed: {
	},
	watch: {
	},
	methods: {
		
	}
};
</script>
<style lang="scss" scoped>

</style>


