<template>
	<el-container>
		<el-container>
			<el-header>
				<div class="left-panel">
					<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
				</div>
				<div class="right-panel">
					<div class="right-panel-search">
						<el-input v-model="search.name" placeholder="登录账号 / 姓名" clearable></el-input>
						<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
					</div>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :apiObj="apiObj" @selection-change="selectionChange" stripe remoteSort remoteFilter>
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column label="ID" prop="id" width="80" sortable='custom'></el-table-column>
					<!-- <el-table-column label="登录账号" prop="userName" width="150" sortable='custom' column-key="filterUserName" :filters="[{text: '系统账号', value: '1'}, {text: '普通账号', value: '0'}]"></el-table-column> -->
					<el-table-column label="标题" prop="title" width="150" sortable='custom'></el-table-column>
					<el-table-column label="分类" prop="type" width="150" sortable='custom' column-key="filterType" :filters="[{text: '图文', value: '10'}, {text: '图片', value: '20'}, {text: '下载', value: '30'}, {text: '视频', value: '40'}, {text: '案例', value: '50'}]">
						<template #default="scope">
							<text>{{ scope.row.type_name }}</text>
						</template>
					</el-table-column>
					<el-table-column label="简介" prop="intro" width="150" sortable='custom'></el-table-column>
					<el-table-column label="缩略图" width="180" column-key="filterAvatar" :filters="[{text: '已上传', value: '1'}, {text: '未上传', value: '0'}]">
						<template #default="scope">
							<el-image 
								style="width: 100px; height: 100px"
								:src="scope.row.thumbnail" >
							</el-image>
						</template>
					</el-table-column>
					<el-table-column label="状态" prop="status" width="100" sortable='custom' column-key="filterType" :filters="[{text: '审核', value: 1}, {text: '未审核', value: 0}]">
						<template #default="scope">
							<el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="statusChange(scope.row)" />
						</template>
					</el-table-column>
					<el-table-column label="更新时间" prop="updated_at" width="170" sortable='custom'></el-table-column>
					<el-table-column label="添加时间" prop="created_at" width="170" sortable='custom'></el-table-column>
					<el-table-column label="操作" fixed="right" align="right" width="200">
						<template #default="scope">
							<el-button-group>
								<el-button text type="primary" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
								<el-button text type="primary" size="small" @click="table_edit(scope.row, scope.$index)">恢复</el-button>
								<el-popconfirm title="确定永久删除吗？" :width="200" @confirm="table_del(scope.row, scope.$index)">
									<template #reference>
										<el-button text type="primary" size="small">永久删除</el-button>
									</template>
								</el-popconfirm>
							</el-button-group>
						</template>
					</el-table-column>

				</scTable>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	export default {
        name: "recycle",
		data() {
			return {
				apiObj: this.$API.content.content.listRecycleBin,
				selection: [],
				search: {
					name: null
				}
			}
		},
		methods: {
			//编辑
			async table_edit(row, index){
                var reqData = {ids: [row.id]}
                var res = await this.$API.content.content.restore.post(reqData);
                if(res.code == 20000){
					this.$refs.table.tableData.splice(index, 1);
					this.$message.success("恢复成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//查看
			table_show(row){
				// this.dialog.save = true
				// this.$nextTick(() => {
				// 	this.$refs.saveDialog.open('show').setData(row)
				// })
				this.$router.push({
					path: '/contents/content/detail',
					query: {
						id: row.id,
						mode: "show",
						form: row
					}
				})
			},
			// 永久删除
			async table_del(row, index){
				var reqData = {ids: [row.id], mode: 1}
				var res = await this.$API.content.content.delete.delete(reqData);
				if(res.code == 20000){
					//这里选择刷新整个表格 OR 插入/编辑现有表格数据
					this.$refs.table.tableData.splice(index, 1);
					this.$message.success("删除成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//批量永久删除
			async batch_del(){
				var confirmRes = await this.$confirm(`确定永久删除选中的 ${this.selection.length} 项吗？`, '提示', {
					type: 'warning',
					confirmButtonText: '删除',
					confirmButtonClass: 'el-button--danger'
				}).catch(() => {})

				if(!confirmRes){
					return false
				}

				var ids = this.selection.map(v => v.id)
				var reqData = {ids: ids, mode: 1}
				var res = await this.$API.content.content.delete.delete(reqData);
				if(res.code == 20000){
					this.$refs.table.removeKeys(ids)
					this.$message.success("删除成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}

			},
			//表格选择后回调事件
			selectionChange(selection){
				this.selection = selection;
			},
			//搜索
			upsearch(){
				this.$refs.table.upData(this.search)
			},
			//本地更新数据
			handleSuccess(data, mode){
				if(mode=='add'){
					data.id = new Date().getTime()
					this.$refs.table.tableData.unshift(data)
				}else if(mode=='edit'){
					this.$refs.table.tableData.filter(item => item.id===data.id ).forEach(item => {
						Object.assign(item, data)
					})
				}
			},
			statusChange(row) {
				console.log("status == ", row.status)
			}
		}
	}
</script>

<style>
</style>
