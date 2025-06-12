"use server";

import { getUserInfo, login } from "@/lib/alova/api/example";
import { wrapServerRequest } from "@/lib/server-utils";
// import { getTranslations } from "next-intl/server";
/**
 * 服务端获取用户信息
 * @param userId 用户ID
 */
export async function fetchUserInfo(userId: number) {
  return wrapServerRequest(async () => {
    // const t = await getTranslations("nav");
    // throw new Error(t("home"));
    const response = await getUserInfo(userId);
    return response;
  });
}

/**
 * 服务端登录
 * @param username 用户名
 * @param password 密码
 */
export async function serverLogin(username: string, password: string) {
  return wrapServerRequest(async () => {
    const response = await login({ username, password });
    return response;
  });
}
