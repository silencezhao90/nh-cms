<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px">
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="form.nickname" placeholder="请输入标题" clearable></el-input>
			</el-form-item>
			<el-form-item label="分类" prop="cate_id">
				<el-select v-model="form.cate_id" clearable placeholder="请选择" style="width: 100%;">
					<el-option
					v-for="item in cateList"
					:key="item.id"
					:label="item.title"
					:value="item.id"
					/>
				</el-select>
				<!-- <sc-select v-model="form.cate_id" :apiObj="$API.notice.cate.list" clearable filterable style="width: 100%;"></sc-select> -->
			</el-form-item>
			<el-form-item label="公告内容" prop="content">
				<el-input v-model="form.content" type="textarea" placeholder="请输入公告内容" clearable></el-input>
			</el-form-item>
			<el-form-item label="是否弹窗" prop="popup">
				<el-switch v-model="form.popup"></el-switch>
			</el-form-item>
			<el-form-item label="显示状态" prop="status">
				<el-switch v-model="form.status"></el-switch>
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
					add: '新增',
					edit: '编辑',
					show: '查看'
				},
				visible: false,
				isSaveing: false,
				//表单数据
				form: {
					title: "",
					cate_id: null,
					content: "",
					status: true,
					popup: true,
				},
				//验证规则
				rules: {
					title: [
						{required: true, message: '请输入标题'}
					]
				},
				//所需数据选项
				groups: [],
				groupsProps: {
					value: "id",
					emitPath: false,
					checkStrictly: true
				},
				cateList: []
			}
		},
		mounted() {
			this.selectCateList()
		},
		methods: {
			//显示
			open(mode='add'){
				this.mode = mode;
				this.visible = true;
				return this
			},
			//表单提交方法
			async submit(){
				var valid = await this.$refs.dialogForm.validate().catch(() => {})
				if(!valid){
					return false
				}
				if (this.mode == 'add') {
					this.isSaveing = true;
					var res = await this.$API.notice.notice.create.post(this.form);
					this.isSaveing = false;
					if(res.code == 20000){
						if(this.mode=='add'){
							this.form.id = res.data
						}
						this.$emit('success', this.form, this.mode)
						this.visible = false;
						this.$message.success("操作成功")
					}else{
						this.$alert(res.message, "提示", {type: 'error'})
					}
				} else {
					this.isSaveing = true;
					var updRes = await this.$API.notice.notice.update.put(this.form.id, this.form);
					this.isSaveing = false;
					if(updRes.code == 20000){
						this.$emit('success', this.form, this.mode)
						this.visible = false;
						this.$message.success("操作成功")
					}else{
						this.$alert(updRes.message, "提示", {type: 'error'})
					}
				}
			},
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.nickname = data.nickname
				this.form.cate_id = data.cate_id
				this.form.content = data.content
				this.form.status = data.status
				this.form.popup = data.popup
				this.form.cate_title = data.cate_title

				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			},

			visibleChange(val) {
				console.log(val)
			},

			async selectCateList() {
				var res = await this.$API.notice.cate.list.get()
				if(res.code == 20000){
					this.cateList = res.data.list
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			}
		}
	}
</script>

<style>
</style>
