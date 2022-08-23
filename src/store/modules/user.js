import Cookie from 'js-cookie'

export default {
    state: {
        uId: null,
        token: ''
    },
    mutations: {
        setUser(state, data) {
            state.uId = data.id
            state.token = data.token
            Cookie.set('uId', state.uId)
            Cookie.set('token', state.token)
        },
        removeUser(state) {
            state.token = ''
            state.uId = null
            Cookie.remove('token')
            Cookie.remove('uId')
        },
        getUser(state) {
            state.token = state.token || Cookie.get('token')
            state.uId = state.uId || Cookie.get('uId')
        }
    },
    actions: {
        setUser(context, data) {
            context.commit('setUser', data)
        }
    }
}