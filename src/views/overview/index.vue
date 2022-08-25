<template>
    <el-row class="overview" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div v-if="userInfo" class="user">
                    <!-- <img class="userImg" :src="userImg"> -->
                    <i class="el-icon-sunny" style="font-size:70px;"></i>
                    <div class="userInfo">
                        <p class="name">Hello, {{userInfo.user_name}}</p>
                        <p class="role">Welcome to We Do Secure!</p>
                    </div>
                </div>
            </el-card>
            <div class="statistics">
                <el-card shadow="hover">
                    <el-descriptions class="Info" title="Statistics" direction="vertical" :column="1" :size="size" border>
                        <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                            ${{ totalPAmount }}
                            <template slot="label">
                                <i class="el-icon-coin"></i>
                                assets under protect
                            </template>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </div>
        </el-col>
        <el-col :span="10" style="margin-top: 20px">
        </el-col>
    </el-row>
</template>

<script>
import { userGet, userPolicyList } from '@/api/data'

export default {
    name: 'overview-view',
    data () {
        return {
            size: "medium",
            contentStyle: {
                'text-align': 'center'
            },
            labelStyle: {
                'text-align': 'center',
                'width': '30%'
            },
            userImg: require('../../assets/logo.png'),
            userInfo: null,
            policyList: null,
            uId: null
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            this.$store.commit('getUser')
            this.uId = this.$store.state.user.uId
            var param = {
                uid: this.uId,
            }
            await userGet(param).then(res => {
                if (res.data.code == 0) {
                    this.userInfo = res.data.data
                }
            })
            param = {
                uid: this.uId,
                limit: 1000
            }
            await userPolicyList(param).then(res => {
                if (res.data.code == 0) {
                    this.policyList = res.data.data.list
                }
            })
        }
    },
    computed: {
        totalPAmount() {
            var total = 0
            for (var p in this.policyList) {
                total += p.pamount
                console.log(p.pamount)
            }
            return total
        }
    }
}
</script>

<style lang="less" scoped>
    .name{
        font-size: 30px;
    }
    .role{
        font-size: 25px;
    }
    .userImg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>
