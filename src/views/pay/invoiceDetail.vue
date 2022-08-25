<template>
    <div>
        <el-descriptions v-if="invoiceInfo" class="Info" title="invoice" :column="1" :size="size" border>
            <template slot="extra">
                <el-button v-if="invoiceInfo.status === 'C'" @click="dialogVisible = true" type="primary" size="small">pay</el-button>
                <el-button v-else type="primary" size="small" disabled>pay</el-button>
            </template>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    invoice due date
                </template>
                {{ invoiceInfo.iduedate }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    invoice amount
                </template>
                ${{ invoiceInfo.iamount }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-coin"></i>
                    amount left to pay
                </template>
                ${{ invoiceInfo.amount_left }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-info"></i>
                    invoice status
                </template>
                <p v-if="invoiceInfo.status === 'C'" style="color: green">CURRENT</p>
                <p v-else style="color: red">EXPIRED</p>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
import { invoiceInfo } from '@/api/data';

export default {
    name: 'invoice-detail-view',
    data () {
        return {
            size: "medium",
            contentStyle: {
                'text-align': 'center'
            },
            labelStyle: {
                'width': '30%'
            },
            invoiceInfo: null,
            iId: null,
            dialogVisible: false,
            form: {}
        }
    },
    mounted() {
        this.iId = this.$route.params.id
        var param = {
                iid: this.iId
            }
            invoiceInfo(param).then(res => {
                if (res.data.code == 0) {
                    this.invoiceInfo = res.data.data
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
