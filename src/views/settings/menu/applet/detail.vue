<template>
	<!-- <sc-page-header :title="id?'编辑':'新增'" description="可用于非常复杂的表单提交，如一些较为简单的表单提交应使用dialog或者drawer更合适" icon="el-icon-burger"></sc-page-header> -->

	<el-main>
		<el-card shadow="never">
			<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="form" label-width="100px" style="align-items: start">
				<!-- <el-form-item label="id">
					<el-input v-model="id"></el-input>
				</el-form-item> -->
				<el-form-item label="标题" prop="title">
					<el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
				</el-form-item>
				<el-form-item label="简介" prop="intro">
					<el-input v-model="form.intro" type="textarea" placeholder="请输入简介" clearable></el-input>
				</el-form-item>
				<el-form-item label="缩略图" prop="thumbnail">
					<sc-upload v-model="form.thumbnail" title="上传缩略图"></sc-upload>
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="form.type" clearable placeholder="请选择" style="width: 100%;">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="栏目" prop="channel">
					<el-select v-model="form.channel_id" clearable placeholder="请选择" style="width: 100%;">
						<el-option
						v-for="item in channels"
						:key="item.id"
						:label="item.title"
						:value="item.id"
						/>
					</el-select>
					<!-- <sc-select v-model="form.channel_id" :apiObj="$API.content.channel.list" clearable filterable style="width: 100%;"></sc-select> -->
				</el-form-item>
				<el-form-item label="排序" prop="sequence">
					<el-input-number v-model="form.sequence" controls-position="right" :min="1" style="width: 30%;"></el-input-number>
				</el-form-item>
				<el-form-item v-show="form.type == 20" label="多图片" prop="images" style="height: 500px;align-items:start">
					<sc-upload-multiple v-model="form.urls" draggable :limit="3" tip="最多上传3个文件,单个文件不要超过10M,请上传图像格式文件"></sc-upload-multiple>
				</el-form-item>
				<el-form-item v-show="form.type == 30" label="视频" prop="vedio" style="height: 500px;align-items:start">
					<el-radio-group v-model="radio1" size="default">
						<el-radio-button label="上传" />
						<el-radio-button label="填写地址" />
					</el-radio-group>
					<sc-upload-file v-if="radio1 === '上传'" v-model="form.urls" :limit="1" :data="{otherData:'demo'}" tip="最多上传1个视频,单个视频不要超过10M" style="padding: 20px 0">
							<el-button type="primary" icon="el-icon-upload">上传视频</el-button>
					</sc-upload-file>
					<el-input v-else v-model="form.urls" placeholder="视频链接" clearable style="padding: 20px 0"></el-input>
				</el-form-item>
				<el-form-item v-show="form.type == 40" label="下载" prop="download" style="height: 500px;align-items:start">
					<el-radio-group v-model="radio2" size="default">
						<el-radio-button label="上传" />
						<el-radio-button label="填写地址" />
					</el-radio-group>
					<sc-upload-file v-if="radio2 === '上传'" v-model="form.urls" :limit="1" :data="{otherData:'demo'}" tip="最多上传1个文件,单个文件不要超过10M" style="padding: 20px 0">
							<el-button type="primary" icon="el-icon-upload">上传文件</el-button>
					</sc-upload-file>
					<el-input v-else v-model="form.urls" placeholder="文件链接" clearable style="padding: 20px 0"></el-input>
				</el-form-item>
				<!-- <el-form-item v-else label="内容" prop="html">
					<sc-editor v-model="form.content" placeholder="请输入" :height="200"></sc-editor>
				</el-form-item> -->
				<el-form-item v-show="form.type == 10 || form.type == 50" label="内容" prop="html" style="height: 500px; width: 390px;align-items:start">
					<div style="border: 1px solid #ccc">
						<Toolbar
							style="border-bottom: 1px solid #ccc;"
							:editor="editorRef"
							:defaultConfig="toolbarConfig"
							:mode="mode2"
						/>
						<Editor
							style="height: 400px; overflow-y: hidden;"
							v-model="form.content"
							:defaultConfig="editorConfig"
							:mode="mode2"
							@onCreated="handleCreated"
						/>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit()">保存</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-main>
</template>

