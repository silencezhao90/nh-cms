<template>
    <div class="editor">
        <!-- 标题 -->
        <div class="editor-title">
            <span>{{ selectedIndex === 'page' ? data.page.name : curItem.name }}</span>
        </div>

        <!-- 编辑器: 标题栏 -->
        <div v-if="selectedIndex === 'page'" class="editor-content">
            <el-tabs v-model="activeName">
                <el-tab-pane name="1" label="页面设置">
                    <div class="block-box">
                        <div class="block-title">基本信息</div>
                        <div class="block-item">
                            <span class="label">页面名称</span>
                            <div class="flex-box">
                                <el-input v-model="localData.page.params.name" />
                                <div class="tips">页面名称仅用于后台管理</div>
                            </div>
                        </div>
                        <div class="block-item">
                            <span class="label">分享标题</span>
                            <div class="flex-box">
                                <el-input v-model="localData.page.params.shareTitle" />
                                <div class="tips">用户端转发时显示的标题</div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="2" label="标题栏设置">
                    <div class="block-box">
                        <div class="block-title">标题栏设置</div>
                        <div class="block-item">
                            <span class="label">标题名称</span>
                            <div class="flex-box">
                                <el-input v-model="localData.page.params.title" />
                                <div class="tips">用户端端顶部显示的标题</div>
                            </div>
                        </div>
                            <div class="block-item">
                            <span class="label">文字颜色</span>
                            <el-radio-group buttonStyle="solid" v-model="localData.page.style.titleTextColor">
                                <el-radio-button label="white">白色</el-radio-button>
                                <el-radio-button label="black">黑色</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="block-item">
                            <span class="label">标题栏背景</span>
                            <div class="item-colorPicker">
                                <span
                                class="rest-color"
                                @click="onEditorResetColor(localData.page.style, 'titleBackgroundColor', '#fff')"
                                >重置</span>
                                <el-color-picker v-model="localData.page.style.titleBackgroundColor" show-alpha :predefine="predefineColors" />
                                <!-- <colorPicker v-model="localData.page.style.titleBackgroundColor" defaultColor="#fff" /> -->
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 轮播图 -->
        <div v-if="localCurItem.type == 'banner'" class="editor-content">
            <el-tabs v-model="activeName">
                <el-tab-pane name="1" label="内容设置">
                    <div class="sub-title">添加图片 (最多10张，可拖动排序）</div>
                    <draggable
                        :list="localCurItem.data"
                        item-key="name"
                        ghost-class="ghost"
                        @start="dragging = true"
                        @end="dragging = false"
                        v-bind="{ animation: 120, filter: 'input', preventOnFilter: false }"
                    >
                        <template #item="{ element, index }">
                            <div class="block-box drag">
                                <div class="block-title">
                                    <span class="left">图片 {{ index + 1 }}</span>
                                    <a class="link" @click="handleDeleleData(localCurItem, index)">删除</a>
                                </div>
                                <div class="block-item">
                                    <div class="block-item-common">
                                        <div class="block-item-common-row">
                                            <span class="label">图片</span>
                                            <span class="label value">{{ element.imgName }}</span>
                                        </div>
                                        <div class="block-item-common-row">
                                            <span class="label">链接</span>
                                            <SLink v-model="element.link" />
                                        </div>
                                    </div>
                                    <div class="block-item-custom">
                                        <SImage
                                            v-model="element.imgUrl"
                                            tips="建议尺寸：750×400"
                                            @update="element.imgName = $event.file_name"
                                        />
                                    </div>
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <div v-if="localCurItem.data.length < 10" class="data-add">
                        <el-button icon="el-icon-plus" @click="handleAddData(10)">添加图片</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="2" label="样式设置">
                    <div class="block-box">
                        <div class="block-title">内容样式</div>
                        <div class="block-item">
                            <span class="label">指示点形状</span>
                            <el-radio-group v-model="localCurItem.style.btnShape">
                                <el-radio-button label="round">圆形</el-radio-button>
                                <el-radio-button label="square">正方形</el-radio-button>
                                <el-radio-button label="rectangle">长方形</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="block-item">
                            <span class="label">指示点颜色</span>
                            <div class="item-colorPicker">
                                <span
                                    class="rest-color"
                                    @click="onEditorResetColor(localCurItem.style, 'btnColor', '#fff')"
                                >重置</span>
                                <el-color-picker v-model="localCurItem.style.btnColor" show-alpha :predefine="predefineColors" />
                                <!-- <colorPicker v-model="curItem.style.btnColor" defaultColor="#fff" /> -->
                            </div>
                        </div>
                        <div class="block-item">
                            <span class="label">切换时间</span>
                            <div class="item-slider" style="width: 200px;">
                                <el-slider v-model="localCurItem.style.interval" :min="1" :max="20" size="small" />
                                <span class="unit-text">
                                    <span>{{ localCurItem.style.interval }}</span>
                                    <span>秒</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 店铺公告 -->
        <div v-if="localCurItem.type == 'notice'" class="editor-content">
            <el-tabs v-model="activeName">
                <el-tab-pane name="1" label="内容设置">
                    <div class="block-box">
                        <div class="block-title">公告文案</div>
                        <div class="block-item">
                            <span class="label">内容</span>
                            <el-input v-model="localCurItem.params.text" />
                        </div>
                        <div class="block-item">
                            <span class="label">链接</span>
                            <div class="flex-box">
                                <SLink v-model="localCurItem.params.link" />
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="2" label="样式设置">
                    <div class="block-box">
                        <div class="block-title">内容样式</div>
                        <div class="block-item">
                            <span class="label">文字颜色</span>
                            <div class="item-colorPicker">
                                <span
                                    class="rest-color"
                                    @click="onEditorResetColor(localCurItem.style, 'textColor', '#000')"
                                >重置</span>
                                <el-color-picker v-model="localCurItem.style.textColor" show-alpha :predefine="predefineColors" />
                            </div>
                        </div>
                        <div class="block-item">
                            <span class="label">背景颜色</span>
                            <div class="item-colorPicker">
                                <span
                                    class="rest-color"
                                    @click="onEditorResetColor(localCurItem.style, 'background', '#fff')"
                                >重置</span>
                                <el-color-picker v-model="localCurItem.style.background" show-alpha :predefine="predefineColors" />
                            </div>
                        </div>
                    </div>
                    <div class="block-box">
                        <div class="block-title">组件样式</div>
                        <div class="block-item">
                            <span class="label">上下边距</span>
                            <div class="item-slider">
                                <el-slider v-model="localCurItem.style.paddingTop" :min="1" :max="50" size="small" />
                                <span class="unit-text">
                                    <span>{{ localCurItem.style.paddingTop }}</span>
                                    <span>像素</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 导航 -->
        <div v-if="localCurItem.type == 'navBar'" class="editor-content">
            <el-tabs v-model="activeName">
                <el-tab-pane name="1" label="内容设置">
                    <div class="sub-title">添加导航 (最少4个，最多10个，可拖动排序)</div>
                    <draggable
                        :list="localCurItem.data"
                        item-key="name"
                        ghost-class="ghost"
                        @start="dragging = true"
                        @end="dragging = false"
                        v-bind="{ animation: 120, filter: 'input', preventOnFilter: false }"
                    >
                        <template #item="{ element, index }">
                            <div class="block-box drag">
                                <div class="block-title">
                                    <span class="left">导航 {{ index + 1 }}</span>
                                    <a class="link" @click="handleDeleleData(localCurItem, index)">删除</a>
                                </div>
                                <div class="block-item">
                                    <div class="block-item-common">
                                        <div class="block-item-common-row">
                                            <span class="label">名称</span>
                                            <el-input v-model="element.text" />
                                        </div>
                                        <div class="block-item-common-row">
                                            <span class="label">链接</span>
                                            <SLink v-model="element.link" />
                                        </div>
                                    </div>
                                    <div class="block-item-custom">
                                        <SImage v-model="element.imgUrl" tips="建议尺寸：100×100" />
                                    </div>
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <div v-if="localCurItem.data.length < 10" class="data-add">
                        <el-button icon="el-icon-plus" @click="handleAddData(10)">添加导航</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="2" label="样式设置">
                    <div class="block-box">
                        <div class="block-title">内容样式</div>
                        <div class="block-item">
                            <span class="label">每行数量</span>
                            <el-radio-group v-model="localCurItem.style.rowsNum">
                                <el-radio-button :label="3">3个</el-radio-button>
                                <el-radio-button :label="4">4个</el-radio-button>
                                <el-radio-button :label="5">5个</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="block-item">
                            <span class="label">文字颜色</span>
                            <div class="item-colorPicker">
                                <span
                                    class="rest-color"
                                    @click="onEditorResetColor(localCurItem.style, 'textColor', '#000')"
                                >重置</span>
                                <el-color-picker v-model="localCurItem.style.textColor" show-alpha :predefine="predefineColors" />
                            </div>
                        </div>
                    </div>
                    <div class="block-box">
                        <div class="block-title">组件样式</div>
                        <div class="block-item">
                            <span class="label">上下边距</span>
                            <div class="item-slider">
                                <el-slider v-model="localCurItem.style.paddingTop" :min="0" :max="100" size="small" />
                                <span class="unit-text">
                                    <span>{{ localCurItem.style.paddingTop }}</span>
                                    <span>像素</span>
                                </span>
                            </div>
                        </div>
                        <div class="block-item">
                            <span class="label">背景颜色</span>
                            <div class="item-colorPicker">
                                <span
                                    class="rest-color"
                                    @click="onEditorResetColor(localCurItem.style, 'background', '#fff')"
                                >重置</span>
                                <el-color-picker v-model="localCurItem.style.background" show-alpha :predefine="predefineColors" />
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 视频 -->
        <div v-if="localCurItem.type == 'video'" class="editor-content">
            <el-tabs v-model="activeName">
                <el-tab-pane name="1" label="内容设置">
                    <div class="block-box">
                        <div class="block-title">功能设置</div>
                        <div class="block-item">
                            <span class="label">视频地址</span>
                            <div class="flex-box">
                                <el-input v-model="localCurItem.params.videoUrl" />
                                <div class="tips">仅支持.mp4格式的视频源地址</div>
                            </div>
                        </div>
                        <div class="block-item">
                            <span class="label">视频封面</span>
                            <div class="flex-box">
                                <SImage v-model="localCurItem.params.poster" :width="160" :height="90" />
                                <div class="tips">建议封面图片尺寸与视频比例一致</div>
                            </div>
                        </div>
                    </div>
                    <div class="block-box">
                        <div class="block-title">播放设置</div>
                        <div class="block-item">
                            <span class="label">自动播放</span>
                            <span class="tips-wrap">仅支持小程序</span>
                            <el-radio-group v-model="localCurItem.params.autoplay">
                                <el-radio-button :label="1">开启</el-radio-button>
                                <el-radio-button :label="0">关闭</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="2" label="样式设置">
                    <div class="block-box">
                        <div class="block-title">
                            <span>内容样式</span>
                            <span class="tips">视频宽度为750像素</span>
                        </div>
                        <div class="block-item">
                            <span class="label">视频高度</span>
                            <div class="item-slider">
                                <el-slider v-model="localCurItem.style.height" :min="50" :max="400" />
                                <span class="unit-text">
                                    <span>{{ localCurItem.style.height }}</span>
                                    <span>像素</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="block-box">
                        <div class="block-title">组件样式</div>
                        <div class="block-item">
                            <span class="label">上下边距</span>
                            <div class="item-slider">
                                <el-slider v-model="localCurItem.style.paddingTop" :min="0" :max="50" />
                                <span class="unit-text">
                                    <span>{{ localCurItem.style.paddingTop }}</span>
                                    <span>像素</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 搜索栏 -->
        <div v-if="localCurItem.type == 'search'" class="editor-content">
            <el-tabs v-model="activeName">
                <el-tab-pane name="1" label="内容设置">
                    <div class="block-box">
                        <div class="block-title">功能设置</div>
                        <div class="block-item">
                            <span class="label">提示文字</span>
                            <el-input v-model="localCurItem.params.placeholder" />
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="2" label="样式设置">
                    <div class="block-box">
                        <div class="block-title">内容样式</div>
                        <div class="block-item">
                            <span class="label">搜索框样式</span>
                            <el-radio-group v-model="localCurItem.style.searchStyle">
                                <el-radio-button label="square">方形</el-radio-button>
                                <el-radio-button label="radius">圆角</el-radio-button>
                                <el-radio-button label="round">圆弧</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="block-item">
                            <span class="label">文字对齐</span>
                            <el-radio-group buttonStyle="solid" v-model="localCurItem.style.textAlign">
                                <el-radio-button label="left">居左</el-radio-button>
                                <el-radio-button label="center">居中</el-radio-button>
                                <el-radio-button label="right">居右</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 辅助空白 -->
        <div v-if="localCurItem.type == 'blank'" class="editor-content">
            <div class="block-box">
                <div class="block-title">样式设置</div>
                <div class="block-item">
                    <span class="label">组件高度</span>
                    <div class="item-slider">
                        <el-slider v-model="localCurItem.style.height" :min="5" :max="200" />
                        <span class="unit-text">
                            <span>{{ localCurItem.style.height }}</span>
                            <span>像素</span>
                        </span>
                    </div>
                </div>
                <div class="block-item">
                    <span class="label">背景颜色</span>
                    <div class="item-colorPicker">
                        <span
                            class="rest-color"
                            @click="onEditorResetColor(localCurItem.style, 'background', '#fff')"
                        >重置</span>
                        <el-color-picker v-model="localCurItem.style.background" show-alpha :predefine="predefineColors" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 辅助线 -->
        <div v-if="localCurItem.type == 'guide'" class="editor-content">
            <div class="block-box">
                <div class="block-title">样式设置</div>
                <div class="block-item">
                    <span class="label">线条样式</span>
                    <el-radio-group buttonStyle="solid" v-model="localCurItem.style.lineStyle">
                        <el-radio-button label="solid">实线</el-radio-button>
                        <el-radio-button label="dashed">虚线</el-radio-button>
                        <el-radio-button label="dotted">点状</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="block-item">
                    <span class="label">线条颜色</span>
                    <div class="item-colorPicker">
                        <span
                            class="rest-color"
                            @click="onEditorResetColor(localCurItem.style, 'lineColor', '#000')"
                        >重置</span>
                        <el-color-picker v-model="localCurItem.style.lineColor" show-alpha :predefine="predefineColors" />
                    </div>
                </div>
                <div class="block-item">
                    <span class="label">线条高度</span>
                    <div class="item-slider">
                        <el-slider v-model="localCurItem.style.lineHeight" :min="1" :max="20" />
                        <span class="unit-text">
                            <span>{{ localCurItem.style.lineHeight }}</span>
                            <span>像素</span>
                        </span>
                    </div>
                </div>
                <div class="block-item">
                    <span class="label">上下边距</span>
                    <div class="item-slider">
                        <el-slider v-model="localCurItem.style.paddingTop" :min="0" :max="50" />
                        <span class="unit-text">
                            <span>{{ localCurItem.style.paddingTop }}</span>
                            <span>像素</span>
                        </span>
                    </div>
                </div>
                <div class="block-item">
                    <span class="label">背景颜色</span>
                    <div class="item-colorPicker">
                        <span
                            class="rest-color"
                            @click="onEditorResetColor(localCurItem.style, 'background', '#fff')"
                        >重置</span>
                        <el-color-picker v-model="localCurItem.style.background" show-alpha :predefine="predefineColors" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 图片 -->
        <div v-if="localCurItem.type == 'image'" class="editor-content">
            <el-tabs v-model="activeName">
                <el-tab-pane name="1" label="内容设置">
                    <div class="sub-title">添加图片 (最多10张，可拖动排序）</div>
                    <draggable
                        :list="localCurItem.data"
                        item-key="name"
                        ghost-class="ghost"
                        @start="dragging = true"
                        @end="dragging = false"
                        v-bind="{ animation: 120, filter: 'input', preventOnFilter: false }"
                    >
                        <template #item="{ element, index }">
                            <div class="block-box drag">
                                <div class="block-title">
                                    <span class="left">图片 {{ index + 1 }}</span>
                                    <a class="link" @click="handleDeleleData(localCurItem, index)">删除</a>
                                </div>
                                <div class="block-item">
                                    <div class="block-item-common">
                                        <div class="block-item-common-row">
                                            <span class="label">图片</span>
                                            <span class="label value">{{ element.imgName }}</span>
                                        </div>
                                        <div class="block-item-common-row">
                                            <span class="label">链接</span>
                                            <SLink v-model="element.link" />
                                        </div>
                                    </div>
                                    <div class="block-item-custom">
                                        <SImage
                                            v-model="element.imgUrl"
                                            tips="建议尺寸：宽750"
                                            @update="element.imgName = $event.file_name"
                                        />
                                    </div>
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <div v-if="localCurItem.data.length < 10" class="data-add">
                        <el-button icon="el-icon-plus" @click="handleAddData(10)">添加图片</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="2" label="样式设置">
                    <div class="block-box">
                        <div class="block-title">组件样式</div>
                        <div class="block-item">
                            <span class="label">上下边距</span>
                            <div class="item-slider">
                                <el-slider v-model="localCurItem.style.paddingTop" :min="0" :max="50" />
                                <span class="unit-text">
                                    <span>{{ localCurItem.style.paddingTop }}</span>
                                    <span>像素</span>
                                </span>
                            </div>
                        </div>
                        <div class="block-item">
                            <span class="label">左右边距</span>
                                <div class="item-slider">
                                <el-slider v-model="localCurItem.style.paddingLeft" :min="0" :max="50" />
                                <span class="unit-text">
                                    <span>{{ localCurItem.style.paddingLeft }}</span>
                                    <span>像素</span>
                                </span>
                            </div>
                        </div>
                        <div class="block-item">
                            <span class="label">背景颜色</span>
                            <div class="item-colorPicker">
                                <span
                                    class="rest-color"
                                    @click="onEditorResetColor(localCurItem.style, 'background', '#fff')"
                                >重置</span>
                                <el-color-picker v-model="localCurItem.style.background" show-alpha :predefine="predefineColors" />
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 橱窗 -->
        <div v-if="localCurItem.type == 'window'" class="editor-content">
            <el-tabs v-model="activeName">
            <el-tab-pane name="1" label="内容设置">
                <div class="sub-title">添加图片 (最多10个，可拖动排序)</div>
                <draggable
                    :list="localCurItem.data"
                    item-key="name"
                    ghost-class="ghost"
                    @start="dragging = true"
                    @end="dragging = false"
                    v-bind="{ animation: 120, filter: 'input', preventOnFilter: false }"
                >
                    <template #item="{ element, index }">
                        <div class="block-box drag">
                            <div class="block-title">
                                <span class="left">图片 {{ index + 1 }}</span>
                                <a class="link" @click="handleDeleleData(localCurItem, index)">删除</a>
                            </div>
                            <div class="block-item">
                                <div class="block-item-common">
                                    <div class="block-item-common-row">
                                        <span class="label">名称</span>
                                        <span class="label value">{{ element.imgName }}</span>
                                    </div>
                                    <div class="block-item-common-row">
                                        <span class="label">链接</span>
                                        <SLink v-model="element.link" />
                                    </div>
                                </div>
                                <div class="block-item-custom">
                                    <SImage v-model="element.imgUrl" @update="element.imgName = $event.file_name" />
                                </div>
                            </div>
                        </div>
                    </template>
                </draggable>
                <div v-if="localCurItem.data.length < 10" class="data-add">
                    <el-button icon="plus" @click="handleAddData(10)">添加图片</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane name="2" label="样式设置">
                <div class="block-box">
                    <div class="block-title">内容样式</div>
                    <div class="block-item">
                        <span class="label">每行数量</span>
                        <el-radio-group buttonStyle="solid" v-model="localCurItem.style.layout">
                            <el-radio-button :label="2">2列</el-radio-button>
                            <el-radio-button :label="3">3列</el-radio-button>
                            <el-radio-button :label="4">4列</el-radio-button>
                            <el-radio-button :label="-1">橱窗</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="block-item">
                        <span class="label">上下边距</span>
                        <div class="item-slider" :style="{ width: '210px' }">
                            <el-slider v-model="localCurItem.style.paddingTop" :min="0" :max="50" />
                            <span class="unit-text">
                                <span>{{ localCurItem.style.paddingTop }}</span>
                                <span>像素</span>
                            </span>
                        </div>
                    </div>
                    <div class="block-item">
                        <span class="label">左右边距</span>
                        <div class="item-slider" :style="{ width: '210px' }">
                            <el-slider v-model="localCurItem.style.paddingLeft" :min="0" :max="50" />
                            <span class="unit-text">
                                <span>{{ localCurItem.style.paddingLeft }}</span>
                                <span>像素</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="block-box">
                    <div class="block-title">组件样式</div>
                    <div class="block-item">
                        <span class="label">背景颜色</span>
                        <div class="item-colorPicker">
                            <span
                                class="rest-color"
                                @click="onEditorResetColor(localCurItem.style, 'background', '#fff')"
                            >重置</span>
                            <el-color-picker v-model="localCurItem.style.background" show-alpha :predefine="predefineColors" />
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>
import _ from 'lodash'
import { ref } from 'vue'
import draggable from 'vuedraggable'

const activeName = ref('1')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

export default {
    props: {
        // 页面装修默认数据
        defaultData: { type: Object, default: () => {} },
        // 页面数据
        data: { type: Object, default: () => {} },
        // 当前选中的元素
        curItem: { type: Object, default: () => {} },
        // 当前选中的元素索引
        selectedIndex: { type: String, default: () => "" }
  },
  computed: {

  },
  watch:{
      curItem(val) {
        this.localCurItem = val
      }
  },
  components: {
    draggable
  },
  data () {
    return {
        activeName,
        predefineColors,    // 预定义颜色
        localData: this.data,
        localCurItem: this.curItem,
        dragging: false
    }
  },

  methods: {
    // 新增数据
    handleAddData (max = 1) {
        console.log(max)
        const { defaultData, curItem } = this
        const newDataItem = defaultData.items[curItem.type].data[0]
        curItem.data.push(_.cloneDeep(newDataItem))
    },

    /**
     * 编辑器：删除data元素
     * @param curItem
     * @param index
     */
    handleDeleleData (curItem, index) {
        if (curItem.data.length <= 1) {
            this.$message.warning('至少保留一个')
            return false
        }
        curItem.data.splice(index, 1)
    },

    /**
     * 重置颜色
     * @param holder
     * @param attribute
     * @param color
     */
    onEditorResetColor (holder, attribute, color) {
        holder[attribute] = color
    }
  }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>