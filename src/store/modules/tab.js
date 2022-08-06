export default {
    state: {
        isCollapse: false,
        icon: 'el-icon-s-fold',
        pageTitle: 'overview'
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
            if (state.isCollapse) {
                state.icon = 'el-icon-s-unfold'
            } else {
                state.icon = 'el-icon-s-fold'
            }
            
        },
        changeTitle(state, value) {
            state.pageTitle = value
        }
    }
}