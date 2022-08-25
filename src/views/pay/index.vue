<template>
    <div>
        <el-row class="user" :gutter="20">
            <el-col :span="8" style="margin-top: 20px">
                <el-card shadow="hover">
                    <p style="font-size: 25px">invoices</p>
                    <el-divider></el-divider>
                    <ul v-if="invoices" class="infinite-list" v-infinite-scroll="load" style="overflow:auto; height:550px;">
                        <li v-for="i in invoices" class="infinite-list-item" :key="i.iid">
                            <div @click="toDetail(i.iid)">
                                <el-card shadow="hover" :class="'autoPolicies'+ i.iid">
                                    <div style="display:flex; justify-content:space-between;">
                                        <i class="el-icon-document"></i>
                                        <span> #{{ i.iid }} </span>
                                    </div>
                                    <el-divider></el-divider>
                                    <div>
                                        <p>Due Amount: ${{ i.iamount }}</p>
                                        <p>Due Date: {{ i.iduedate }}</p>
                                    </div>
                                </el-card>
                            </div>
                        </li>
                    </ul>
                    <el-empty v-else description="no invoices yet"></el-empty>
                </el-card>
            </el-col>
            <el-col :span="8" style="margin-top: 20px;">
                <p>payment information</p>
                <el-card shadow="hover" style="margin-top: 50px;">
                    <div v-if="userInfo" class="paymentMethod">
                        <p class="pay">
                            <span class="pay-text">payment method</span>
                            <el-button @click="dialogVisible = true" type="primary" class="pay-button" round> update payment</el-button>
                        </p>
                        <p v-if="userInfo.p_method === 'Credit' || userInfo.p_method === 'Debit'">
                            Visa, **** **** **** {{ userInfo.p_account_num.slice(-4) }}
                        </p>
                        <p v-if="userInfo.p_method === 'Check'">
                            Check, **** **** {{ userInfo.p_account_num.slice(-4) }}
                        </p>
                        <p v-else>
                            update your payment method now
                        </p>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog
            title="update payment method"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form :model="form" status-icon ref="form" label-width="130px">
                <el-form-item label="pay method" prop="p_method">
                    <el-radio-group v-model="form.p_method" size="small">
                        <el-radio-button label="Credit"></el-radio-button>
                        <el-radio-button label="Debit"></el-radio-button>
                        <el-radio-button label="PayPal" disabled></el-radio-button>
                        <el-radio-button label="Check"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <div v-if="form.p_method === 'Credit' || form.p_method === 'Debit'">
                    <el-form-item label="card number" prop="p_account_num">
                        <el-input style="width:300px" v-model="form.p_account_num"></el-input>
                    </el-form-item>
                    <el-form-item label="Expiration Date" prop="expire_date">
                        <el-date-picker v-model="form.expire_date" type="month" value-formate="MM-yyyy"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="CVV" prop="cvv">
                        <el-input style="width:100px" v-model="form.cvv"></el-input>
                    </el-form-item>
                </div>
                <div v-if="form.p_method === 'Check'">
                    <el-form-item label="name on account" prop="p_account_name">
                        <el-input style="width:300px" v-model="form.p_account_name"></el-input>
                    </el-form-item>
                    <el-form-item label="routing number" prop="routing_num">
                        <el-input style="width:300px" v-model="form.routing_num"></el-input>
                    </el-form-item>
                    <el-form-item label="account number" prop="p_account_num">
                        <el-input style="width:300px" v-model="form.p_account_num"></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">submit</el-button>
                    <el-button @click="reset('form')">reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { userInvoiceList, userGet, updatePayment } from '@/api/data'

export default {
    name: 'pay-view',
    data () {
        return {
            invoices: null,
            userInfo: null,
            count: null,
            uId: null,
            dialogVisible: false,
            form: {}
        }
    },
    mounted() {
        this.init()
    },
    computed: {
    },
    methods: {
        async load() {
            // var param = {
            //     uid: this.uId,
            //     offset: this.offset,
            //     limit: 2
            // }
            // await userInvoiceList(param).then(res => {
            //     if (res.data.code == 0) {
            //         this.offset += 2
            //         for (var i in res.data.data.list) {
            //             this.invoices.push(i)
            //         }
            //     }
            // })
        },
        async init() {
            this.$store.commit('getUser')
            this.uId = this.$store.state.user.uId
            var param = {
                uid: this.uId,
            }
            await userInvoiceList(param).then(res => {
                if (res.data.code == 0) {
                    this.invoices = res.data.data.list
                    this.count = res.data.data.count
                }
            })
            await userGet(param).then(res => {
                if (res.data.code == 0) {
                    this.userInfo = res.data.data
                }
            })
        },
        toDetail(id) {
            this.$router.push({ name: 'invoice-detail', params: { id }})
        },
        submitForm() {
            var param = new FormData()
            for (var key in this.form) {
                param.append(key, this.form[key])
            }
            param.append('uid', this.uId)
            updatePayment(param).then(res => {
                if (res.data.code == 0) {
                    this.dialogVisible = false
                    this.$message('update success');
                    var param = {
                        uid: this.uId,
                    }
                    userGet(param).then(res => {
                        if (res.data.code == 0) {
                            this.userInfo = res.data.data
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
    .userImg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .pay{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .pay-text{
        font-size: 10px;
    }
    .pay-button{
        font-size: 10px;
    }
</style>
