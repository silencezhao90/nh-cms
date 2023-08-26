import config from "@/config"
import http from "@/utils/request"

export default {
	system: {
        create: {
			url: `${config.API_URL2}/setting/v1/system`,
            name: "保存系统配置",
            post: async function(data){
                return await http.post(this.url, data);
            }
		},
		info: {
			url: `${config.API_URL2}/setting/v1/system`,
            name: "获取系统配置",
            get: async function(params){
                return await http.get(this.url, params);
            }
		}
	},
    upload: {
        create: {
			url: `${config.API_URL2}/setting/v1/upload`,
            name: "保存上传配置",
            post: async function(data){
                return await http.post(this.url, data);
            }
		},
		info: {
			url: `${config.API_URL2}/setting/v1/upload`,
            name: "获取上传配置",
            get: async function(params){
                return await http.get(this.url, params);
            }
		}
	},
    entry: {
        save: {
			url: `${config.API_URL2}/setting/v1/entry/save`,
            name: "保存上传配置",
            post: async function(data){
                return await http.post(this.url, data);
            }
		},
		info: {
			url: `${config.API_URL2}/setting/v1/entry/info`,
            name: "获取上传配置",
            get: async function(params){
                return await http.get(this.url, params);
            }
		}
	},
}
