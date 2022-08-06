<template>
    <el-row class="autoPolicies" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img class="userImg" :src="userImg">
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="role">SuperManager</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>Last login time:<span>2021-7-19</span></p>
                    <p>Last login location:<span>NY</span></p>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>

export default {
    name: 'auto-policies-view',
    data () {
        return {
            userImg: require('../../../assets/logo.png')
        }
    },
    mounted() {
    }
}
</script>

<style lang="less" scoped>
    .userImg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>
