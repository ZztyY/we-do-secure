<template>
    <div>
        <!-- main view of user profile -->
        <el-row class="user" :gutter="20">
            <el-col :span="8" style="margin-top: 20px">
                <el-card shadow="hover">
                    <div class="user">
                        <img class="userImg" :src="userImg">
                        <div class="userInfo">
                            <h3 class="title">Your Account</h3>
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <div class="operations">
                        <p><el-button @click="dialogVisible = true" type="info" round> edit profile </el-button></p>
                        <p><el-button @click="resetDialogVisible = true" type="info" round> update password </el-button></p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12" style="margin-top: 20px;">
                <el-card shadow="hover">
                    <div class="accountInfo">
                        <el-descriptions class="Info" title="Personal" :column="1" :size="size" border>
                            <template slot="extra">
                                <el-button @click="dialogVisible = true" type="primary" size="small">Edit</el-button>
                            </template>
                            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                                <template slot="label">
                                    <i class="el-icon-user"></i>
                                    First Name
                                </template>
                                {{ userInfo.fName }}
                            </el-descriptions-item>
                            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                                <template slot="label">
                                    <i class="el-icon-user"></i>
                                    Last Name
                                </template>
                                {{ userInfo.lName }}
                            </el-descriptions-item>
                            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                                <template slot="label">
                                    <i class="el-icon-position"></i>
                                    Street
                                </template>
                                {{ userInfo.street }}
                            </el-descriptions-item>
                            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                                <template slot="label">
                                    <i class="el-icon-position"></i>
                                    City
                                </template>
                                {{ userInfo.city }}
                            </el-descriptions-item>
                            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                                <template slot="label">
                                    <i class="el-icon-position"></i>
                                    State
                                </template>
                                {{ userInfo.state }}
                            </el-descriptions-item>
                            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                                <template slot="label">
                                    <i class="el-icon-position"></i>
                                    Zipcode
                                </template>
                                {{ userInfo.zipcode }}
                            </el-descriptions-item>
                            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                                <template slot="label">
                                    <i class="el-icon-male"></i>
                                    Gender
                                </template>
                                {{ userInfo.gender }}
                            </el-descriptions-item>
                            <el-descriptions-item :contentStyle="contentStyle">
                                <template slot="label">
                                    <i class="el-icon-connection"></i>
                                    Marrital Status
                                </template>
                                {{ userInfo.mar_status }}
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- edit profile dialog -->
        <el-dialog
        title="edit profile"
        :visible.sync="dialogVisible"
        width="30%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="First Name">
                    <el-input v-model="form.fname"></el-input>
                </el-form-item>
                <el-form-item label="Last Name">

                    <el-input v-model="form.lname"></el-input>
                </el-form-item>
                <el-form-item label="Street">
                    <el-input v-model="form.street"></el-input>
                </el-form-item>
                <el-form-item label="City">
                    <el-input v-model="form.city"></el-input>
                </el-form-item>
                <el-form-item label="State">
                    <el-input v-model="form.state"></el-input>
                </el-form-item>
                <el-form-item label="Zipcode">
                    <el-input v-model="form.zipcode"></el-input>
                </el-form-item>
                <el-form-item label="Gender">
                    <el-select v-model="form.gender" placeholder="choose your gender">
                        <el-option label="male" value="0"></el-option>
                        <el-option label="female" value="1"></el-option>
                        <el-option label="private" value=null></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Marital Status">
                    <el-select v-model="form.mar_status" placeholder="choose your marital status">
                        <el-option label="single" value="S"></el-option>
                        <el-option label="married" value="M"></el-option>
                        <el-option label="widow/widower" value="W"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">confirm</el-button>
                    <el-button @click="dialogVisible = false">cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- reset password dialog -->
        <el-dialog
        title="reset password"
        :visible.sync="resetDialogVisible"
        width="30%">
            <el-form :model="resetForm" status-icon :rules="rules" ref="resetForm" label-width="100px" class="resetPasswordForm">
                <el-form-item label="password" prop="pass">
                    <el-input type="password" v-model="resetForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="confirm" prop="checkPass">
                    <el-input type="password" v-model="resetForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="age" prop="age">
                    <el-input v-model.number="resetForm.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('resetForm')">submit</el-button>
                    <el-button @click="reset('resetForm')">reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'user-view',
    data () {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('age cannot be null'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('please input a number'));
                } else {
                    if (value < 18) {
                    callback(new Error('must above 18'));
                } else {
                    callback();
                }
            }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('please input password'));
            } else {
                if (this.resetForm.checkPass !== '') {
                    this.$refs.resetForm.validateField('checkPass');
            }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('please input password again'));
            } else if (value !== this.resetForm.pass) {
                callback(new Error('different password'));
            } else {
                callback();
            }
        };
        return {
            userImg: require('../../assets/user.png'),
            size: "medium",
            contentStyle: {
                'text-align': 'center'
            },
            labelStyle: {
                'width': '30%'
            },
            resetDialogVisible: false,
            dialogVisible: false,
            form: {

            },
            resetForm:{

            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
    },
    computed: {
        userInfo() {
            return {
                fName: 'Tianyi',
                lName: 'Zheng',
                street: '33 Bond St',
                city: 'brooklyn',
                state: 'NY',
                zipcode: '11201',
                gender: 'male',
                mar_status: 'single'
            }
        }
    },
    methods: {
        onSubmit() {
            console.log(this.form)
            this.dialogVisible=false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="less" scoped>
    h3 {
        font-size: 40px;
    }
    .userImg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>