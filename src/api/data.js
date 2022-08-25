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

export const userGet = (param) => {
    return axios.request({
        url: 'WDS/user/get',
        method: 'get',
        params: param
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

export const userInfo = (param) => {
    return axios.request({
        url: 'WDS/cus/get',
        method: 'get',
        params: param
    })
}

export const editProfile = (param) => {
    return axios.request({
        url: 'WDS/cus/edit',
        method: 'post',
        data: param
    })
}

export const vehicleList = (param) => {
    return axios.request({
        url: 'WDS/vehicle/user/list',
        method: 'get',
        params: param
    })
}

export const vehicleInfo = (param) => {
    return axios.request({
        url: 'WDS/vehicle/get',
        method: 'get',
        params: param
    })
}

export const editVehicle = (param) => {
    return axios.request({
        url: 'WDS/vehicle/edit',
        method: 'post',
        data: param
    })
}

export const vehicleDriverList = (param) => {
    return axios.request({
        url: 'WDS/driver/vehicle/list',
        method: 'get',
        params: param
    })
}

export const driverInfo = (param) => {
    return axios.request({
        url: 'WDS/driver/get',
        method: 'get',
        params: param
    })
}

export const editDriver = (param) => {
    return axios.request({
        url: 'WDS/driver/edit',
        method: 'post',
        data: param
    })
}

export const editPol = (param) => {
    return axios.request({
        url: 'WDS/pol/edit',
        method: 'post',
        data: param
    })
}

export const userPolicyList = (param) => {
    return axios.request({
        url: 'WDS/pol/user/list',
        method: 'get',
        params: param
    })
}

export const policyInfo = (param) => {
    return axios.request({
        url: 'WDS/pol/get',
        method: 'get',
        params: param
    })
}

export const userInvoiceList = (param) => {
    return axios.request({
        url: 'WDS/invoice/user/list',
        method: 'get',
        params: param
    })
}

export const invoiceInfo = (param) => {
    return axios.request({
        url: 'WDS/invoice/get',
        method: 'get',
        params: param
    })
}

export const updatePayment = (param) => {
    return axios.request({
        url: 'WDS/user/update/payment',
        method: 'post',
        data: param
    })
}

export const makePayment = (param) => {
    return axios.request({
        url: 'WDS/invoice/make/payment',
        method: 'post',
        data: param
    })
}
