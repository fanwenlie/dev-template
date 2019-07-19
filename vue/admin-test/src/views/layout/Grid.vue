<template>
  <div class="grids">
    
    <router-link class="grid-item" :to="{name: 'list'}">
      <span class="grid-item-icon">
        <i class="ion-ios-person"></i>
      </span>
      <span class="grid-item-text">用户信息查询</span>
    </router-link>

    <a class="grid-item" href="#">
      <span class="grid-item-icon">
        <i class="ion-ios-stats"></i>
      </span>
      <span class="grid-item-text">数据分析</span>
    </a>
  </div>
</template>
<script>
export default {
  name: 'Grid'
}
</script>
<style lang="scss" scoped>
.grids {
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  
  // &:before {
  //   content: " ";
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   right: 0;
  //   height: 1px;
  //   border-top: 1px solid #D9D9D9;
  //   color: #D9D9D9;
  //   transform-origin: 0 0;
  //   transform: scaleY(0.5);
  // }
  .grid-item {
    position: relative;
    float: left;
    padding: 10px;
    width: 33.33333333%;
    text-align: center;
    background-color: #fff;
    &:active {
      background-color: #f3f3f3;
    }
    &:before {
      content: " ";
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      bottom: 0;
      border-right: 1px solid #D9D9D9;
      color: #D9D9D9;
      transform-origin: 100% 0;
      transform: scaleX(0.5);
    }
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #D9D9D9;
      color: #D9D9D9;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
    }

    .grid-item-icon {
      display: block;
      font-size: 30px;
      color: #4e97dd
    }
    .grid-item-text {}
  }
}
</style>



