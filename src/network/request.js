import axios from "axios";

// 使用export default 方便导入时省去'{}'    :)
export default function request(config) {

  // 封装axios-instance以便发送请求
  const instance = axios.create({
    // Q1:后续研究一下这个baseUrl和传入的config中的url是怎么拼接的？怎么出现了一个localhost……？？？
    // async:false,
    baseUrl: "http://123.207.32.32:8000",
    timeout: "5000"
  });

  // 定制请求拦截器
  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      console.log("request-interceptor出现错误!");
    }
  );

  // 定制响应拦截器
  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    error => {
      console.log("response-interceptor出现错误!");
    }
  );

  // 返回Promise对象
  return instance(config);
}
