<template>
	<el-main>
		<el-card shadow="never">
			<el-tabs tab-position="top">

				<el-tab-pane label="系统设置">
					<el-form ref="form" :model="sys" label-width="100px" style="margin-top: 20px;">
						<el-form-item label="网站名称">
							<el-input v-model="sys.name"></el-input>
						</el-form-item>
						<el-form-item label="LogoUrl">
							<sc-upload v-model="sys.logo" title="logo"></sc-upload>
						</el-form-item>
						<el-form-item label="网站版权">
							<el-input type="textarea" :autosize="{minRows: 4}" v-model="sys.copyright"></el-input>
						</el-form-item>
                        <el-form-item label="客服电话">
							<el-input v-model="sys.mobile"></el-input>
						</el-form-item>
                        <el-form-item label="地址">
							<el-input v-model="sys.address"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submit()">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="SEO">
					<el-form ref="form" :model="msg" label-width="100px" style="margin-top: 20px;">
                        <el-form-item label="网站关键词">
                            <el-input v-model="sys.keywords"></el-input>
                        </el-form-item>
                        <el-form-item label="网站介绍">
                            <el-input type="textarea" :autosize="{minRows: 4}" v-model="sys.desc"></el-input>
                        </el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submit()">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="网站备案信息">
                    <el-form ref="form" :model="msg" label-width="100px" style="margin-top: 20px;">
                        <!-- <el-form-item>
                            <sc-editor v-model="sys.beian" placeholder="请输入"></sc-editor>
                        </el-form-item> -->
						<el-form-item>
							<div style="border: 1px solid #ccc">
								<Toolbar
									style="border-bottom: 1px solid #ccc"
									:editor="editorRef"
									:defaultConfig="toolbarConfig"
									:mode="mode2"
								/>
								<Editor
									style="height: 400px; overflow-y: hidden;"
									v-model="sys.beian"
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
				</el-tab-pane>

			</el-tabs>
		</el-card>
	</el-main>
</template>

<script>
	import '@wangeditor/editor/dist/css/style.css' // 引入 css
	import { ref, shallowRef } from 'vue'
	import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
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
		name: 'system',
        components: {
			scEditor,
			Editor, Toolbar
		},
		data() {
			return {
				sys: {
					name: "",
					logo: "",
                    mobile: "",
                    address: "",
					copyright: "@nahuo",
                    beian: "",
					keywords: "",
                    desc: "",
				},
				editorRef,
				valueHtml,
				toolbarConfig: {},
				editorConfig: config.editorConfig,
				handleCreated,
				mode2: 'default', // 或 'simple'
			}
		},
		mounted() {
			this.getInfo()
		},
		methods: {
			table_add(){
				var newRow = {
					key: "",
					value: "",
					title: "",
					isSet: true
				}
				this.setting.push(newRow)
			},
			table_edit(row){
				if(row.isSet){
					row.isSet = false
				}else{
					row.isSet = true
				}
			},
			table_del(row, index){
				this.setting.splice(index, 1)
			},
			async getInfo() {
				var res = await this.$API.setting.system.info.get()
				if(res.code == 20000){
					this.sys = res.data
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			async submit() {
				// var valid = await this.$refs.dialogForm.validate().catch(() => {})
				// if(!valid){
				// 	return false
				// }
				var res = await this.$API.setting.system.create.post(this.sys);
				if(res.code == 20000){
					this.$message.success("操作成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			}
		}
	}
</script>

<style>
</style>
