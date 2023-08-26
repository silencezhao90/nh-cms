import config from "@/config"
import http from "@/utils/request"

export default {
	token: {
		url: `${config.API_URL}/token`,
		name: "登录获取TOKEN",
		post: async function(data={}){
			return await http.post(this.url, data);
		}
	},
	login: {
		url: `${config.API_URL2}/auth/v1/auth/login`,
		name: "账号密码登录",
		post: async function(data={}){
			return await http.post(this.url, data);
		}
	}
}
