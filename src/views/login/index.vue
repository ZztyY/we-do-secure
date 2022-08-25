<template>
    <div class="back">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
            <h3 class="login-title"> Login </h3>
            <el-form-item label="username" label-width="80px" prop="user_name" class="username">
                <el-input type="input" v-model="form.user_name" autocomplete="off" placeholder="please input username"></el-input>
            </el-form-item>
            <el-form-item label="password" label-width="80px" prop="password" class="password">
                <el-input type="password" v-model="form.password" autocomplete="off" placeholder="please input password"></el-input>
            </el-form-item>
            <el-form-item class="login-confirm">
                <el-button type="primary" @click="login" class="login-confirm"> login </el-button>
                <el-button type="info" @click="gotoRegister" class="goto-register"> register </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login } from '@/api/data'

export default {
    name: 'login-view',
    data () {
        return {
            form: {

            },
            rules: {
                user_name: [
                    { required: true, message: "Please input username!", trigger: "blur" },
                    { min: 3, message: "Username length should > 3!", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "Please input password!", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        login() {
            var param = new FormData()
            for (var key in this.form) {
                param.append(key, this.form[key])
            }
            login(param).then(res => {
                console.log(res.data)
                if (res.data.code == 0) {
                    this.$message('login success');
                    this.$store.dispatch('setUser', res.data.data)
                    this.$router.push({
                        name: 'overview'
                    })
                } else {
                    this.$message(res.data.message);
                    this.$refs.form.resetFields();
                }
            })
        },
        gotoRegister() {
            this.$router.push({
                name: 'register'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.back{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: fixed;
    background-image: url('../../assets/background.jpg')
}
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.login-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.login-confirm {
    margin: 10px auto 0px auto;
}
</style>