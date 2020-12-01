import request from './request'

// 获取Home模块下的多数据
export default function getLunboData(){
    return request({
        url:"http://123.207.32.32:8000/home/multidata"
    })
}