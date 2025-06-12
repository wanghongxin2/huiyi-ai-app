import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';

// 创建alova实例
export const alovaInstance = createAlova({
  // 请求基础URL
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  
  // 使用React Hooks
  statesHook: ReactHook,
  
  // 使用fetch请求适配器
  requestAdapter: adapterFetch(),
  
  // 请求拦截器
  beforeRequest: async (method) => {
    // 统一添加请求头
    method.config.headers = {
      ...method.config.headers,
      'Content-Type': 'application/json',
    };
  },
  
  // 响应拦截器
  responded: async (response) => {
    if (!response.ok) {
      // 处理非2xx响应
      const error = await response.json().catch(() => ({}));
      return Promise.reject(error);
    }
    
    // 解析JSON响应
    return response.json();
  },
});

// 导出常用的请求方法创建函数
export const { Get, Post, Put, Delete, Head, Patch, Options } = alovaInstance;

// 默认导出alova实例
export default alovaInstance; 