<template>

  <div class="common-layout">
    <el-container :class="topMargin">
      <el-container class="h-24 flex justify-around items-center ">
        <div class="font-bold text-blue-600 ">Mercury</div>
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
            <div class="w-20 bg-yellow-400 font-bold text-white text-center rounded-md ">
              所有宝贝
            </div>
            <div class="main border-solid border-2 border-yellow-300 rounded-md mt-4 ...">
              <div class="h-full grid-cols-4 grid ">
                <div v-for="i in currentList" :key="i">
                  <CommodityThumbnail></CommodityThumbnail>

                </div>
              </div>
            </div>
          </div>
        </el-main>
        <el-aside width="400px">
          <br/>
          <div>
            <div class="w-20 bg-blue-300 font-bold text-white text-center rounded-md ">
              热卖商品
            </div>
            <div class="bg-yellow-200 h-full rounded-md h-full grid-cols-1 grid mt-3 ">
              <div v-for="i in currentPopularList" :key="i" class="ml-2 bg-yellow-200 ">
                <HotGoodThumbnail
                    class="bg-blue-200 "
                    :id="i.Id"
                    :img="i.Cover"
                    :popularity="i.Likes * 10"
                    :price="i.Price"
                    :title="i.Name"
                ></HotGoodThumbnail>
              </div>
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

</template>

<script>
import CommodityThumbnail from "@/components/Public/CommodityThumbnail";
import HotGoodThumbnail from "@/components/Public/HotGoodThumbnail";
import {ElMessage} from "element-plus";
import {api} from "@/request";

export default {
  name: "CommoditySearch",
  props: {
    key: String
  },
  components: {
    CommodityThumbnail,
    HotGoodThumbnail
  },
  data: function () {
    return {
      input: '',
      totalPage: 100,
      commodityList: [0],
      currentList: [],
      popularList: [],
      currentPopularList: [],
      currentPage: 1,
      selectType: '宝贝',
      selectTypeList: ['宝贝', '卖家名', '标签'],
      selectId: 1,
      isAlert: false,
      isShow: false,
      topMargin: 'mt-48'
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
      if(canDis) {
        this.setList()
        this.setPopularList()
        this.setCurrentList()
      }
    })
  },

  watch: {
    $route() {
      console.log(this.$route.query)
      let temp = this.$route.query
      this.input = temp['key']
      this.selectType = temp['selectType']
      let canDis = this.isDis()
      if(canDis) {
        this.setList()
        this.setPopularList()
        this.setCurrentList()
      }
    }
  },
  methods: {
    setList: function () {
      var FormData = require('form-data');
      var data = new FormData();
      data.append('keyword', this.input);
      data.append('tag', this.selectType);
      console.log('keyword' + data.get('keyword'))
      console.log('tag' + data.get('tag'))
      api({
        url: 'commodity',
        method: 'get',
        data: data,
      })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      for (let i = 0; i < 100; i++) {
        this.commodityList[i] = {index: i, popularity: i}
      }
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
      this.currentPopularList = this.popularList.slice((this.currentPage - 1) * 8, Math.min(((this.currentPage - 1) * 8 + 8), this.popularList.length))
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
    getList: function (arr) {
      let newArr = arr.constructor === Array ? [] : {};
      for (let i in arr) {
        if (arr[i].constructor === Object || arr[i].constructor === Array) {
          newArr[i] = this.getList(arr[i])
        } else {
          newArr[i] = arr[i]
        }
      }
      return newArr;
    },
    setPopularList: function () {
      this.popularList = this.getList(this.commodityList)
      this.popularList.sort(this.compare('popularity'))
    },
    isDis: function () {
      if (this.input === '') {
        this.topMargin = 'mt-48'
        this.isShow = false
        return false
      }
      else
      {
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

.main {
  background: -webkit-linear-gradient(left top, #2f90b9 2.5%, #1781b5 7.5%, #93b5cf 20%, #d8e3e7 50%, #93b5cf 70%, #1781b5 92.5%, #2f90b9 97.5%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #000, #fff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #000, #fff); /* Firefox 3.6 - 15 */
  background-image: linear-gradient(to top, #2f90b9, #1781b5, #93b5cf, #93b5cf);
  height: 100%
}

.page {
  height: 100%
}

</style>