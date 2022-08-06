import Cookie from 'js-cookie'

export default {
    state: {
        token: ''
    },
    mutations: {
        setToken(state, value) {
            state.token = value
            Cookie.set('token', value)
        },
        removeToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cookie.get('token')
        }
    },
    actions: {
        setToken(context) {
            context.commit('setToken', 'abc')
        }
    }
}