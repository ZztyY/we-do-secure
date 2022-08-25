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

        <div v-if="paymentList">
            <el-divider content-position="left">payment history</el-divider>
            <el-row :gutter="20" v-for="(row, index) in sliceList(paymentList, 2)" :key="index">
                <el-col :span="8" style="margin-top: 20px;" v-for="(item, i) in row" :key="i">
                    <el-card shadow="hover" :class="'payment'+ i">
                        <div>
                            <i class="el-icon-coin"></i>
                            <span> ${{ item.pamount }} </span>
                        </div>
                        <el-divider></el-divider>
                        <div>
                            <p>pay date: {{ item.pdate }}</p>
                            <p>pay method: {{ item.pmethod }}</p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-dialog
        title="make payment"
        :visible.sync="dialogVisible"
        width="50%">
            <el-form v-if="invoiceInfo" :model="form" status-icon ref="form" label-width="200px">
                <el-form-item label="amount" prop="pAmount">
                    <el-input-number v-model="form.pAmount" :precision="2" :step="0.1" :min="1" :max="invoiceInfo.amount_left"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">submit</el-button>
                    <el-button @click="reset('form')">reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { makePayment, invoiceInfo, paymentList } from '@/api/data';

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
            paymentList: null,
            iId: null,
            uId: null,
            dialogVisible: false,
            form: {}
        }
    },
    mounted() {
        this.$store.commit('getUser')
        this.uId = this.$store.state.user.uId
        this.iId = this.$route.params.id
        var param = {
            iid: this.iId
        }
        invoiceInfo(param).then(res => {
            if (res.data.code == 0) {
                this.invoiceInfo = res.data.data
            }
        })
        paymentList(param).then(res => {
            if (res.data.code == 0) {
                this.paymentList = res.data.data.list
            }
        })
    },
    computed: {
    },
    methods: {
        sliceList(data, count) {
            if (data != undefined) {
                let index = 0;
                let tempArr = [];
                for (let i = 0; i< data.length; i++) {
                    index = parseInt(i / count);
                    if (tempArr.length <= index) {
                        tempArr.push([]);
                    }
                    tempArr[index].push(data[i]);
                }
                return tempArr
            }
        },
        submitForm() {
            var param = new FormData()
            for (var key in this.form) {
                param.append(key, this.form[key])
            }
            param.append('uid', this.uId)
            param.append('iid', this.iId)
            makePayment(param).then(res => {
                if (res.data.code == 0) {
                    this.dialogVisible = false
                    this.$message('pay success');
                    var param = {
                        iid: this.iId
                    }
                    invoiceInfo(param).then(res => {
                        if (res.data.code == 0) {
                            this.invoiceInfo = res.data.data
                        }
                    })
                    paymentList(param).then(res => {
                        if (res.data.code == 0) {
                            this.paymentList = res.data.data.list
                        }
                    })
                } else {
                    this.$message(res.data.message);
                    this.$refs.form.resetFields();
                }
            })
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
