// axios中文网: http://www.axios-js.com/zh-cn/docs/index.html
// 参考博客: https://www.cnblogs.com/wu-hen/p/13323591.html
import axios from "axios";
import qs from "qs"



// 配置axios请求的地址

axios.defaults.baseURL = 'http://127.0.0.1:9090/'


// //配置请求头
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers['Authorization'] = 'marchsoft-';
// // 配置超时时间
// axios.default.timeout = 5000;
axios.interceptors.request.use(
    (request) => {
        if (
            request.method == 'POST' ||
            request.method == 'post' ||
            request.method == 'PUT' ||
            request.method == 'put' ||
            request.method == 'GET' ||
            request.method == 'get'
        ) {
            request.data = qs.stringify(request.data)
        }
        const res = JSON.parse(window.localStorage.getItem("user"));
        if (res != null) {

            request.headers.Authorization = request.headers.Authorization + res.token
        }

        return request;
    },
    error => {
        return Promise.error(error);
    }

);
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return error;
    }
);

export default axios;
