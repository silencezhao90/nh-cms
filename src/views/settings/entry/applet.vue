<template>
	<el-main>
		<el-card shadow="never">
			<el-form ref="form" :model="sys" label-width="100px" style="margin-top: 20px;">
				<el-form-item label="URL">
					<el-input v-model="form.url"></el-input>
				</el-form-item>
				<el-form-item label="二维码">
					<sc-upload v-model="form.qrcode" title="logo"></sc-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit()">保存</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'entryApplet',
		data() {
			return {
				form: {
					type: 20,
					url: "",
					qrcode: "",
				}
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
				var params = {type: this.form.type}
				var res = await this.$API.setting.entry.info.get(params)
				if(res.code == 20000){
					this.form = res.data
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			async submit() {
				// var valid = await this.$refs.dialogForm.validate().catch(() => {})
				// if(!valid){
				// 	return false
				// }
				this.form.type = 20
				var res = await this.$API.setting.entry.save.post(this.form);
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
