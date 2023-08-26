// 静态路由配置
// 书写格式与动态路由格式一致，全部经由框架统一转换
// 比较动态路由在meta中多加入了role角色权限，为数组类型。一个菜单是否有权限显示，取决于它以及后代菜单是否有权限。
// routes 显示在左侧菜单中的路由(显示顺序在动态路由之前)
// 示例如下

const routes = [
    {
        name: "contents",
        path: "/contents",
        meta: {
            title: "内容管理",
            icon: "el-icon-menu",
        },
        children: [{
            name: "content",
            path: "/contents/content",
            component: "contents/content/index",
            meta: {
                icon: "el-icon-document",
                title: "内容列表",
                role: ["SA"]
            }
        },{
            name: "contentForm",
            path: "/contents/content/form",
            component: "contents/content/form",
            meta: {
                icon: "el-icon-menu",
                title: "内容表单",
                role: ["SA"],
                hidden: true,
                active: "/contents/content"
            }
        }, {
            name: "contentDetail",
            path: "/contents/content/detail",
            component: "contents/content/detail",
            meta: {
                icon: "el-icon-menu",
                title: "内容详情",
                role: ["SA"],
                hidden: true,
                active: "/contents/content"
            }
        }, {
            name: "channel",
            path: "/contents/channel",
            component: "contents/channel",
            meta: {
                icon: "el-icon-tickets",
                title: "栏目",
                role: ["SA"]
            },
        }, {
            name: "recycleBin",
            path: "/contents/recycleBin",
            component: "contents/content/recycleBin",
            meta: {
                icon: "el-icon-delete",
                title: "回收站",
                role: ["SA"]
            }
        }]
    },
    {
        name: "admins",
        path: "/admins",
        meta: {
            "icon": "el-icon-avatar",
            "title": "后台管理",
        },
        children: [{
            name: "admin",
            path: "/admins/admin",
            component: "admins/admin/index",
            meta: {
                icon: "el-icon-menu",
                title: "管理员",
                role: ["SA"]
            }
        },{
            name: "permission",
            path: "/admins/permission",
            component: "admins/permission/index",
            meta: {
                icon: "el-icon-menu",
                title: "权限",
                role: ["SA"]
            }
        },{
            name: "role2",
            path: "/admins/role",
            component: "admins/role/index",
            meta: {
                icon: "el-icon-menu",
                title: "角色"
            }
        }, {
            name: "operateLog",
            path: "/admins/operateLog",
            component: "admins/log/index",
            meta: {
                icon: "el-icon-menu",
                title: "操作日志"
            }
        }]
    },
    {
        name: "members",
        path: "/members",
        meta: {
            "icon": "el-icon-userFilled",
            "title": "会员管理",
        },
        children: [{
            name: "member",
            path: "/members/member",
            component: "members/member/index",
            meta: {
                icon: "el-icon-userFilled",
                title: "会员管理",
                role: ["SA"]
            }
        },{
            name: "memberGrade",
            path: "/members/memberGrade",
            component: "members/grade/index",
            meta: {
                icon: "el-icon-menu",
                title: "会员等级",
                role: ["SA"]
            }
        }]
    },
    {
        name: "notices",
        path: "/notices",
        meta: {
            "icon": "el-icon-comment",
            "title": "公告管理",
        },
        children: [{
            name: "notice",
            path: "/notices/notice",
            component: "notices/notice/index",
            meta: {
                icon: "el-icon-menu",
                title: "公告管理",
                role: ["SA"]
            }
        },{
            name: "noticeCate",
            path: "/notices/noticeCate",
            component: "notices/cate/index",
            meta: {
                icon: "el-icon-menu",
                title: "公告分类",
                role: ["SA"]
            }
        }]
    },
    {
        name: "settings",
        path: "/settings",
        meta: {
            "icon": "el-icon-tools",
            "title": "设置",
        },
        children: [{
            name: "system",
            path: "/settings/system",
            component: "settings/system/index",
            meta: {
                icon: "el-icon-setting",
                title: "系统设置",
                role: ["SA"]
            }
        },{
            name: "upload",
            path: "/settings/upload",
            component: "settings/upload/index",
            meta: {
                icon: "el-icon-uploadFilled",
                title: "上传设置",
                role: ["SA"]
            }
        },{
            name: "environment",
            path: "/settings/environment",
            component: "settings/about",
            meta: {
                icon: "el-icon-menu",
                title: "环境检测",
                role: ["SA"]
            }
        },{
            name: "banner",
            path: "/settings/banner",
            component: "settings/banner/index",
            meta: {
                icon: "el-icon-menu",
                title: "幻灯片banner",
                role: ["SA"]
            }
        },{
            name: "memberLogin",
            path: "/settings/memberLogin",
            component: "settings/memberLogin/index",
            meta: {
                icon: "el-icon-menu",
                title: "第三方登录",
                role: ["SA"]
            }
        },{
            name: "entry",
            path: "/settings/entry",
            component: "notices/cate/index",
            meta: {
                icon: "el-icon-menu",
                title: "入口",
                role: ["SA"]
            },
            children: [{
                name: "entryWeb",
                path: "/settings/entry/web",
                component: "settings/entry/web",
                meta: {
                    icon: "el-icon-menu",
                    title: "网页入口",
                    role: ["SA"]
                }
            }, {
                name: "entryApplet",
                path: "/settings/entry/applet",
                component: "settings/entry/applet",
                meta: {
                    icon: "el-icon-menu",
                    title: "小程序入口",
                    role: ["SA"]
                }
            }]
        },
        {
            name: "menu",
            path: "/settings/menu",
            component: "notices/cate/index",
            meta: {
                icon: "el-icon-menu",
                title: "菜单管理",
                role: ["SA"]
            },
            children: [{
                name: "menuPC",
                path: "/settings/menu/pc",
                component: "notices/cate/index",
                meta: {
                    icon: "el-icon-menu",
                    title: "PC前端菜单",
                    role: ["SA"]
                }
            }, {
                name: "menuBack",
                path: "/settings/menu/back",
                component: "notices/cate/index",
                meta: {
                    icon: "el-icon-menu",
                    title: "后台菜单",
                    role: ["SA"]
                }
            },
            {
                name: "menuApplet",
                path: "/settings/menu/applet",
                component: "settings/menu/applet/index",
                meta: {
                    icon: "el-icon-menu",
                    title: "手机底部菜单",
                    role: ["SA"]
                }
            },
            {
                name: "menuAppletSave",
                path: "/settings/menu/applet/save",
                component: "settings/menu/applet/save",
                meta: {
                    icon: "el-icon-menu",
                    title: "手机底部菜单",
                    hidden: true,
                    role: ["SA"]
                }
            }]
        },
        {
            name: "systemLog",
            path: "/settings/systemLog",
            component: "notices/cate/index",
            meta: {
                icon: "el-icon-menu",
                title: "系统日志",
                role: ["SA"]
            }
        },{
            name: "cleanCache",
            path: "/settings/cleanCache",
            component: "settings/cleanCache/index",
            meta: {
                icon: "el-icon-menu",
                title: "清理缓存",
                role: ["SA"]
            }
        }]
    }
]

// const routes = [
//     {
//         name: "newPage",
//         path: "/newPage",
//         meta: {
//             title: "新的页面"
//         },
//         children: [{
//             name: "demopage",
//             path: "/demopage",
//             component: "test/autocode/index",
//             meta: {
//                 icon: "el-icon-menu",
//                 title: "演示页面",
//                 role: ["SA"]
//             }
//         }],
//         component: "newPage"
//     }
// ]

export default routes;
