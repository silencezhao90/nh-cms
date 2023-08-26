import config from "./index";
//富文本编辑器配置

export default {
    editorConfig: { 
        placeholder: '请输入内容...',
        MENU_CONF: {
            uploadImage: {
                server: `${config.API_URL2}/fs/v1/upload`,
                fieldName: 'file',
                maxFileSize: 10 * 1024 * 1024,
                // 调用媒体库
                // uploadImgFromMedia() {
                //     console.log("调用媒体库")
                //     const img = "http://localhost:9000/test/tmp/Messi.jpg"
                //     editor.cmd.do(
                //         'insertHTML',
                //         `<img src="${img}" style="max-width:100%;"/>`
                //     )
                // },
                // 上传前
                onBeforeUpload(files) {
                    console.log("上传前")
                    return files;
                },
                // 自定义插入图片
                customInsert(res, insertFn) {
                    console.log("插入图片")
                    insertFn(res.data.url, res.data.name, res.data.url);
                },
                // 单个文件上传成功之后
                onSuccess(file, res) {
                    console.log(`${file.name} 上传成功`, res);
                },

                // 单个文件上传失败
                onFailed(file, res) {
                    console.log(`${file.name} 上传失败`, res);
                },

                // 上传进度的回调函数
                onProgress(progress) {
                    console.log('progress', progress);
                    // progress 是 0-100 的数字
                },

                // 上传错误，或者触发 timeout 超时
                onError(file, err, res) {
                    console.log(`${file.name} 上传出错`, err, res);
                }
            },
            // 视频上传
            uploadVideo: {
                fieldName: 'file',
                server: `${config.API_URL2}/fs/v1/upload`,

                // 单个文件的最大体积限制，默认为 10M
                maxFileSize: 50 * 1024 * 1024, // 50M

                // 最多可上传几个文件，默认为 5
                maxNumberOfFiles: 3,
                // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
                allowedFileTypes: ['video/*'],

                // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
                meta: {
                // token: 'xxx',
                // otherKey: 'yyy'
                },

                // 将 meta 拼接到 url 参数中，默认 false
                metaWithUrl: false,

                // 自定义增加 http  header
                headers: {
                // Accept: 'text/x-json',
                // otherKey: 'xxx'
                },

                // 超时时间，默认为 30 秒
                timeout: 1000 * 1000, // 1000 秒,
                // 上传之前触发
                onBeforeUpload(file) {
                    return file;
                },
                // 自定义插入视频
                customInsert(res, insertFn) {
                    if (res.code === 200) {
                        console.log("上传成功")
                    } else {
                        console.log("上传失败，请重新尝试")
                    }
                    insertFn(res.data.url, res.data.url);
                },
                // 上传进度的回调函数
                onProgress(progress) {
                    console.log(progress);
                },

                // // 单个文件上传成功之后
                // onSuccess(file, res) {
                //   console.log(`${file.name} 上传成功`, res);
                //   this.successMsg(file);
                // },

                // // 单个文件上传失败
                // onFailed(file, res) {
                //   console.log(`${file.name} 上传失败`, res);
                //   this.errorMsg(file);
                // },

                // 上传错误，或者触发 timeout 超时
                onError(file, err, res) {
                    console.log(`${file.name} 上传出错`, err, res)
                }
            }
        }
    }
}
