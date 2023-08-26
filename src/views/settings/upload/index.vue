<template>
	<el-main>
		<el-card shadow="never">
            <el-form ref="form" :model="sys" label-width="100px" style="margin-top: 20px;">
                <el-form-item label="文件上传限制">
                    <el-input-number v-model="upload.size" :min="0" style="margin-right: 10px;"/>
                    <text>M</text>
                    <!-- <el-input v-model="uploadSize"></el-input> -->
                </el-form-item>
                <el-form-item label="默认上传方式" prop="storage">
                    <el-radio-group v-model="upload.storage">
                        <el-radio label="minio">本地服务器</el-radio>
                        <el-radio label="tencent">腾讯云</el-radio>
                        <el-radio label="aliyun">阿里云</el-radio>
                    </el-radio-group>
                    <!-- <el-input v-model="sys.name"></el-input> -->
                </el-form-item>
                <div v-if="upload.storage === 'tencent'" class="tencent">
                    <el-form-item label="Bucket">
                        <el-input v-model="upload.tencent.bucket"></el-input>
                    </el-form-item>
                    <el-form-item label="Region">
                        <el-input v-model="upload.tencent.region"></el-input>
                    </el-form-item>
                    <el-form-item label="SecretId">
                        <el-input v-model="upload.tencent.secreId"></el-input>
                    </el-form-item>
                    <el-form-item label="SecretKey">
                        <el-input v-model="upload.tencent.secreKey"></el-input>
                    </el-form-item>
                    <el-form-item label="Domain">
                        <el-input v-model="upload.tencent.domain"></el-input>
                    </el-form-item>
                </div>
                <div v-if="upload.storage === 'aliyun'" class="aliyun">
                    <el-form-item label="Bucket">
                        <el-input v-model="upload.aliyun.bucket"></el-input>
                    </el-form-item>
                    <el-form-item label="AccessKeyId">
                        <el-input v-model="upload.aliyun.accessKeyId"></el-input>
                    </el-form-item>
                    <el-form-item label="AccessKeySecret">
                        <el-input v-model="upload.aliyun.accessKeySecret"></el-input>
                    </el-form-item>
                    <el-form-item label="Domain">
                        <el-input v-model="upload.aliyun.domain"></el-input>
                    </el-form-item>
                </div>
                
                <el-form-item>
                    <el-button type="primary" @click="submit()">保存</el-button>
                </el-form-item>
            </el-form>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'system',
		data() {
			return {
                upload: {
                    storage: "minio",
                    size: 10,
                    tencent: {
                        bucket: "",
                        region: "",
                        secreId: "",
                        secreKey: "",
                        domain: ""
                    },
                    aliyun: {
                        bucket: "",
                        accessKeyId: "",
                        accessKeySecret: "",
                        domain: "",
                    }
                },
                //验证规则
				rules: {
					radio: [
						{required: true, message: '请选择'}
					]
				},
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
				var res = await this.$API.setting.upload.info.get()
				if(res.code == 20000){
					this.upload = res.data
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			async submit() {
				// var valid = await this.$refs.dialogForm.validate().catch(() => {})
				// if(!valid){
				// 	return false
				// }
				var res = await this.$API.setting.upload.create.post(this.upload);
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
