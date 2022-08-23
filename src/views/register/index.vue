<template>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="register-container">
        <h3 class="register-title"> Register </h3>
        <el-form-item label="username" label-width="80px" prop="user_name" class="username">
            <el-input type="input" v-model="form.user_name" autocomplete="off" placeholder="please input username"></el-input>
        </el-form-item>
        <el-form-item label="password" label-width="80px" prop="password" class="password">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="please input password"></el-input>
        </el-form-item>
        <el-form-item label="confirm" label-width="80px" prop="password2" class="password2">
            <el-input type="password" v-model="form.password2" autocomplete="off" placeholder="please confirm password"></el-input>
        </el-form-item>
        <el-form-item class="register-confirm">
            <el-button type="primary" @click="register" class="register-confirm"> register </el-button>
            <el-button type="info" @click="gotoLogin" class="goto-login"> login </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { register } from '@/api/data';

export default {
    name: 'register-view',
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('please input password'));
            } else {
                if (this.form.password2 !== '') {
                    this.$refs.form.validateField('password2');
            }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('please input password again'));
            } else if (value !== this.form.password) {
                callback(new Error('different password'));
            } else {
                callback();
            }
        };
        return {
            form: {

            },
            rules: {
                user_name: [
                    { required: true, message: "Please input username!", trigger: "blur" },
                    { min: 3, message: "Username should contain more than 3 characters!", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "Please input password!", trigger: "blur" },
                    { validator: validatePass, trigger: "blur" },
                    { min: 8, message: "Password should contain more than 8 characters!", trigger: "blur" }
                ],
                password2: [
                    { required: true, message: "Please input password!", trigger: "blur" },
                    { validator: validatePass2, trigger: "blur" },
                    { min: 8, message: "Password should contain more than 8 characters!", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        register() {
            var param = new FormData()
            for (var key in this.form) {
                param.append(key, this.form[key])
            }
            register(param).then(res => {
                console.log(res.data)
                if (res.data.code == 0) {
                    this.$message('register success');
                    this.$router.push({
                        name: 'login'
                    })
                } else {
                    this.$message(res.data.message);
                    this.$refs.form.resetFields();
                }
            })
        },
        gotoLogin() {
            this.$router.push({
                name: 'login'
            })
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