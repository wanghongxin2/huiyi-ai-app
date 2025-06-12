/**
 * 服务端响应结果接口
 */
export interface ServerResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

/**
 * 封装服务端请求
 * 统一处理异常和响应格式
 * @param requestFn 请求函数
 * @returns 统一格式的响应结果
 */
export async function wrapServerRequest<T = any>(
  requestFn: () => Promise<any>
): Promise<ServerResponse<T>> {
  try {
    const response = await requestFn();
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("服务端请求失败:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "未知错误",
      error
    };
  }
} 