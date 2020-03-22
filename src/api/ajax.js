import axios from 'axios'
import qs from 'qs'
import router from '../router'


//生成一个Axios的伪实例instance
//instance 不是真正的Axios的实例  但是它有Axios实例所有的属性和方法
const instance = axios.create({
    //基本路径
    baseURL: '/api'
})


//添加请求拦截器  对即将要发送的请求拦截下来  对当前的请求批量处理 如:添加token
instance.interceptors.request.use(config =>{
    //1.config里包含所有的请求信息: data  url 
    
    //2.修改post请求的参数格式  默认的格式是json对象的格式{a:xxx,b:yyy},
    //当前服务器只支持url-encodeing格式的 a=xxx&b=yyy
    //json => url-encodeing
    config.data = qs.stringify(config.data) //赋值操作

    //3.   携带token  
       //(1)从localStorage中获取token
     
    let token = localStorage.getItem('token_key') 
    console.log(token);  
        //判断当前是否需要携带token
        if (config.headers.needToken) {
              //判断是否有token
            if (token) {//有token 
                //给请求头添加token  一般以authorization这个字段携带
                config.headers.authorization = token
            } else {//没有token 就没必要自动登录  抛出一个错误
               throw Error('请先登录') 
            } 
        }
   
     
    //新的值return出去
    return config

})

//响应拦截器
instance.interceptors.response.use( //一个成功的和一个失败的
    response => response.data,
    error => {
    //    alert('qingquichucuo')
       //打印一下错误
        console.log(error);
       //判断错误的类型  (有很多种错误)
       if (!error.response) {//请求没有发出去 在请求拦截器报的错误
           alert(error.message)
           //自动跳转到登录页面  currentRoute当前路由对象
           if (router.currentRoute.path !== '/login') { //如果不在登录页面则跳转
               router.replace('/login')
           }

       } else {//发送请求后获取的错误信息 对象
           if (error.response.status === 401) {
               alert('token过期,重新登录')
                //自动跳转到登录页面  currentRoute当前路由对象
                if (router.currentRoute.path !== '/login') { //如果不在登录页面则跳转
                 router.replace('/login')
                 }
           } else if(error.response.status === 404){
                alert('请求资源未找到')
           }else{
                alert('请求失败')
           }
       } 



       //在失败中会默认返回一个成功的promise实例  但是没有数据
       //手动返回一个初始化的promise
       return new Promise(()=>{})
    }

)


//暴露出去
export default instance