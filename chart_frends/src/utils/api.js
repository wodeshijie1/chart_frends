import request from './request'
import qs from 'qs';

const api = {
    wode: (params) => request.get('hello1?' + qs.stringify(params)),
}



export default api;
