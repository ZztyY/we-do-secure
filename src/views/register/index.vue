<template>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="register-container">
        <h3 class="register-title"> Register </h3>
        <el-form-item label="username" label-width="80px" prop="username" class="username">
            <el-input type="input" v-model="form.username" autocomplete="off" placeholder="please input username"></el-input>
        </el-form-item>
        <el-form-item label="password" label-width="80px" prop="password" class="password">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="please input password"></el-input>
        </el-form-item>
        <el-form-item label="confirm" label-width="80px" prop="password2" class="password2">
            <el-input type="password" v-model="form.password2" autocomplete="off" placeholder="please confirm password"></el-input>
        </el-form-item>
        <el-form-item class="register-confirm">
            <el-button type="primary" @click="register" class="register-confirm"> register </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'register-view',
    data () {
        return {
            form: {

            },
            rules: {
                username: [
                    { required: true, message: "Please input username!", trigger: "blur" },
                    { min: 3, message: "Username should contain more than 3 characters!", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "Please input password!", trigger: "blur" },
                    { min: 8, message: "Password should contain more than 8 characters!", trigger: "blur" }
                ],
                password2: [
                    { required: true, message: "Please confirm password!", trigger: "blur" },
                    { min: 8, message: "Password should contain more than 8 characters!", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        register() {

        }
    }
}
</script>

<style lang="less" scoped>
.register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.register-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.register-confirm {
    margin: 10px auto 0px auto;
}
.username {
    height: 50px
}
.password {
    height: 50px
}
</style>