<template>
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
                    <p><el-button type="info" round> edit profile </el-button></p>
                    <p><el-button type="info" round> update password </el-button></p>
                </div>
            </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 20px;">
            <el-card shadow="hover">
                <div class="accountInfo">
                    <el-descriptions class="Info" title="Personal" :column="1" :size="size" border>
                        <template slot="extra">
                            <el-button type="primary" size="small">Edit</el-button>
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
</template>

<script>

export default {
    name: 'user-view',
    data () {
        return {
            userImg: require('../../assets/user.png'),
            size: "medium",
            contentStyle: {
                'text-align': 'center'
            },
            labelStyle: {
                'width': '30%'
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