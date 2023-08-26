<template>
    <div class="container">
        <!-- 工作区 -->
        <div class="work-content">
            <!-- 组件库 -->
            <Components @handleClickItem="onAddItem" />
            <!-- 手机容器 -->
            <Phone
                v-if="!isLoading"
                :data="data"
                :selectedIndex="selectedIndex" 
                @onEditer="onEditer"
                @onDeleleItem="onDeleleItem"
            />
            <!-- 编辑器 -->
            <Editor
                v-if="!isLoading"
                :defaultData="defaultData"
                :data="data"
                :selectedIndex="selectedIndex"
                :curItem="curItem"
            />
            
        </div>
        
        <!-- 操作栏 -->
        <div class="footer">
            <div class="footer-content">
                <el-button type="primary" :loading="isLoading" @click="onFormSubmit">保存</el-button>
                <!-- <a-button>另存为</a-button> -->
            </div>
        </div>
        
    </div>
  </template>
  
  <script>
  import _ from 'lodash'
  import { defineAsyncComponent } from 'vue';

  const Components = defineAsyncComponent(() => import('./components'));
  const Phone = defineAsyncComponent(() => import('./phone'));
  const Editor = defineAsyncComponent(() => import('./editor'));
  
  export default {
    components: {
      Components,
      Phone,
      Editor
    },
    data () {
      return {
        titleMap: {
            add: '新增页面',
            edit: '编辑页面',
            show: '查看'
        },
        // loading状态
        isLoading: false,
        // 页面装修默认数据
        defaultData: {
            items: {
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
                }, 
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
                },
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
                },
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
                },
                image: {
                    name: "图片",
                    type: "image",
                    data: [{
                        imgName: "image-1.jpg",
                        imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/banner/01.png",
                        link: null
                    }],
                    style: {
                        background: "#ffffff",
                        paddingLeft: 0,
                        paddingTop: 0
                    }
                },
                blank: {
                    name: "辅助空白",
                    type: "blank",
                    style: {
                        background: "#ffffff",
                        height: 20
                    }
                },
                ICPLicense: {
                    name: "备案号",
                    type: "ICPLicense",
                    style: {
                        background: "#ffffff",
                        fontSize: "13",
                        paddingLeft: 0,
                        paddingTop: 6,
                        textAlign: "center",
                        textColor: "#696969"
                    },
                    params: {
                        link: "https://beian.miit.gov.cn/",
                        text: "网站备案号：粤ICP备10000000号-1"
                    }
                },
                guide: {
                    name: "辅助线",
                    type: "guide",
                    style: {
                        background: "#ffffff",
                        lineColor: "#000000",
                        lineHeight: 1,
                        lineStyle: "solid",
                        paddingTop: 10
                    }
                },
                search: {
                    name: "搜索框",
                    type: "search",
                    style: {
                        searchStyle: "square",
                        textAlign: "left"
                    },
                    params: {
                        placeholder: "请输入关键字进行搜索"
                    }
                },
                window: {
                    name: "图片橱窗",
                    type: "window",
                    style: {
                        background: "#ffffff",
                        layout: 2,
                        paddingLeft: 0,
                        paddingTop: 0
                    },
                    dataNum: 4,
                    data: [{
                        imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/window/01.jpg",
                        link: null
                    }, {
                        imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/window/01.jpg",
                        link: null
                    }, {
                        imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/window/01.jpg",
                        link: null
                    }, {
                        imgUrl: "https://pro2.yiovo.com/assets/store/img/diy/window/01.jpg",
                        link: null
                    }]
                }
            },
            page: {
                params: {
                    name: "页面名称",
                    shareTitle: "分享标题",
                    title: "页面标题"
                },
                style: {
                    titleBackgroundColor: "#ffffff",
                    titleTextColor: "black"
                }
            }
        },
        // 当前页面数据
        data: { page: {}, items: [] },
        // 当前选中的元素索引
        selectedIndex: 'page',
        // 当前选中的元素
        curItem: {},
        pageId: this.$route.query.pageId,
        mode: this.$route.query.mode,
      }
    },
    // 初始化数据
    created () {
        // 获取初始化数据
        this.initData()
    },
    mounted() {
        //修改tab名称
        this.$store.commit("updateViewTagsTitle", this.titleMap[this.mode])
        // 获取详情数据
        if (this.mode !== "add") {
            // this.getPageInfo()
        }
        
    },
    methods: {
      // 获取初始化数据
      initData () {
          this.isLoading = true
          this.createNewData()
          this.isLoading = false
      },

      // 生成默认的data
      createNewData () {
          const { defaultData, data } = this
          data.page = defaultData.page
          data.items = []
      },
      
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
        console.log(1111)
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
        console.log(2222)
        const { data: { items } } = this
        items.splice(index, 1)
        this.selectedIndex = -1
      },
  
    }
  }
  </script>
  <style lang="less" scoped>
  @import './style.less';
  </style>

  