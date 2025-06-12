import { Method } from 'alova';
import { alovaInstance } from './index';

/**
 * 通用响应数据接口
 */
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

/**
 * 分页响应数据接口
 */
export interface PaginationResponse<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 分页请求参数接口
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  [key: string]: any;
}

/**
 * 创建GET请求
 * @param url 请求路径
 * @param params 请求参数
 * @param config 请求配置
 */
export const createGet = <T = any>(
  url: string,
  params?: Record<string, any>,
  config?: Record<string, any>
) => {
  return alovaInstance.Get<ApiResponse<T>>(url, {
    params,
    ...config,
  });
};

/**
 * 创建POST请求
 * @param url 请求路径
 * @param data 请求体数据
 * @param config 请求配置
 */
export const createPost = <T = any>(
  url: string,
  data?: any,
  config?: Record<string, any>
) => {
  return alovaInstance.Post<ApiResponse<T>>(url, data, config);
};

/**
 * 创建PUT请求
 * @param url 请求路径
 * @param data 请求体数据
 * @param config 请求配置
 */
export const createPut = <T = any>(
  url: string,
  data?: any,
  config?: Record<string, any>
) => {
  return alovaInstance.Put<ApiResponse<T>>(url, data, config);
};

/**
 * 创建DELETE请求
 * @param url 请求路径
 * @param params 请求参数
 * @param config 请求配置
 */
export const createDelete = <T = any>(
  url: string,
  params?: Record<string, any>,
  config?: Record<string, any>
) => {
  return alovaInstance.Delete<ApiResponse<T>>(url, {
    params,
    ...config,
  });
};

/**
 * 创建分页GET请求
 * @param url 请求路径
 * @param params 分页请求参数
 * @param config 请求配置
 */
export const createPageGet = <T = any>(
  url: string,
  params?: PaginationParams,
  config?: Record<string, any>
) => {
  return alovaInstance.Get<ApiResponse<PaginationResponse<T>>>(url, {
    params: {
      page: 1,
      pageSize: 10,
      ...params,
    },
    ...config,
  });
}; 