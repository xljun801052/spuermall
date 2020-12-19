import request from './request'
import axios from 'axios'


// 获取Home模块下的多数据
export function getLunboData(){
    return request({
        url:"http://123.207.32.32:8000/home/multidata"
    })
}

// ========以下均使用自己的接口=====

// 获取Home下商品数据
export function getHomeGoods(type,page){
    // return request({
    //     url:"http://127.0.0.1:12020/homeInfo/goods",
    //     method:'post',
    //     data:{
    //         type,
    //         page
    //     }
    // })
    return axios({
        timeout:3000,
        url:"http://127.0.0.1:12020/homeInfo/goods",
        method:'post',
        headers:{
            'Content-Type':"application/json;charset=utf-8"
        },
        data:JSON.stringify({
            "type":type,
            "page":page
        })
    })
}