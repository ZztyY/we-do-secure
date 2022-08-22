<template>
    <div>
        <el-descriptions class="Info" title="homePolicy" :column="1" :size="size" border>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    policy start date
                </template>
                {{ homePolicyInfo.START_DATE }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    policy end date
                </template>
                {{ homePolicyInfo.END_DATE }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-coin"></i>
                    policy amount
                </template>
                ${{ homePolicyInfo.pAMOUNT }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-info"></i>
                    policy status
                </template>
                <p v-if="homePolicyInfo.pSTATUS === 'C'" style="color: green">CURRENT</p>
                <p v-else style="color: red">EXPIRED</p>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>

export default {
    name: 'home-policy-detail-view',
    data () {
        return {
            userImg: require('../../../assets/user.png'),
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
        console.log(this.$route.params.id)
    },
    computed: {
        homePolicyInfo() {
            return {
                pID: 16348123,
                START_DATE: '2010/07/22',
                END_DATE: '2020/7/22',
                pAMOUNT: 4000,
                pSTATUS: 'P',
                pTYPE: 'H',
                cID: 1
            }
        },
        pID() {
            return this.$route.params.id
        }
    },
    methods: {
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
