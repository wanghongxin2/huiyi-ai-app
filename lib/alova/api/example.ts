import { createGet, createPost } from "../utils";

/**
 * 用户信息接口
 */
interface UserInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * 登录参数接口
 */
interface LoginParams {
  username: string;
  password: string;
}

/**
 * GET请求示例 - 获取用户信息
 * @param userId 用户ID
 */
export const getUserInfo = (userId: number) => {
  return createGet<UserInfo>(`/users/${userId}`);
};

/**
 * POST请求示例 - 用户登录
 * @param data 登录参数
 */
export const login = (data: LoginParams) => {
  return createPost<{ token: string; userInfo: UserInfo }>('/auth/login', data);
};

