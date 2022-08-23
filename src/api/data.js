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
