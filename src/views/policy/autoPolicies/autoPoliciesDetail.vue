<template>
    <div>
        <el-descriptions v-if="autoPolicyInfo" class="Info" title="autoPolicy" :column="1" :size="size" border>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    policy start date
                </template>
                {{ autoPolicyInfo.start_date }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    policy end date
                </template>
                {{ autoPolicyInfo.end_date }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-coin"></i>
                    policy amount
                </template>
                ${{ autoPolicyInfo.pamount }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-info"></i>
                    policy status
                </template>
                <p v-if="autoPolicyInfo.pstatus === 'C'" style="color: green">CURRENT</p>
                <p v-else style="color: red">EXPIRED</p>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
import { policyInfo } from '@/api/data';

export default {
    name: 'auto-policy-detail-view',
    data () {
        return {
            userImg: require('../../../assets/user.png'),
            size: "medium",
            contentStyle: {
                'text-align': 'center'
            },
            labelStyle: {
                'width': '30%'
            },
            autoPolicyInfo: null,
            pId: null
        }
    },
    mounted() {
        this.pId = this.$route.params.id
        var param = {
                pid: this.pId
            }
            policyInfo(param).then(res => {
                if (res.data.code == 0) {
                    this.autoPolicyInfo = res.data.data
                }
            })
    },
    computed: {
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
