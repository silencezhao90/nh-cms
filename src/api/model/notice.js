import config from "@/config"
import http from "@/utils/request"

export default {
	cate: {
        create: {
			url: `${config.API_URL2}/notice/v1/cates`,
            name: "添加分类",
            post: async function(data){
                return await http.post(this.url, data);
            }
		},
		list: {
			url: `${config.API_URL2}/notice/v1/cates`,
            name: "分类列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        update: {
			url: `${config.API_URL2}/notice/v1/cates`,
            name: "更新分类",
            put: async function(id, data){
                return await http.put(this.url + `/${id}`, data);
            }
		},
        delete: {
			url: `${config.API_URL2}/notice/v1/cates`,
            name: "删除分类",
            delete: async function(data){
                return await http.delete(this.url, data);
            }
		},
	},
    notice: {
        create: {
			url: `${config.API_URL2}/notice/v1/notices`,
            name: "添加公告",
            post: async function(data){
                return await http.post(this.url, data);
            }
		},
		list: {
			url: `${config.API_URL2}/notice/v1/notices`,
            name: "公告列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        update: {
			url: `${config.API_URL2}/notice/v1/notices`,
            name: "更新公告",
            put: async function(id, data){
                return await http.put(this.url + `/${id}`, data);
            }
		},
        delete: {
			url: `${config.API_URL2}/notice/v1/notices`,
            name: "删除公告",
            delete: async function(data){
                return await http.delete(this.url, data);
            }
		},
	},
}
