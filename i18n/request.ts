import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from 'next-intl';

export default getRequestConfig(async ({ locale: requestLocale }) => {
  // 这通常对应于 `[locale]` 段
  let locale = requestLocale;

  // 确保使用有效的语言
  if (!locale || !hasLocale(routing.locales, locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
