import config from "@/config"
import http from "@/utils/request"

export default {
	admin: {
        create: {
			url: `${config.API_URL2}/admin/v1/admins`,
            name: "添加管理员",
            post: async function(data){
                return await http.post(this.url, data);
            }
		},
		list: {
			url: `${config.API_URL2}/admin/v1/admins`,
            name: "管理员列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        update: {
			url: `${config.API_URL2}/admin/v1/admins`,
            name: "添加管理员",
            put: async function(id, data){
                return await http.put(this.url + `/${id}`, data);
            }
		},
	},
    role: {
        create: {
			url: `${config.API_URL2}/admin/v1/roles`,
            name: "添加角色",
            post: async function(data){
                return await http.post(this.url, data);
            }
		},
		list: {
			url: `${config.API_URL2}/admin/v1/roles`,
            name: "角色列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        listTree: {
			url: `${config.API_URL2}/admin/v1/roles/tree`,
            name: "角色列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        update: {
			url: `${config.API_URL2}/admin/v1/roles`,
            name: "更新角色",
            put: async function(id, data){
                return await http.put(this.url + `/${id}`, data);
            }
		},
        delete: {
			url: `${config.API_URL2}/admin/v1/roles`,
            name: "删除角色",
            delete: async function(data){
                return await http.delete(this.url, data);
            }
		},
	},
    permission: {
        create: {
			url: `${config.API_URL2}/admin/v1/permissions`,
            name: "添加全新啊",
            post: async function(data){
                return await http.post(this.url, data);
            }
		},
		list: {
			url: `${config.API_URL2}/admin/v1/permissions`,
            name: "权限列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        listTree: {
			url: `${config.API_URL2}/admin/v1/permissions/tree`,
            name: "权限树列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        update: {
			url: `${config.API_URL2}/admin/v1/permissions`,
            name: "更新权限",
            put: async function(id, data){
                return await http.put(this.url + `/${id}`, data);
            }
		},
        delete: {
			url: `${config.API_URL2}/admin/v1/permissions`,
            name: "删除权限",
            delete: async function(data){
                return await http.delete(this.url, data);
            }
		},
	},
    log: {
		list: {
			url: `${config.API_URL2}/admin/v1/logs`,
            name: "日志列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        delete: {
			url: `${config.API_URL2}/admin/v1/logs`,
            name: "删除日志",
            delete: async function(data){
                return await http.delete(this.url, data);
            }
		},
	},
}