<script>
	import '@wangeditor/editor/dist/css/style.css' // 引入 css
	import { ref, shallowRef } from 'vue'
	import { Editor, Toolbar  } from '@wangeditor/editor-for-vue'
	import config from "@/config/editor"

	import { defineAsyncComponent } from 'vue';
	const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));

	const editorRef = shallowRef()
	// 内容 HTML
	const valueHtml = ref('<p>hello</p>')
	const handleCreated = (editor) => {
	  console.log("handelCreated editor!!")
      editorRef.value = editor // 记录 editor 实例，重要！
    }

	export default {
		name: 'content-detail',
		components: {
			scEditor,
			Editor, Toolbar
		},
		
		data() {
			return {
				titleMap: {
					add: '新增',
					edit: '编辑',
					show: '查看'
				},
                id: this.$route.query.id,
                mode: this.$route.query.mode,
				input: "",
				form: {
					title: "",
					intro: "",
					thumbnail: "",
					channel_id: null,
					type: 10,
					content: "",
					urls: ""
				},
				options: [{
					label: "图文",
					value: 10
				}, {
					label: "图片",
					value: 20
				}, {
					label: "下载",
					value: 30
				}, {
					label: "视频",
					value: 40
				}, {
					label: "案例",
					value: 50
				}],
				radio1: "上传",
				radio2: "上传",
				templates: [
					{
						title: '自定义HTML模板',
						description: '',
						content: '<strong>演示模板</strong>'
					},
					{
						title: '列表',
						description: '',
						content: '<ol><li>演示列表1</li><li>演示列表2</li></ol>'
					}
				],
				//验证规则
				rules: {
					title:[
						{required: true, message: '请输入标题'}
					]
				},
				channels: [],
				editorRef,
				valueHtml,
				toolbarConfig: {},
				editorConfig: config.editorConfig,
				handleCreated,
				mode2: 'default', // 或 'simple'
			}
		},
		created() {

		},
		mounted() {
			//修改tab名称
            this.$store.commit("updateViewTagsTitle", this.titleMap[this.mode])
			// 获取详情数据
			if (this.mode !== "add") {
				this.getInfo()
			}
			this.getChannels()
			
		},
		methods: {
			uploadBtn() {
				console.log("点击上传图片")
			},
			async getInfo() {
				var res = await this.$API.content.content.info.get(this.id);
				if(res.code == 20000){
					this.setData(res.data)
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},

			async getChannels() {
				var res = await this.$API.content.channel.list.get()
				if (res.code == 20000) {
					this.channels = res.data.list
				} else {
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},

			async submit() {
				console.log("form == ", this.form)
				// var valid = await this.$refs.dialogForm.validate().catch(() => {})
				// if(!valid){
				// 	return false
				// }
				if(this.form.channel_id == null){
					this.form.channel_id = 0
				}
				if (this.mode == 'add') {
					this.isSaveing = true;
					var res = await this.$API.content.content.create.post(this.form);
					this.isSaveing = false;
					if(res.code == 20000){
						this.$emit('success', this.form, this.mode)
						this.visible = false;
						this.$message.success("操作成功")
						// 返回列表页面
						this.$router.replace({path: '/contents/content'})
					}else{
						this.$alert(res.message, "提示", {type: 'error'})
					}
				} else {
					this.isSaveing = true;
					var updRes = await this.$API.content.content.update.put(this.form.id, this.form);
					this.isSaveing = false;
					if(updRes.code == 20000){
						this.visible = false;
						this.$message.success("操作成功")
						this.$router.replace({path: '/contents/content'})
					}else{
						this.$alert(updRes.message, "提示", {type: 'error'})
					}
				}
			},

			setData(data){
				this.form.id = data.id
				this.form.title = data.title
				this.form.intro = data.intro
				this.form.type = data.type
				this.form.sequence = data.sequence
				this.form.thumbnail = data.thumbnail
				this.form.status = data.status
				this.form.content = data.content
				if (data.channel_id == 0) {
					this.form.channel_id = null
				} else {
					this.form.channel_id = data.channel_id
				}
				
				this.form.channel_name = data.channel_name
				this.form.urls = data.urls
			}

		}
	}
</script>

<style>
</style>
