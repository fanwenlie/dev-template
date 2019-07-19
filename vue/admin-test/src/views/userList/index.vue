<template>
  <div class="container" >
    <el-card shadow="always" :class="{mobile: isMobile}" :body-style="{ padding: '0' }">
      <!-- 搜索框 pc & mobile -->
      <div class="search-btn-mobile" v-if="isMobile">
        <el-input class="search-btn"
          @focus="cancelBtnShow"
          @blur="cancelBtnHide"
          v-model.trim="searchVal"
          :clearable="true" 
          placeholder="搜索姓名" >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <span v-show="searchBtnShow" @click="clickCancelBtn" class="cancel-btn">取消</span>
      </div>
      <el-input class="search-btn" v-if="isPc" icon="ios-search" v-model.trim="searchVal" :clearable="true" placeholder="搜索姓名" style="width: 200px" >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <!-- 员工列表 -->
      <div class="tableInfo" ref="table-scroll" v-loading="tableLoading">
        <div class="scrollWrap">

          <el-table stripe border :data="displayData">
              <el-table-column :label="item.title" :width="item.width" v-for="(item, index) in columns" :key="index">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row[item.key] }}</span> -->
                  <span>{{ formatCell(scope.row, item) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="查看详情" width="80">
                <template slot-scope="scope">
                  <div
                    class="btn-more"
                    size="mini"
                    @click="lookMore(scope.$index, scope.row)">更多</div>
                </template>
              </el-table-column>
          </el-table>

          <!-- Mobile使用加载更多 -->
          <div class="load-footer" v-if="loadBoxShow" @click="loadData(isSearching)">
            <i class="el-icon-loading load-anim" v-show="loading"></i>
            <span class="load-text" :class="{'load-finish': loadFinish}">{{loadText || '加载更多'}}</span>
          </div>
        </div>
      </div>
      
      <div class="backTop" v-show="backTop" @click="back2Top">
        <i class="el-icon-arrow-up"></i>
      </div>
    </el-card>
    
    
    <!-- 员工详细信息弹窗 -->
    <transition name="bounce">
      <!-- <router-view></router-view> -->
      <MoreInfo></MoreInfo>
    </transition>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BScroll from "better-scroll";
import debounce from "lodash/debounce";
import assign from "lodash/assign";

import MoreInfo from "./MoreInfo";
import { getEmployeeList } from "@/api/employee";

export default {
  name: "UserList",
  components: { MoreInfo },
  data() {
    return {
      searchVal: "",
      searchBtnShow: false,
      isSearching: false,
      tableLoading: true,
      // 加载提示状态
      loading: false,
      // 加载提示文本
      loadText: "",
      // 标识 是否数据全部加载
      loadFinish: false,
      backTop: false,
      scroll: null,
      // 一次请求n条数据
      dataLen: 15,
      columns: [
        {
          title: "员工编号",
          key: "userid",
          width: 90,
          mobileHidden: true
        },
        {
          title: "姓名",
          key: "cnname",
          width: 90
        },
        {
          title: "性别",
          key: "sex",
          width: 50
        },
        {
          title: "职称",
          key: "title"
        },
        {
          title: "在职状态",
          key: "workStatus",
          width: 100,
          mobileHidden: true
        },
        {
          title: "所属部门",
          key: "deptName",
          mobileHidden: true
        },
        {
          title: "入职时间",
          key: "entryDate",
          width: 100,
          mobileHidden: true
        },
        {
          title: "邮箱",
          key: "email",
          mobileHidden: true
          // ellipsis: true
        },
        // {
        //   title: "手机",
        //   key: "phoneno",
        //   mobileHidden: true,
        //   // ellipsis: true
        // },
        {
          title: "工作地点",
          key: "workplace",
          width: 90,
          mobileHidden: true
        }
      ],
      // 后台返回的员工数据
      employeeData: [],
      employeeTotal: 0,
      // 搜索数据
      searchData: []
    };
  },
  created() {
    this.hiddenCols();

    // 获取员工列表
    getEmployeeList({
      start: 0,
      length: this.dataLen
    }).then(json => {
      this.employeeData = this.employeeData.concat(json.data.data);

      this.tableLoading = false;

      this.employeeTotal = json.data.recordsTotal;

      this.dataIsLoadedAll(json.data.recordsTotal, this.employeeData.length);
    });

    // getServerTime();
    this.$store.dispatch("ServerTime");
  },
  mounted() {
    this.$nextTick(this.scrollInit);
  },
  updated() {
    if (!this.loading) {
      this.scroll && this.scroll.refresh();
    }
  },
  computed: {
    ...mapGetters(["isMobile", "isPc"]),
    // 根据是否在搜索状态来展示不同的数据
    displayData() {
      // 优化体验：保证在搜索中并且tableloading为false之后再显示搜索数据
      if (this.isSearching && !this.tableLoading) {
        return this.searchData;
      } else {
        return this.employeeData;
      }
    },
    loadBoxShow() {
      if (this.isSearching && this.searchData.length === 0) {
        return false;
      }
      return !this.tableLoading;
    }
  },
  watch: {
    searchVal: debounce(function(newVal, oldVal) {
      if (this.searchVal.length > 0) {
        this.isSearching = true;
        this.tableLoading = true;
        this.scroll.disable();
        getEmployeeList({
          start: 0,
          length: this.dataLen,
          keyword: newVal
        }).then(json => {
          this.searchData = json.data.data;

          this.scroll.enable();
          this.scroll.refresh();

          this.dataIsLoadedAll(json.data.recordsTotal, this.searchData.length);

          this.tableLoading = false;
          // console.log(json);
        });
      } else {
        this.isSearching = false;

        // 清空搜索数据
        this.searchData = [];

        this.dataIsLoadedAll(this.employeeTotal, this.employeeData.length);
      }

      // 只要值发生变化，则需要回到顶部和隐藏backTop按钮
      this.scroll.scrollTo(0, 0);
      this.backTop = false;
    }, 500)
  },
  destroyed() {
    console.log("index destroyed");
    // this.scroll.destroy();
  },
  methods: {
    lookMore(index, row) {
      this.$store.commit("CHANGE_USERID", row.userid);
    },
    back2Top() {
      this.scroll.scrollTo(0, 0, 1000);
    },
    cancelBtnShow() {
      // console.log('focus')
      this.searchBtnShow = true;
    },
    cancelBtnHide() {
      var isHasVal = !!this.searchVal.trim();
      // console.log('blur', isHasVal)
      if (!isHasVal) {
        this.searchBtnShow = false;
      }
    },
    // 移动端 搜索框 取消按钮
    clickCancelBtn() {
      this.searchVal = "";
      this.searchBtnShow = false;
      // console.log('span click')
    },
    /** 获取员工列表，根据是否在搜索状态表格显示不同数据
     * @param {Boolean} isSearching 标识是否在搜索状态
     */
    loadData(isSearching) {
      if (this.loadFinish || this.loading) {
        return;
      }
      this.loadMore(isSearching).then(json => {
        this.loading = false;
        this.loadText = "";

        if (isSearching) {
          this.searchData = this.searchData.concat(json.data.data);
          this.dataIsLoadedAll(json.data.recordsTotal, this.searchData.length);
        } else {
          this.employeeData = this.employeeData.concat(json.data.data);
          this.dataIsLoadedAll(
            json.data.recordsTotal,
            this.employeeData.length
          );
        }

        this.scroll.finishPullUp();
      });
    },
    loadMore(isSearching) {
      this.loading = true;
      this.loadText = "加载中...";

      let obj = {
        start: this.employeeData.length,
        length: this.dataLen
      };

      if (isSearching) {
        obj = assign(obj, {
          keyword: this.searchVal,
          start: this.searchData.length
        });
      }

      return getEmployeeList(obj);
    },
    /** 判断数据是否全部加载，底部加载区域显示不同内容
     * @param {Number} total 数据总长度
     * @param {Number} dataLen 当前已加载数据长度
     */
    dataIsLoadedAll(total, dataLen) {
      if (dataLen && total === dataLen) {
        this.loadText = "已经没有数据了";
        this.loadFinish = true;
      } else {
        this.loadText = "";
        this.loadFinish = false;
      }
    },
    scrollInit() {
      this.scroll = new BScroll(this.$refs["table-scroll"], {
        scrollbar: {
          fade: true,
          interactive: false
        },
        bounce: {
          top: true,
          bottom: true
        },
        // preventDefault: false,
        pullUpLoad: {
          threshold: -30
        },
        mouseWheel: true,
        click: true
      });
      this.scroll.on("pullingUp", () => {
        this.loadData(this.isSearching);
      });
      this.scroll.on(
        "scroll",
        debounce(({ x, y }) => {
          if (Math.abs(y) > 600) {
            this.backTop = true;
          } else {
            this.backTop = false;
          }
        }, 500)
      );
    },
    // 移动端，隐藏多列
    hiddenCols() {
      if (this.isMobile) {
        this.columns = this.columns.filter(item => {
          // 移动端时隐藏该列，无此字段或者为false则显示该列
          return !item.mobileHidden;
        });
      }
    },
    // 格式化工作状态内容
    formatCell(row, item) {
      if (item.key === "workStatus") {
        return row[item.key] === 1 ? "在职" : "离职";
      }
      return row[item.key];
    }
  }
};
</script>

<style lang="scss">
.container {
  padding: 6px;
  .el-card {
    height: 100%;
  }

  .el-card__body {
    height: 100%;
  }
}

.tableInfo {
  position: absolute;
  top: 66px;
  right: 14px;
  left: 14px;
  bottom: 20px;
  padding: 0 5px;
  overflow: hidden;

  .el-table thead {
    color: inherit;
  }
  .el-table .el-table__header th {
    background: #eaeaea;
  }
  // &::before {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   z-index: 1;
  //   border-top: 1px solid #dddee1;
  // }
}
.mobile {
  .tableInfo {
    top: 63px;
    right: 2px;
    left: 2px;
    bottom: 6px;
  }
}

.search-btn {
  margin: 10px;
  .el-input__inner {
    height: 36px;
    line-height: 1.5;
  }
  .el-icon-search {
    line-height: inherit;
    color: #737373;
  }
}
.search-btn-mobile {
  position: relative;
  display: flex;
  align-items: baseline;
  padding: 0 10px;
  background: #f2f2f2;
  .el-input__inner {
    &:focus {
      border-color: #dddee1;
      box-shadow: none;
    }
    &:hover {
      border-color: #dddee1;
    }
  }

  .cancel-btn {
    padding: 8px 1px;
    width: 36px;
    text-align: center;
    color: #5f5e5e;
  }
  .search-btn {
    margin-left: 0;
    margin-right: 0;
  }
}
.btn-more {
  padding: 3px 5px;
  margin: 0 5px;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  color: #fff;
  background-color: #fd7c2f;
  border-color: #fd7c2f;
  border-radius: 3px;
  user-select: none;
  cursor: pointer;
}
.load-footer {
  position: relative;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: #2d8cf0;
  .load-text {
    position: relative;
    left: 5px;
  }
  .load-finish {
    color: #495060;
  }
  .load-anim {
    position: relative;
    font-size: 14px;
    animation: ani-demo-spin 1s linear infinite;
  }
}
.backTop {
  position: fixed;
  z-index: 10;
  bottom: 28px;
  right: 30px;
  color: #fff;
  font-size: 20px;
  padding: 0px 6px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  cursor: pointer;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
