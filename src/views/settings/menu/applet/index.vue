<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="list.apiObj" row-key="id" @selection-change="selectionChange" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="ID" prop="id" width="80"></el-table-column>
				<el-table-column label="页面名称" prop="title" width="180"></el-table-column>
				<el-table-column label="页面类型" prop="title" width="180"></el-table-column>
				<el-table-column label="排序" prop="sequence" width="80"></el-table-column>
				<el-table-column label="更新时间" prop="updated_at" width="250"></el-table-column>
				<el-table-column label="添加时间" prop="created_at" width="250"></el-table-column>
				<el-table-column label="状态" prop="status" width="100" sortable='custom' column-key="filterType" :filters="[{text: '启用', value: 1}, {text: '未启用', value: 0}]">
					<template #default="scope">
						<el-switch v-model="scope.row.status" @change="statusChange(scope.row)" />
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="200">
					<template #default="scope">
						<el-button plain size="small" @click="table_show(scope.row)">查看</el-button>
						<el-button type="primary" plain size="small" @click="table_edit(scope.row)">编辑</el-button>
						<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
							<template #reference>
								<el-button plain type="danger" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>

	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>

</template>

<script>
	import saveDialog from './save'

	export default {
		name: 'listCrud',
		components: {
			saveDialog
		},
		data() {
			return {
				dialog:{
					save: false
				},
				list: {
					apiObj: this.$API.notice.cate.list
				},
				selection: []
			}
		},
		mounted() {

		},
		methods: {
			//窗口新增
			add(){
				this.$router.push({
					path: '/settings/menu/applet/save',
					query: {
						mode: "add"
					}
				})
			},
			//窗口编辑
			table_edit(row){
				this.$router.push({
					path: '/settings/menu/applet/save',
					query: {
						id: row.id,
						mode: "edit",
						form: row
					}
				})
			},
			//查看
			// table_show(row){
			// 	this.dialog.info = true
			// 	this.$nextTick(() => {
			// 		this.$refs.infoDialog.setData(row)
			// 	})
			// },
			//查看
			table_show(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('show').setData(row)
				})
			},
			//删除明细
			async table_del(row, index){
				// var reqData = {id: row.id}
				var reqData = {ids: [row.id], mode: 1}
				var res = await this.$API.notice.cate.delete.delete(reqData);
				if(res.code == 20000){
					this.$refs.table.removeIndex(index)
					this.$message.success("删除成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//批量删除
			async batch_del(){
				var confirmRes = await this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
					type: 'warning',
					confirmButtonText: '删除',
					confirmButtonClass: 'el-button--danger'
				}).catch(() => {})

				if(!confirmRes){
					return false
				}

				var ids = this.selection.map(v => v.id)
				var reqData = {ids: ids, mode: 1}
				var res = await this.$API.notice.cate.delete.delete(reqData);
				if(res.code == 20000){
					this.$refs.table.removeKeys(ids)
					this.$message.success("删除成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}

			},
			//表格选择后回调事件
			selectionChange(selection){
				this.selection = selection
			},
			//本地更新数据
			handleSaveSuccess(data, mode){
				//为了减少网络请求，直接变更表格内存数据
				if(mode=='add'){
					this.$refs.table.unshiftRow(data)
				}else if(mode=='edit'){
					this.$refs.table.updateKey(data)
				}

				//当然也可以暴力的直接刷新表格
				// this.$refs.table.refresh()
			},
			statusChange(row) {
				console.log(row.status)
			}
		}
	}
</script>

<style>
</style>
