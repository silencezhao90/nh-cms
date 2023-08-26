import config from "@/config"
import http from "@/utils/request"

export default {
	grade: {
        create: {
			url: `${config.API_URL2}/member/v1/grades`,
            name: "添加等级",
            post: async function(data){
                return await http.post(this.url, data);
            }
		},
		list: {
			url: `${config.API_URL2}/member/v1/grades`,
            name: "等级列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        update: {
			url: `${config.API_URL2}/member/v1/grades`,
            name: "更新等级",
            put: async function(id, data){
                return await http.put(this.url + `/${id}`, data);
            }
		},
        delete: {
			url: `${config.API_URL2}/member/v1/grades`,
            name: "删除等级",
            delete: async function(data){
                return await http.delete(this.url, data);
            }
		},
	},
    member: {
		list: {
			url: `${config.API_URL2}/member/v1/members`,
            name: "会员列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        update: {
			url: `${config.API_URL2}/member/v1/members`,
            name: "更新会员",
            put: async function(id, data){
                return await http.put(this.url + `/${id}`, data);
            }
		},
        delete: {
			url: `${config.API_URL2}/member/v1/members`,
            name: "删除会员",
            delete: async function(data){
                return await http.delete(this.url, data);
            }
		},
	},
}
