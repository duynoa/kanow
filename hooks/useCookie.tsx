import { CookieCore } from "@/lib/cookie"

export const useCookie = () => {
    const getCookie = CookieCore.get('myCookie');
    const setCookie = (name: any, token: any, date: any) => {
        return CookieCore.set(name, token, date);
    }
    const removeCookie = (key: string) => CookieCore.remove(key);
    return { getCookie, setCookie, removeCookie }
}