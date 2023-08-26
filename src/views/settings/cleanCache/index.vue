<template>
	<el-main>
		<el-card shadow="never">
			<el-form ref="form" :model="sys" label-width="100px" style="margin-top: 20px;">
				<el-form-item label="清除缓存" prop="type">
					<el-checkbox v-model="form.all">所有缓存</el-checkbox>
  					<el-checkbox v-model="form.data">数据缓存</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">提交</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-main>
</template>

<script>
    import { defineAsyncComponent } from 'vue';
	const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));

	export default {
		name: 'system',
        components: {
			scEditor
		},
		data() {
			return {
				form: {
					all: false,
					data: false
				}
			}
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
		}
	}
</script>

<style>
</style>
