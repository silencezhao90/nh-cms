import config from "@/config"
import http from "@/utils/request"

export default {
	channel: {
		url: `${config.API_URL2}/content/v1/channels`,
		create: async function(data){
			return await http.post(this.url, data, {});
		},
		update: async function(id, data){
			return await http.put(this.url + `/${id}`, data, {});
		},
		delete: async function(data){
			return await http.delete(this.url, data, {});
		},
		get: async function(params){
			return await http.get(this.url, params);
		},
		list: {
			url: `${config.API_URL2}/content/v1/channels`,
			name: "数据列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
	},
	content: {
		create: {
			url: `${config.API_URL2}/content/v1/contents`,
			name: "创建栏目",
			post: async function(data){
				return await http.post(this.url, data, {
					headers: {
						//'response-status': 401
					}
				});
			}
		},
		update: {
			url: `${config.API_URL2}/content/v1/contents`,
			name: "编辑栏目",
			put: async function(id, data){
				return await http.put(this.url + `/${id}`, data, {
					headers: {
						//'response-status': 401
					}
				});
			}
		},
		list: {
			url: `${config.API_URL2}/content/v1/contents`,
			name: "数据列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		listRecycleBin: {
			url: `${config.API_URL2}/content/v1/contents/recycleBin`,
			name: "回收站数据列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		info: {
			url: `${config.API_URL2}/content/v1/contents`,
			name: "内容详情",
			get: async function(id, params){
				return await http.get(this.url + `/${id}`, params);
			}
		},
		delete: {
			url: `${config.API_URL2}/content/v1/contents`,
			name: "批量删除内容",
			delete: async function(data){
				return await http.delete(this.url, data, {
					headers: {
						//'response-status': 401
					}
				});
			}
		},
		restore: {
			url: `${config.API_URL2}/content/v1/contents/restore`,
			name: "批量恢复内容",
			post: async function(data){
				return await http.post(this.url, data, {});
			}
		},
	}
}
