import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

// get blog tin tức & hoạt động
const getListBlogNewsAndEvents = (param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };
    return axios.get("/blog/getListBlog", config)
}
// get detail Tin tức & Hoạt động
const getDetailNewsEvents = (id: string | number, param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };
    return axios.get(`/blog/getDetail/${id}`, config)
}

// get list tuỷen dụng
const getListCarrer = (param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };
    return axios.get("/blog_recruitment/getListBlogRecruitment", config)
}

// get detail Tin tức & Hoạt động
const getDetailCarrer = (id: string | number, param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };
    return axios.get(`/blog_recruitment/getDetail/${id}`, config)
}

export {
    getListBlogNewsAndEvents,
    getDetailNewsEvents,
    getListCarrer,
    getDetailCarrer,
}