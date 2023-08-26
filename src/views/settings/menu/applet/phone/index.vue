<template>
    <div class="phone-content">
        <!-- 顶部导航栏 -->
        <div
            class="phone-top optional"
            :class="{ selected: 'page' === selectedIndex, [data.page.style.titleTextColor]: true }"
            :style="{ backgroundColor: data.page.style.titleBackgroundColor }"
            @click="handelClickItem('page')"
            >
            <p
                class="title"
                :style="{ color: data.page.style.titleTextColor }"
            >{{ data.page.params.title }}</p>
        </div>

        <!-- 内容区域 -->
        <div class="phone-main">
            <draggable
                :list="data.items"
                class="content"
                item-key="name"
                ghost-class="ghost"
                @start="dragging = true"
                @end="dragging = false"
                @update="handelDragItem"
                v-bind="{ animation: 120, filter: '.undrag' }"
            >
                <template #item="{ element, index }">
                    <div 
                        class="devise-item optional" 
                        :class="{ selected: index === selectedIndex, undrag: inArray(element.type, undragList) }"
                        @click="handelClickItem(index)"
                        :style="renderItemStyle(element)"
                    >
                        <!-- 搜索栏 -->
                        <div v-if="element.type == 'search'" class="diy-search">
                            <div class="inner" :class="element.style.searchStyle">
                                <div class="search-input" :style="{ textAlign: element.style.textAlign }">
                                    <el-icon class="search-icon"><el-icon-search /></el-icon>
                                    <span>{{ element.params.placeholder }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- 图片轮播 -->
                        <div v-else-if="element.type == 'banner'" class="diy-banner">
                            <img
                            v-for="(dataItem, dataIdx) in element.data"
                            :key="`${index}_${dataIdx}_img`"
                            v-show="dataIdx <= 1"
                            :src="dataItem.imgUrl"
                        />
                            <div class="dots" :class="element.style.btnShape">
                                <div
                                    v-for="(dataItem, dataIdx) in element.data"
                                    :key="`${index}_${dataIdx}_dots`"
                                    :style="{ background: element.style.btnColor }"
                                    class="dots-item"
                                ></div>
                            </div>
                        </div>

                        <!-- 店铺公告 -->
                        <div
                            v-else-if="element.type == 'notice'"
                            class="diy-notice"
                            :style="{ padding: `${element.style.paddingTop}px 0` }"
                        >
                            <div
                                class="notice-body"
                                :style="{ background: element.style.background, color: element.style.textColor }"
                            >
                                <div class="notice__icon">
                                    <el-icon class="notice-icon"><el-icon-chatDotRound /></el-icon>
                                </div>
                                <div class="notice__text flex-box oneline-hide">
                                    <span>{{ element.params.text }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- 导航组 -->
                        <div
                            v-else-if="element.type == 'navBar'"
                            class="diy-navBar"
                            :style="{ padding: `${element.style.paddingTop}px 0`, background: element.style.background, color: element.style.textColor }"
                        >
                            <ul class="data-list clearfix" :class="`avg-sm-${element.style.rowsNum}`">
                                <li
                                    class="item-nav"
                                    v-for="(dataItm, dataIdx) in element.data"
                                    :key="`${index}_${dataIdx}`"
                                >
                                    <div class="item-image">
                                        <img :src="dataItm.imgUrl" />
                                    </div>
                                    <p class="item-text oneline-hide">{{ dataItm.text }}</p>
                                </li>
                            </ul>
                        </div>

                         <!-- 视频组 -->
                        <div
                            v-else-if="element.type == 'video'"
                            class="diy-video"
                            :style="{ padding: `${element.style.paddingTop}px 0` }"
                        >
                            <video
                                :style="{ height: `${element.style.height}px` }"
                                :src="element.params.videoUrl"
                                :poster="element.params.poster"
                                controls
                            >您的浏览器不支持 video 标签</video>
                        </div>

                        <!-- 图片组 -->
                        <div
                            v-else-if="element.type == 'image'"
                            class="diy-image"
                            :style="{ paddingBottom: element.style.paddingTop + 'px', background: element.style.background}"
                        >
                            <div
                                class="item-image"
                                v-for="(dataItm, dataIdx) in element.data"
                                :key="`${index}_${dataIdx}`"
                                :style="{ padding: `${element.style.paddingTop}px ${element.style.paddingLeft}px 0` }"
                            >
                                <img :src="dataItm.imgUrl" />
                            </div>
                        </div>

                        <!-- 辅助空白 -->
                        <div
                            v-else-if="element.type == 'blank'"
                            class="diy-blank"
                            :style="{ height: `${element.style.height}px` , background: element.style.background }"
                        ></div>

                        <!-- 辅助线 -->
                        <div
                            v-else-if="element.type == 'guide'"
                            class="diy-guide"
                            :style="{ padding: `${element.style.paddingTop}px 0`, background: element.style.background }"
                        >
                            <p
                                class="line"
                                :style="{
                                    borderTopWidth: element.style.lineHeight + 'px',
                                    borderTopColor: element.style.lineColor,
                                    borderTopStyle: element.style.lineStyle
                                }"
                            ></p>
                        </div>

                        <!-- 图片橱窗 -->
                        <div
                            v-else-if="element.type == 'window'"
                            class="diy-window"
                            :style="{ background: element.style.background, padding: `${element.style.paddingTop}px ${element.style.paddingLeft}px` }"
                        >
                            <ul
                                v-if="element.style.layout > -1"
                                class="data-list clearfix"
                                :class="`avg-sm-${element.style.layout}`"
                            >
                                <li
                                    v-for="(window, dataIdx) in element.data"
                                    :key="`${index}_${dataIdx}`"
                                    class="data-item"
                                    :style="{ padding: `${element.style.paddingTop}px ${element.style.paddingLeft}px` }"
                                >
                                    <div class="item-image">
                                        <img :src="window.imgUrl" />
                                    </div>
                                </li>
                            </ul>
                            <div class="display" v-else>
                                <div
                                    class="display-left"
                                    :style="{ padding: `${element.style.paddingTop}px ${element.style.paddingLeft}px` }"
                                >
                                    <img :src="element.data[0].imgUrl" />
                                </div>
                                <div class="display-right">
                                    <div
                                        v-if="element.data.length >= 2"
                                        class="display-right1"
                                        :style="{ padding: `${element.style.paddingTop}px ${element.style.paddingLeft}px` }"
                                    >
                                        <img :src="element.data[1].imgUrl" />
                                    </div>
                                    <div class="display-right2">
                                        <div
                                            v-if="element.data.length >= 3"
                                            class="left"
                                            :style="{ padding: `${element.style.paddingTop}px ${element.style.paddingLeft}px` }"
                                        >
                                            <img :src="element.data[2].imgUrl" />
                                        </div>
                                        <div
                                            v-if="element.data.length >= 4"
                                            class="right"
                                            :style="{ padding: `${element.style.paddingTop}px ${element.style.paddingLeft}px` }"
                                        >
                                            <img :src="element.data[3].imgUrl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 删除操作 -->
                        <div class="btn-edit-del">
                            <div class="btn-del" @click.stop="handleDeleleItem(index)">删除</div>
                        </div>

                    </div>
                </template>

            </draggable>
        </div>

    </div>
</template>

<script>
import draggable from 'vuedraggable'

// 禁止拖拽的组件
const undragList = ['service']

export default {
    props: {
        // 页面数据
        data: { type: Object, default: () => {} },
        // 当前选中的元素索引
        selectedIndex: { type: Number, default: () => 0 }
    },
    components: {
        draggable
    },

    data() {
        return {
            undragList,
            dragging: false
        }
    },

    methods: {
        inArray(search, array) {
            // return array.includes(search)
            console.log(search, array)
            return false
        },

         /**
         * 拖动diy元素更新当前索引
         * @param e
         */
        handelDragItem (e) {
            this.$emit('onEditer', e.newIndex)
        },

        /**
         * 点击当前选中的Diy元素
         * @param index
         */
        handelClickItem (index) {
            console.log(3333)
            this.$emit('onEditer', index)
        },

        /**
         * 删除当前选中的Diy元素
         * @param index
         */
        handleDeleleItem (index) {
            this.$emit('onDeleleItem', index)
        },

        // 渲染组件外层容器的样式
        renderItemStyle (item) {
            if (item.type === 'service') {
                return {
                    position: 'absolute',
                    right: item.style.right + '%',
                    bottom: item.style.bottom + '%'
                }
            }
            return {}
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>