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
            <div class="statistics" style="margin-top:20px;">
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
        <el-card shadow="hover">
            <div id="myChart" ref="myChart"></div>
        </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { userGet, userPolicyList } from '@/api/data';
import * as echarts from 'echarts';

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
            this.draw()
        },
        draw() {
            var myChart = echarts.init(this.$refs.myChart)
            myChart.setOption({
                series: [
                    {
                    type: 'pie',
                    data: [
                        {
                        value: this.autoPAmount,
                        name: 'auto'
                        },
                        {
                        value: this.homePAmount,
                        name: 'home'
                        }
                    ]
                    }
                ]
            })
        }
    },
    computed: {
        totalPAmount() {
            var total = 0
            for (var key in this.policyList) {
                total += this.policyList[key].pamount
            }
            return total
        },
        autoPAmount() {
            var auto = 0
            for (var key in this.policyList) {
                if (this.policyList[key].ptype === "A") {
                    auto += this.policyList[key].pamount
                }
            }
            return auto
        },
        homePAmount() {
            var home = 0
            for (var key in this.policyList) {
                if (this.policyList[key].ptype === "H") {
                    home += this.policyList[key].pamount
                }
            }
            return home
        }
    }
}
</script>

<style lang="less" scoped>
    #myChart {
        width: 90%;
        height: 300px;
    }
    .name {
        font-size: 30px;
    }
    .role {
        font-size: 25px;
    }
    .userImg {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>
