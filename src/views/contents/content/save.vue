<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="form" label-width="100px">
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
					<sc-select v-model="form.channel_id" :apiObj="$API.content.channel.list" clearable filterable style="width: 100%;"></sc-select>
				</el-form-item>
				<el-form-item label="排序" prop="sequence">
					<el-input-number v-model="form.sequence" controls-position="right" :min="1" style="width: 30%;"></el-input-number>
				</el-form-item>
				<el-form-item v-if="form.type === 20" label="多图片" prop="images">
					<sc-upload-multiple v-model="form.urls" draggable :limit="3" tip="最多上传3个文件,单个文件不要超过10M,请上传图像格式文件"></sc-upload-multiple>
				</el-form-item>
				<el-form-item v-else-if="form.type === 30" label="视频" prop="vedio">
					<el-radio-group v-model="radio1" size="default">
						<el-radio-button label="上传" />
						<el-radio-button label="填写地址" />
					</el-radio-group>
					<sc-upload-file v-if="radio1 === '上传'" v-model="form.urls" :limit="1" :data="{otherData:'demo'}" tip="最多上传1个视频,单个视频不要超过10M" style="padding: 20px 0">
							<el-button type="primary" icon="el-icon-upload">上传视频</el-button>
					</sc-upload-file>
					<el-input v-else v-model="form.urls" placeholder="视频链接" clearable style="padding: 20px 0"></el-input>
				</el-form-item>
				<el-form-item v-else-if="form.type === 40" label="下载" prop="download">
					<el-radio-group v-model="radio2" size="default">
						<el-radio-button label="上传" />
						<el-radio-button label="填写地址" />
					</el-radio-group>
					<sc-upload-file v-if="radio2 === '上传'" v-model="form.urls" :limit="1" :data="{otherData:'demo'}" tip="最多上传1个文件,单个文件不要超过10M" style="padding: 20px 0">
							<el-button type="primary" icon="el-icon-upload">上传文件</el-button>
					</sc-upload-file>
					<el-input v-else v-model="form.urls" placeholder="文件链接" clearable style="padding: 20px 0"></el-input>
				</el-form-item>
				<el-form-item v-else label="内容" prop="html">
					<sc-editor v-model="form.content" placeholder="请输入" :height="250"></sc-editor>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit()">保存</el-button>
				</el-form-item>
			</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button v-if="mode!='show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		emits: ['success', 'closed'],
		data() {
			return {
				mode: "add",
				titleMap: {
					add: '新增用户',
					edit: '编辑用户',
					show: '查看'
				},
				visible: false,
				isSaveing: false,
				//表单数据
				form: {
					id:"",
					title: "",
					intro: "",
					thumbnail: "",
					type: "",
					content: "",
					avatar: "",
					name: "",
					dept: "",
					group: []
				},
				//验证规则
				rules: {
					avatar:[
						{required: true, message: '请上传头像'}
					],
					userName: [
						{required: true, message: '请输入登录账号'}
					],
					name: [
						{required: true, message: '请输入真实姓名'}
					],
					password: [
						{required: true, message: '请输入登录密码'},
						{validator: (rule, value, callback) => {
							if (this.form.password2 !== '') {
								this.$refs.dialogForm.validateField('password2');
							}
							callback();
						}}
					],
					password2: [
						{required: true, message: '请再次输入密码'},
						{validator: (rule, value, callback) => {
							if (value !== this.form.password) {
								callback(new Error('两次输入密码不一致!'));
							}else{
								callback();
							}
						}}
					],
					dept: [
						{required: true, message: '请选择所属部门'}
					],
					group: [
						{required: true, message: '请选择所属角色', trigger: 'change'}
					]
				},
				//所需数据选项
				groups: [],
				groupsProps: {
					value: "id",
					multiple: true,
					checkStrictly: true
				},
				depts: [],
				deptsProps: {
					value: "id",
					checkStrictly: true
				}
			}
		},
		mounted() {
			this.getGroup()
			this.getDept()
		},
		methods: {
			//显示
			open(mode='add'){
				this.mode = mode;
				this.visible = true;
				return this
			},
			//加载树数据
			async getGroup(){
				var res = await this.$API.system.role.list.get();
				this.groups = res.data.rows;
			},
			async getDept(){
				var res = await this.$API.system.dept.list.get();
				this.depts = res.data;
			},
			//表单提交方法
			submit(){
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.isSaveing = true;
						var res = await this.$API.demo.post.post(this.form);
						this.isSaveing = false;
						if(res.code == 200){
							this.$emit('success', this.form, this.mode)
							this.visible = false;
							this.$message.success("操作成功")
						}else{
							this.$alert(res.message, "提示", {type: 'error'})
						}
					}else{
						return false;
					}
				})
			},
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.userName = data.userName
				this.form.avatar = data.avatar
				this.form.name = data.name
				this.form.group = data.group
				this.form.dept = data.dept

				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
