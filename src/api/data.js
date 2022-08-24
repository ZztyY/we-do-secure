import axios from './axios'

export const register = (param) => {
    return axios.request({
        url: 'WDS/register',
        method: 'post',
        data: param
    })
}

export const login = (param) => {
    return axios.request({
        url: 'WDS/login',
        method: 'post',
        data: param
    })
}

export const userList = (param) => {
    return axios.request({
        url: 'WDS/user/list',
        method: 'get',
        params: param
    })
}

export const resetPassword = (param) => {
    return axios.request({
        url: 'WDS/reset/password',
        method: 'get',
        params: param
    })
}

export const homeList = (param) => {
    return axios.request({
        url: 'WDS/home/user/list',
        method: 'get',
        params: param
    })
}

export const homeAdd = (param) => {
    return axios.request({
        url: 'WDS/home/add',
        method: 'post',
        data: param
    })
}

export const homeDetail = (param) => {
    return axios.request({
        url: 'WDS/home/get',
        method: 'get',
        params: param
    })
}
