import Mock from 'mockjs'
import shopDatas from './data.json'


// 测试mock
// Mock.mock('/api/test2',123)

//模拟的数据
Mock.mock('/api/getshopdatas',{code:0,data:shopDatas})