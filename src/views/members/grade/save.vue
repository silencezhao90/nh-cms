<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px">
			<el-form-item label="名称" prop="title">
				<el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="是否启用" prop="status">
				<el-switch v-model="form.status"></el-switch>
			</el-form-item>
			<el-form-item label="排序" prop="sequence">
				<el-input-number v-model="form.sequence" :min="1" style="width: 100%;"></el-input-number>
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
					id:"",
					name: "",
					sequence: 1,
					status: true,
				},
				//验证规则
				rules: {
					name: [
						{required: true, message: '请输入标题'}
					]
				},
				//所需数据选项
				groups: [],
				groupsProps: {
					value: "id",
					emitPath: false,
					checkStrictly: true
				}
			}
		},
		mounted() {

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
					var res = await this.$API.member.grade.create.post(this.form);
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
					var updRes = await this.$API.member.grade.update.put(this.form.id, this.form);
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
				this.form.name = data.name
				this.form.sequence = data.sequence
				this.form.status = data.status

				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
