<template>
  <el-main>
    <div class="common-layout" >
      <el-container :class="topMargin">
        <el-container class="h-24 flex justify-around items-center ml-52">
          <div class="flex justify-center">
            <el-dropdown @command="handleClick">
              <el-button type="primary">
                {{ selectType }}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in selectTypeList"
                                    v-text="item"
                                    :command="item"
                                    :key="item"
                  ></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div>&nbsp;&nbsp;</div>
            <input v-model="input" placeholder="请输入要搜索的宝贝" class="rounded-md w-96 border-solid border-2 "/>
            <div>&nbsp;&nbsp;</div>
            <el-button size="medium" type="primary" @click="pageJump()">搜索</el-button>
          </div>
          <div></div>
        </el-container>

        <el-container v-if="isShow!==false">
          <el-main>
            <div>
              <div class="text-xl w-28 pt-2 pb-2 bg-yellow-400 font-bold text-white text-center rounded-md ">
                所有宝贝
              </div>
              <div class=" border-solid border-2 border-blue-300 rounded-md mt-4 ..."
                   bgcolor="rgba(255,255,255,0.3)">
                <div class="h-full grid-cols-4 grid ">
                  <CommodityThumbnail
                      v-for="i in currentList"
                      :key="i.Id"
                      :commodity="i"
                  >
                  </CommodityThumbnail>

                </div>
              </div>
            </div>
          </el-main>
          <el-aside width="400px">
            <br/>
            <div>
              <div class="text-xl w-28 pt-2 pb-2  bg-blue-300 font-bold text-white text-center rounded-md ">
                热卖商品
              </div>
              <div class="border-solid border-2 border-blue-300 h-full rounded-md h-full grid-cols-1 grid mt-3 ">
                <HotGoodThumbnail v-for="i in currentPopularList"
                                  :key="i.Id"
                                  :commodity="i">
                </HotGoodThumbnail>
              </div>

            </div>
          </el-aside>
        </el-container>
        <el-footer class="flex justify-center " v-if="isShow!==false">
          <el-pagination
              background
              :page-size="32"
              @current-change="handleCurrentChange"
              :data="commodityList.slice((currentPage - 1)*32, currentPage*32)"
              layout="total, prev, pager, next, jumper"
              :total=totalPage>
          </el-pagination>
        </el-footer>
      </el-container>
    </div>
  </el-main>
</template>

<script>
import CommodityThumbnail from "@/components/Public/CommodityThumbnail";
import HotGoodThumbnail from "@/components/Public/HotGoodThumbnail";
import {ElMessage} from "element-plus";
import {api} from "@/request";

