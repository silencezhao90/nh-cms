import API from "@/api";

//字典选择器配置

export default {
	dicApiObj: API.system.dic.get,		//获取字典接口对象
	parseData: function (res) {
		return {
			data: res.data.list,				//分析行数据字段结构
			msg: res.message,			//分析描述字段结构
			code: res.code				//分析状态字段结构
		}
	},
	request: {
		name: 'name'					//规定搜索字段
	},
	props: {
		label: 'title',					//映射label显示字段
		value: 'id',					//映射value值字段
	}
}
