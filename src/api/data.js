import axios from './axios'

export const getMenu = (param) => {
    return axios.request({
        url: 'Admin/admin/list',
        method: 'get',
        data: param
    })
}