<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu" plain :icon="sideIcon" size="mini"></el-button>
            <h3> {{ pageTitle }} </h3>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand" trigger="click" size="mini">
                <span>
                    <img class="user" :src="userImg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="profile">
                        profile
                    </el-dropdown-item>
                    <el-dropdown-item command="logout">
                        logout
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'CommonHeader',
        data() {
            return {
                userImg: require('../assets/user.png')
            }
        },
        methods: {
            handleMenu() {
                this.$store.commit('collapseMenu')
            },
            handleCommand(command) {
                if (command === "logout") {
                    this.$store.commit('removeUser')
                    this.$router.push({
                        name: 'login'
                    })
                } else if (command === 'profile') {
                    this.$store.commit('changeTitle', 'profile')
                    this.$router.push({
                        name: 'user'
                    })
                }
            }
        },
        computed: {
            sideIcon() {
                return this.$store.state.tab.icon
            },
            pageTitle() {
                return this.$store.state.tab.pageTitle
            }
        }
    }
</script>

<style lang="less" scoped>
header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
h3 {
    color:black
}
.l-content {
    display: flex;
    align-items: center;
    .el-button {
        margin-right: 20px;
    }
}
.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>