export default {
  name: "CommoditySearch",
  components: {
    CommodityThumbnail,
    HotGoodThumbnail
  },
  data: function () {
    return {
      input: '',
      totalPage: 100,
      commodityList: [],
      currentList: [],
      popularList: [],
      currentPopularList: [],
      currentPage: 1,
      selectType: '宝贝',
      selectTypeList: ['宝贝', '卖家名', '标签'],
      formData: ['keyword', 'owner', 'tag'],
      selectId: 1,
      isAlert: false,
      isShow: false,
      topMargin: 'mt-96'
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$route.query)
      let temp = this.$route.query
      if (temp['key'] !== undefined) {
        this.input = temp['key']
      }
      if (temp['searchType'] !== undefined) {
        this.selectType = temp['selectType']
      }
      let canDis = this.isDis()
      if (canDis) {
        this.setList()
      }
    })
  },

  watch: {
    $route() {
      console.log('watch')
      let fir = this.$route.fullPath.split('/')[1]
      if (fir.indexOf('CommoditySearch') === 0) {
        console.log('********************************************')
        let temp = this.$route.query
        this.input = temp['key']
        this.selectType = temp['selectType']
        let canDis = this.isDis()
        if (canDis) {
          this.setList()
        }
      } else {
        this.$router.go(0)
      }
    }
  },
  methods: {
    setList: function () {
      var FormData = require('form-data');
      var data = new FormData();
      data.append(this.getFormData(), this.input);
      console.log('commodity?' + this.getFormData() + '=' + data.get(this.getFormData()))
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      const that = this
      api({
        url: 'commodity/?' + this.getFormData() + '=' + data.get(this.getFormData()),
        method: 'get',
      })
          .then(function (response) {
            console.log(JSON.stringify(response.data))
            if (response.data.Code === "200") {
              console.log('接收成功');
              that.totalPage = Number(response.data["totalPage"])
              that.commodityList = response.data["commodityList"]
              console.log(that.commodityList[0])
              that.setPopularList()
              that.setCurrentList()
            } else {
              ElMessage.error({
                message: "输入数据有误，请重新输入"
              })
            }
          })
          .catch(function (error) {
            console.log(error);
            ElMessage.error({
              message: "服务器似乎在开小差..."
            })
          });
    },
    getFormData: function () {
      if (this.selectType === '宝贝') {
        return 'keyword'
      } else if (this.selectType === '卖家名') {
        return 'ownerName'
      } else if (this.selectType === '标签') {
        return 'tag'
      }
      return 'id'
    },
    pageJump: function () {
      let str = this.input.replace(' ', '');
      if (str.length === 0) {
        ElMessage.warning({
          message: '搜索内容不能为空',
          type: 'warning'
        });
        return
      }
      console.log('success')
      this.isAlert = false
      this.$router.push({
        path: '/CommoditySearch',
        query: {
          key: this.input,
          selectType: this.selectType
        }
      });
    },
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.setCurrentList()
    },
    setCurrentList: function () {
      this.currentList = this.commodityList.slice((this.currentPage - 1) * 32, Math.min(((this.currentPage - 1) * 32 + 32), this.commodityList.length))
      let len = Math.min(32, this.commodityList.length - (this.currentPage - 1) * 32) / 4
      len = Math.floor(len) + 3
      this.currentPopularList = this.popularList.slice(
          (this.currentPage - 1) * 8, Math.min(((this.currentPage - 1) * 8 + len), this.popularList.length)
      )
    },
    handleClick: function (selectType) {
      this.selectType = selectType
      for (let i = 0; i < this.selectTypeList; i++) {
        if (selectType === this.selectTypeList[i]) {
          this.selectId = i + 1
        }
      }
    },
    compare: function (property) {
      return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value2 - value1;
      }
    },

    setPopularList: function () {
      this.popularList = this.commodityList
      console.log(this.popularList)
      this.popularList = this.popularList.sort(this.compare('Likes'))
      console.log('-------------------------------------------------')
      console.log(this.popularList[0])
    },
    isDis: function () {
      if (this.input === '') {
        this.topMargin = 'mt-48'
        this.isShow = false
        return false
      } else {
        this.topMargin = ''
        this.isShow = true
        return true
      }
    }
  }

}
</script>

<style scoped>
.el-header {
  background: #0f1423;
}

.el-main {
  background: -webkit-linear-gradient(left top, #2f90b9 2.5%, #1781b5 7.5%, #93b5cf 20%, #d8e3e7 50%, #93b5cf 70%, #1781b5 92.5%, #2f90b9 97.5%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #000, #fff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #000, #fff); /* Firefox 3.6 - 15 */
  background-color: #93b5cf;
}

.main {
  background: -webkit-linear-gradient(left top, #2f90b9 2.5%, #1781b5 7.5%, #93b5cf 20%, #d8e3e7 50%, #93b5cf 70%, #1781b5 92.5%, #2f90b9 97.5%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #000, #fff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #000, #fff); /* Firefox 3.6 - 15 */
  background-image: linear-gradient(to top, #2f90b9, #1781b5, #93b5cf, #93b5cf);
}

.el-aside {
  background: -webkit-linear-gradient(left top, #2f90b9 2.5%, #1781b5 7.5%, #93b5cf 20%, #d8e3e7 50%, #93b5cf 70%, #1781b5 92.5%, #2f90b9 97.5%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #000, #fff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #000, #fff); /* Firefox 3.6 - 15 */
  background-color: #93b5cf;
}

.category-window {
  @apply rounded-xl;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  padding: 1rem;
}


.el-aside {
  @apply rounded-md;
  position: sticky !important;
  top: 0;
}

.page {
  height: 100%
}

</style>