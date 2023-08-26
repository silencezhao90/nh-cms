<template>
    <div class="components">
        <el-collapse v-model="componentKeys">
            <el-collapse-item v-for="group in components" :name="group.key" :key="group.key" :title="group.name">
                <div class="module-list">
                    <div
                        v-for="(item, index) in group.data"
                        :key="index"
                        class="module-item"
                        @click="handleClickItem(item.type)"
                    >
                        <el-icon class="module-icon">
                          <component :is="item.icon"></component>
                        </el-icon>
                        <!-- <a-icon class="module-icon" :component="item.icon" /> -->
                        <span class="module-title">{{ item.name }}</span>
                    </div>
                </div>
            </el-collapse-item >
        </el-collapse>
    </div>
</template>
  
  <script>
  
  const components = [
    {
      name: '媒体组件',
      key: 'media',
      data: [
        {
          name: '轮播图',
          type: 'banner',
          icon: "el-icon-picture"
        },
        {
          name: '图片',
          type: 'image',
          icon: "el-icon-picture"
        },
        {
          name: '图片橱窗',
          type: 'window',
          icon: "el-icon-menu"
        },
        {
          name: '视频',
          type: 'video',
          icon: "el-icon-videoPlay"
        },
        // {
        //   name: '文章',
        //   type: 'article',
        //   icon: "Search"
        // }
      ]
    },
    {
      name: '商城组件',
      key: 'store',
      data: [
        {
          name: '搜索框',
          type: 'search',
          icon: "el-icon-search"
        },
        {
          name: '店铺公告',
          type: 'notice',
          icon: "el-icon-chatDotRound"
        },
        {
          name: '导航',
          type: 'navBar',
          icon: "el-icon-menu"
        },
        // {
        //   name: '商品',
        //   type: 'goods',
        //   icon: "Search"
        // },
        // {
        //   name: '在线客服',
        //   type: 'service',
        //   icon: "Search"
        // }
      ]
    },
    {
      name: '其他组件',
      key: 'other',
      data: [
        // {
        //   name: '富文本',
        //   type: 'richText',
        //   icon: "Search"
        // },
        {
          name: '辅助空白',
          type: 'blank',
          icon: "el-icon-fullScreen"
        },
        {
          name: '辅助线',
          type: 'guide',
          icon: "el-icon-operation"
        }
      ]
    }
  ]
  
  export default {
    components: {
    },
    data () {
      return { components }
    },
    computed: {
      componentKeys () {
        const { components } = this
        return components.map(item => item.key)
      }
    },
    methods: {
      handleClickItem (type) {
        console.log("click type == ", type)
        this.$emit('handleClickItem', type)
      }
    }
  }
  </script>
  <style lang="less" scoped>
  // 组件库
  .components {
    min-width: 310px;
    width: 310px;
    border-radius: 3px;
    box-shadow: 0 0 28px 0 #ccc;
    border: 1px solid #ddd;
    background: #f8f9fa;
    margin: 15px 50px;

    :deep(.el-collapse-item__header) {
        padding: 14px 16px;
        font-size: 13px;
        font-weight: 700;
        color: #595961;
    }

    :deep(.el-collapse-content) {
        padding-top: 0 !important;
    }

    :deep(.el-collapse > .el-collapse-item) {
        border-bottom: none;
    }

    .module-list {
        display: flex;
        flex-wrap: wrap;
    }

    .module-item {
        width: 90px;
        height: 90px;
        padding: 15px 0;
        text-align: center;
        font-size: 12px;
        color: #595961;
        line-height: 20px;
        position: relative;
        user-select: none;

        &:hover {
            background: #fff;
            border-radius: 4px;
        }
        .module-icon {
            display: block;
            width: 74px;
            height: 45px;
            line-height: 45px;
            margin: 0 auto;
            font-size: 26px;
            color: #9797a1;
        }
    }
  }
  </style>
  