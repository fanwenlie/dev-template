<template>
  <div class="info-more" v-if="infoShow">
    <div class="info-close" @click="show(false)">
      <i class="ion-ios-close"></i>
    </div>
    <div class="info-main">
      <div class="avatar">
        <!-- <i size="large" shape="circle" icon="ios-person" :src="personInfo.headImg"></i> -->
        <span class="avatar-head">
          <img class="avatar-img" v-if="personInfo.headImg" :src="personInfo.headImg">
          <i v-else class="ion-ios-person"></i>
        </span>
        
      </div>
      
      <div class="info-group">
        <el-card class="box-card" v-for="(obj, i) in datas" :key="i">
          <div slot="header">
            <h4>{{obj.type}}</h4>
          </div>
          <ul class="items">
            <li v-for="(item, index) in obj.list" :key="index">
              <span class="item-left">{{item.attr}}：</span>
              <span class="item-right">{{item.val}}</span>
            </li>
          </ul>
        </el-card>
      </div>
      <!-- <el-table stripe border :show-header="false" :data="datas">
        <el-table-column :label="item.title" :width="item.width" v-for="(item, index) in coldatas" :key="index">
          <template slot-scope="scope">
            <span>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>
<script>
import { getEmployeeOne } from "@/api/employee";
export default {
  name: "MoreInfo",
  props: {},
  destroyed() {
    // EventBus.$off(['infoShow', 'serverTime'])
  },
  data() {
    return {
      infoShow: false,
      // 保存ajax获取到的个人信息数据
      personInfo: {},
      coldatas: [
        {
          title: "属性",
          width: 120,
          key: "attr"
        },
        {
          title: "值",
          key: "val"
        }
      ],
      datas: []
    };
  },
  computed: {
    userid() {
      return this.$store.state.userList.userid;
    },
    serverTime() {
      return this.$store.getters.serverTime
        ? this.$store.getters.serverTime
        : new Date();
    }
  },
  watch: {
    userid: function(newVal, oldVal) {
      if (!newVal) {
        return;
      }
      // 获取单个员工信息
      getEmployeeOne({
        userId: newVal
      }).then(json => {
        // console.log(json.data);
        this.personInfo = json.data;
        this.infoShow = true;
        this.datas = this.createTableRow(this.personInfo);
      });
    }
  },
  methods: {
    show(isShow) {
      this.infoShow = isShow;
      // isShow为false，清空userid
      !isShow && this.$store.commit("CHANGE_USERID", "");
    },
    /**
     * @param {String} date 类似'2018-03-05'
     * @returns {String}
     */
    workLife(date) {
      let times =
        (this.serverTime
          ? new Date(this.serverTime).getTime()
          : new Date().getTime()) - new Date(date).getTime();
      let one = 24 * 60 * 60 * 1000;
      let day = times / one;
      let res = "";
      if (day < 365) {
        res = getMonth(day);
      } else {
        let year = ~~(day / 365) + "年";
        let num = day % 365;
        res = year + getMonth(num, year);
      }

      function getMonth(day, year) {
        let temp = ~~(day / 30);
        return temp > 0 ? temp + "个月" : year ? "" : "不满1个月";
      }
      return res;
    },
    /**
     * @param info {Object} 后台请求到的个人信息
     */
    createTableRow(info) {
      let tableRow = [
        {
          type: "基本信息",
          list: [
            {
              attr: "员工编号",
              val: info.userid
            },
            {
              attr: "姓名",
              val: info.cnname
            },
            {
              attr: "性别",
              val: info.sex
            },
            {
              attr: "邮箱",
              val: info.email
            },
            {
              attr: "在职状态",
              val: info.workStatus === 1 ? "在职" : "离职"
            },
            {
              attr: "所属部门",
              val: info.deptFullName
            },
          ]
        },

        {
          type: "考勤信息",
          list: [
            {
              attr: "平均工时",
              val: info.workMinute
            },
            {
              attr: "工时排名(公司)",
              val: info.workRankByCompany
            },
            {
              attr: "工时排名(部门)",
              val: info.workRankByDept
            }
          ]
        },

        {
          type: "职位信息",
          list: [
            {
              attr: "职位族",
              val: info.vocationalFamily
            },
            {
              attr: "职位类",
              val: info.jobcategory
            },
            {
              attr: "职位",
              val: info.jobtitle
            },
            {
              attr: "专业Title",
              val: info.title
            },
            {
              attr: "专业职级",
              val: info.rankVo
            },
            
          ]
        },

        {
          type: "其他信息",
          list: [
            {
              attr: "司龄",
              val: this.workLife(info.entryDate)
            },
            {
              attr: "入职时间",
              val: info.entryDate
            },
            {
              attr: "转正时间",
              val: info.trialendDate
            },
            {
              attr: "工作地点",
              val: info.workplace
            },
            {
              attr: "汇报对象",
              val: info.workReport
            }
          ]
        }
      ];
      // 排除val为null的数据，代表没查看权限
      // val为空字符串，代表空值
      tableRow = tableRow.reduce(
        (sum, cur) => {
          cur.list = cur.list.filter(item => {
            return item.val !== null && item.val !== ""
          })
          return sum.concat([cur])  
        },
        []
      )

      return tableRow;
    }
  }
};
</script>
<style lang="scss">
.info-more {
  position: fixed;
  z-index: 10000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f8f8f8;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .info-close {
    position: fixed;
    z-index: 1;
    top: 20px;
    left: 12px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  .info-main {
    max-width: 960px;
    margin: 20px auto;
    padding: 5px;

    .avatar {
      height: 100px;
      line-height: 80px;
      text-align: center;
    }
    .avatar-head {
      display: inline-block;
      text-align: center;
      background: #ccc;
      color: #fff;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      vertical-align: middle;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .ion-ios-person {
        position: relative;
        top: -10px;
        font-size: 30px;
      }

      .avatar-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.info-group {
  font-size: 14px;
  .items li {
    padding: 5px 0;
  }
  .item-right {
    // float: right;
    // width: 248px;
    word-break: break-all;
  }
  .box-card {
    margin-bottom: 10px;
  }
  
  .box-card .el-card__header {
    padding: 12px 20px;
    color: #fff;
    background-color: #fd7c2f;
  }
}
</style>


