<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px">
			<el-form-item label="上级权限" prop="parent_id">
				<el-cascader v-model="form.parent_id" :options="groups" :props="groupsProps" :show-all-levels="false" clearable style="width: 100%;"></el-cascader>
			</el-form-item>
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入权限名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="URL" prop="url">
				<el-input v-model="form.url" placeholder="请输入权限路由" clearable></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sequence">
				<el-input-number v-model="form.sequence" controls-position="right" :min="1" style="width: 100%;"></el-input-number>
			</el-form-item>
			<!-- <el-form-item label="是否有效" prop="status">
				<el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
			</el-form-item> -->
			<!-- <el-form-item label="备注" prop="remark">
				<el-input v-model="form.remark" clearable type="textarea"></el-input>
			</el-form-item> -->
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
					id:"",
					parent_id: 0,
					name: "",
					sequence: 1,
					status: "1",
					remark: "",
					url: ""
				},
				//验证规则
				rules: {
					sort: [
						{required: true, message: '请输入排序', trigger: 'change'}
					],
					label: [
						{required: true, message: '请输入部门名称'}
					]
				},
				//所需数据选项
				groups: [],
				groupsProps: {
					value: "id",
					label: "name",
					emitPath: false,
					checkStrictly: true
				}
			}
		},
		mounted() {
			this.getGroup()
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
				var res = await this.$API.admin.permission.listTree.get();
				this.groups = res.data.list;
			},
			//表单提交方法
			submit(){
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						if (this.mode == 'add') {
							this.isSaveing = true;
							var res = await this.$API.admin.permission.create.post(this.form);
							this.isSaveing = false;
							if(res.code == 20000){
								this.$emit('success', this.form, this.mode)
								this.visible = false;
								this.$message.success("操作成功")
							}else{
								this.$alert(res.message, "提示", {type: 'error'})
							}
						} else {
							this.isSaveing = true;
							var updRes = await this.$API.admin.permission.update.put(this.form.id, this.form);
							this.isSaveing = false;
							if(updRes.code == 20000){
								this.$emit('success', this.form, this.mode)
								this.visible = false;
								this.$message.success("操作成功")
							}else{
								this.$alert(updRes.message, "提示", {type: 'error'})
							}
						}
					}
				})
			},
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.name = data.name
				this.form.status = data.status
				this.form.url = data.url
				this.form.sequence = data.sequence
				this.form.parent_id = data.parent_id
				this.form.remark = data.remark

				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
