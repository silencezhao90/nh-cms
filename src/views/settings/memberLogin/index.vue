<template>
	<el-main>
		<el-card shadow="never">
			<el-tabs tab-position="top">

				<el-tab-pane label="微信小程序登录">
					<el-form ref="form" :model="setting" label-width="100px" style="margin-top: 20px;">
						<el-form-item label="是否启用">
							<el-switch v-model="setting.wxApplet.open"></el-switch>
						</el-form-item>
						<el-form-item label="AppID">
							<el-input v-model="setting.wxApplet.appID"></el-input>
						</el-form-item>
						<el-form-item label="AppSecret">
							<el-input v-model="setting.wxApplet.appSecret"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="微信公众号登陆">
					<el-form ref="form" :model="msg" label-width="100px" style="margin-top: 20px;">
						<el-form-item label="是否启用">
							<el-switch v-model="setting.wxOffical.open"></el-switch>
						</el-form-item>
                        <el-form-item label="AppID">
                            <el-input v-model="setting.wxOffical.appID"></el-input>
                        </el-form-item>
                        <el-form-item label="AppSecret">
                            <el-input v-model="setting.wxOffical.appSecret"></el-input>
                        </el-form-item>
						<el-form-item label="回调地址">
                            <el-input v-model="setting.wxOffical.callback"></el-input>
                        </el-form-item>
						<el-form-item>
							<el-button type="primary">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="PC微信扫码">
                    <el-form ref="form" :model="msg" label-width="100px" style="margin-top: 20px;">
						<el-form-item label="是否启用">
							<el-switch v-model="setting.pcWxScan.open"></el-switch>
						</el-form-item>
						<el-form-item label="AppID">
                            <el-input v-model="setting.pcWxScan.appID"></el-input>
                        </el-form-item>
                        <el-form-item label="AppSecret">
                            <el-input v-model="setting.pcWxScan.appSecret"></el-input>
                        </el-form-item>
						<el-form-item label="回调地址">
                            <el-input v-model="setting.pcWxScan.callback"></el-input>
                        </el-form-item>
						<el-form-item>
							<el-button type="primary">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="QQ登陆">
                    <el-form ref="form" :model="msg" label-width="100px" style="margin-top: 20px;">
                        <el-form-item label="是否启用">
							<el-switch v-model="setting.qq.open"></el-switch>
						</el-form-item>
						<el-form-item label="AppID">
                            <el-input v-model="setting.qq.appID"></el-input>
                        </el-form-item>
                        <el-form-item label="AppSecret">
                            <el-input v-model="setting.qq.appSecret"></el-input>
                        </el-form-item>
						<el-form-item label="回调地址">
                            <el-input v-model="setting.qq.callback"></el-input>
                        </el-form-item>
						<el-form-item>
							<el-button type="primary">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="手机号登陆">
                    <el-form ref="form" :model="msg" label-width="100px" style="margin-top: 20px;">
                        <el-form-item label="是否启用">
							<el-switch v-model="setting.mobile.open"></el-switch>
						</el-form-item>
						<el-form-item label="服务商选择">
							<el-radio-group v-model="setting.mobile.operator">
								<el-radio label="tencent">腾讯云</el-radio>
								<el-radio label="aliyun">阿里云</el-radio>
							</el-radio-group>
                        </el-form-item>
						<div v-if="setting.mobile.operator === 'tencent'">
							<el-form-item label="APPID">
								<el-input v-model="setting.mobile.tencent.appid"></el-input>
							</el-form-item>
							<el-form-item label="KEY">
								<el-input v-model="setting.mobile.tencent.key"></el-input>
							</el-form-item>
							<el-form-item label="短信签名">
								<el-input v-model="setting.mobile.tencent.sign"></el-input>
							</el-form-item>
						</div>
						<div v-if="setting.mobile.operator === 'aliyun'">
							<el-form-item label="AccessKeyId">
								<el-input v-model="setting.mobile.aliyun.accessKeyId"></el-input>
							</el-form-item>
							<el-form-item label="AccessKeySecret">
								<el-input v-model="setting.mobile.aliyun.accessKeySecret"></el-input>
							</el-form-item>
							<el-form-item label="短信签名">
								<el-input v-model="setting.mobile.aliyun.sign"></el-input>
							</el-form-item>
						</div>
                        
						<el-form-item>
							<el-button type="primary">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="line登陆">
                    <el-form ref="form" :model="msg" label-width="100px" style="margin-top: 20px;">
                        <el-form-item label="是否启用">
							<el-switch v-model="setting.line.open"></el-switch>
						</el-form-item>
						<el-form-item label="频道ID">
                            <el-input v-model="setting.line.channelID"></el-input>
                        </el-form-item>
                        <el-form-item label="密钥">
                            <el-input v-model="setting.line.secret"></el-input>
                        </el-form-item>
						<el-form-item label="回调地址">
                            <el-input v-model="setting.line.callback"></el-input>
                        </el-form-item>
						<el-form-item>
							<el-button type="primary">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="抖音登陆">
                    <el-form ref="form" :model="msg" label-width="100px" style="margin-top: 20px;">
                        <el-form-item label="是否启用">
							<el-switch v-model="setting.douyin.open"></el-switch>
						</el-form-item>
						<el-form-item label="appid">
                            <el-input v-model="setting.douyin.appid"></el-input>
                        </el-form-item>
                        <el-form-item label="key">
                            <el-input v-model="setting.douyin.key"></el-input>
                        </el-form-item>
						<el-form-item label="回调地址">
                            <el-input v-model="setting.douyin.callback"></el-input>
                        </el-form-item>
						<el-form-item>
							<el-button type="primary">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

			</el-tabs>
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
				setting: {
					wxApplet: {
						open: false,
						appID: "",
						appSecret: ""
					},
					wxOffical: {
						open: false,
						appID: "",
						appSecret: "",
						callback: ""
					},
					pcWxScan: {
						open: false,
						appID: "",
						appSecret: "",
						callback: ""
					},
					qq: {
						open: false,
						appID: "",
						appSecret: "",
						callback: ""
					},
					mobile: {
						open: false,
						operator: "tencent",
						aliyun: {
							accessKeyId: "",
							accessKeySecret: "",
							sign: ""
						},
						tencent: {
							appid: "",
							key: "",
							sign: ""
						}
					},
					line: {
						open: false,
						channelID: "",
						secret: "",
						callback: ""
					},
					douyin: {
						open: false,
						appid: "",
						key: "",
						callback: ""
					}
				},
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
