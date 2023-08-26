<template>
    <div class="container">
      <a-spin :spinning="isLoading">
        <!-- 工作区 -->
        <div class="work-content">
          <!-- 组件库 -->
          <!-- <Components @handleClickItem="onAddItem" /> -->
          <!--手机容器-->
          <!-- <Phone
            v-if="!isLoading"
            :data="data"
            :selectedIndex="selectedIndex"
            @onEditer="onEditer"
            @onDeleleItem="onDeleleItem"
          /> -->
          <!-- 编辑器 -->
          <!-- <Editor
            v-if="!isLoading"
            :defaultData="defaultData"
            :data="data"
            :selectedIndex="selectedIndex"
            :curItem="curItem"
          /> -->
        </div>
        <!-- 操作栏 -->
        <div class="footer">
          <div class="footer-content">
            <a-button type="primary" :loading="isLoading" @click="onFormSubmit">保存</a-button>
            <!-- <a-button>另存为</a-button> -->
          </div>
        </div>
      </a-spin>
    </div>
</template>
  
<script>
import _ from 'lodash'

export default {
components: {
},
data () {
    return {
    // loading状态
    isLoading: false,
    // 页面装修默认数据
    defaultData: {
        items: [{
            banner: {
                name: "图片轮播",
                type: "banner",
                data: [{
                    imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/banner/01.png",
                    link: null
                }, {
                    imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/banner/01.png",
                    link: null
                }],
                style: {
                    btnColor: "#ffffff",
                    btnShape: "round",
                    interval: 2.5
                }
            }
        }, {
            notice: {
                name: "店铺公告",
                type: "notice",
                params: {
                    link: null,
                    scrollable: true,
                    showIcon: true,
                    text: "这里是第一条自定义公告标题"
                },
                style: {
                    background: "#fffbe8",
                    paddingTop: 0,
                    textColor: "#de8c17"
                }
            }
        }, {
            video: {
                name: "视频组",
                type: "video",
                params: {
                    autoplay: 0,
                    poster: "https://pro2.yiovo.com/assets/store/img/diy/video_poster.png",
                    videoUrl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400.mp4"
                },
                style: {
                    height: 190,
                    paddingTop: 0
                }
            }
        }, {
            navBar: {
                name: "导航组",
                type: "navBar",
                data: [{
                    imgName: "icon-1.png",
                    imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/navbar/01.png",
                    link: null,
                    text: "按钮文字1"
                }, {
                    imgName: "icon-2.png",
                    imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/navbar/01.png",
                    link: null,
                    text: "按钮文字2"
                }, {
                    imgName: "icon-3.png",
                    imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/navbar/01.png",
                    link: null,
                    text: "按钮文字3"
                }, {
                    imgName: "icon-4.png",
                    imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/navbar/01.png",
                    link: null,
                    text: "按钮文字4"
                }],
                style: {
                    background: "#ffffff",
                    paddingTop: 0,
                    rowsNum: 4,
                    textColor: "#666666"
                }
            }
        }],
        page: {}
    },
    // 当前页面数据
    data: { page: {}, items: [] },
    // 当前选中的元素索引
    selectedIndex: 'page',
    // 当前选中的元素
    curItem: {}
    }
},
// 初始化数据
created () {
    // 获取初始化数据
//   this.initData()
},
methods: {

    // 获取初始化数据
//   initData () {
//     this.isLoading = true
//     Promise.all([
//       // 获取默认数据
//       this.getDefaultData()
//     ]).then(() => {
//       // 生成默认的data
//       this.createNewData()
//       this.isLoading = false
//     })
//   },

    // 生成默认的data
    createNewData () {
        const { defaultData, data } = this
        data.page = defaultData.page
        data.items = []
    },

    // 获取默认数据
//   getDefaultData () {
//     return new Promise((resolve, reject) => {
//       Api.defaultData()
//         .then(result => {
//           this.defaultData = result.data
//           resolve()
//         })
//     })
//   },

    /**
     * 新增Diy组件
     * @param type
     */
     onAddItem (type) {
        // 验证新增Diy组件
        if (!this.onCheckAddItem(type)) {
            return false
        }
        const { defaultData, data } = this
        // 复制默认diy组件数据
        const newItem = _.cloneDeep(defaultData.items[type])
        // 新增到diy列表数据
        data.items.push(newItem)
        // 编辑当前选中的元素
        this.onEditer(data.items.length - 1)
    },

    /**
     * 验证新增Diy组件
     * @param type
     */
    onCheckAddItem () {
        // 验证xx组件只能存在一个
        return true
    },

    /**
     * 编辑当前选中的Diy元素
     * @param index
     */
    onEditer (index) {
        const { data } = this
        // 记录当前选中元素的索引
        this.selectedIndex = index
        // 当前选中的元素数据
        this.curItem = index === 'page' ? data.page
            : data.items[index]
    },

    /**
     * 删除diy元素
     * @param index
     */
    onDeleleItem (index) {
        const { data: { items } } = this
        items.splice(index, 1)
        this.selectedIndex = -1
    },

    /**
     * 编辑器：重置颜色
     * @param holder
     * @param attribute
     * @param color
     */
    onEditorResetColor (holder, attribute, color) {
        holder[attribute] = color
    },

    // 提交到后端api
    onFormSubmit () {
        this.isLoading = true
    }

}
}
</script>
<!-- <style lang="less" scoped>
@import './style.less';
</style> -->
<style scoped>
@import './style.less';
</style>

  