<template>
  <div class="topNav">
    <el-menu class="navbar" mode="horizontal" v-if="isPc">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg">
          <span class="user-name">尼古拉斯·赵四</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item>
            <span @click="logout" style="display:block;"><i class="ion-logout ion-ios-log-out"></i>退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <div class="hamburger-fixed" v-if="showDev">
      <hamburger :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Hamburger
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar", "isMobile", "isPc"]),
    showDev() {
      return process.env.NODE_ENV === "development" ? this.isMobile : false;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      process.env.NODE_ENV === "production" && __GLOBAL.logoutFrom.submit();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 54px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 14px;

    .avatar-wrapper {
      position: relative;
      padding: 0 5px;
      cursor: pointer;

      &:hover {
        background: #ececec;
      }

      .user-avatar {
        width: 24px;
        height: 24px;
        margin-top: -3px;
        vertical-align: middle;
        border-radius: 50%;
      }

      .el-icon-caret-bottom {
        font-size: 12px;
      }
    }
  }
}
.hamburger-fixed {
  position: fixed;
  top: 50px;
  z-index: 10;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  border-radius: 0 4px 4px 0;
  -webkit-box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  pointer-events: auto;

  .hamburger {
    font-size: 16px;
  }
}
.ion-logout {
  vertical-align: middle;
  font-size: 16px;
  padding-right: 5px;
}
</style>

