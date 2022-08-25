<template>
    <div>
        <el-descriptions v-if="homeInfo" class="Info" title="home" :column="1" :size="size" border>
            <template slot="extra">
                <el-button @click="dialogVisible = true" type="primary" size="small">Edit</el-button>
                <el-button @click="purchaseDialogVisible = true" type="primary" size="small">buy policy</el-button>
            </template>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    purchase date
                </template>
                {{ homeInfo.pur_date }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-coin"></i>
                    purchase value
                </template>
                {{ homeInfo.pur_val }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-location"></i>
                    home area
                </template>
                {{ homeInfo.harea }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-house"></i>
                    home type
                </template>
                {{ homeInfo.htype }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-bell"></i>
                    has auto fire notification
                </template>
                {{ homeInfo.hafn }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-monitor"></i>
                    has home security system
                </template>
                {{ homeInfo.hhss }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-ship"></i>
                    has swimming pool
                </template>
                {{ homeInfo.hsp }}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-lock"></i>
                    has basement
                </template>
                {{ homeInfo.hbm }}
            </el-descriptions-item>
        </el-descriptions>

        <!-- edit home dialog -->
        <el-dialog
        title="edit home"
        :visible.sync="dialogVisible"
        width="50%">
            <el-form :model="form" status-icon ref="form" label-width="200px">
                <el-form-item label="purchase date" prop="pur_date">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="choose date" v-model="form.pur_date" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="purchase value" prop="pur_val">
                    <el-input v-model="form.pur_val"></el-input>
                </el-form-item>
                <el-form-item label="home area" prop="harea">
                    <el-input v-model="form.harea"></el-input>
                </el-form-item>
                <el-form-item label="home type" prop="htype">
                    <el-select v-model="form.htype" placeholder="choose your home type">
                        <el-option label="single family" value="S"></el-option>
                        <el-option label="multi family" value="M"></el-option>
                        <el-option label="condominium" value="C"></el-option>
                        <el-option label="town house" value="T"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has auto fire notification" prop="hafn">
                    <el-switch active-value="1" inactive-value="0" v-model="form.hafn"></el-switch>
                </el-form-item>
                <el-form-item label="has home security system" prop="hhss">
                    <el-switch active-value="1" inactive-value="0" v-model="form.hhss"></el-switch>
                </el-form-item>
                <el-form-item label="has swimming pool" prop="hsp">
                    <el-select v-model="form.hsp" placeholder="choose your swimming pool type">
                        <el-option label="under ground" value="U"></el-option>
                        <el-option label="over ground" value="O"></el-option>
                        <el-option label="indoor" value="I"></el-option>
                        <el-option label="multiple" value="M"></el-option>
                        <el-option label="no" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has basement" prop="hbm">
                    <el-switch active-value="1" inactive-value="0" v-model="form.hbm"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">submit</el-button>
                    <el-button @click="reset('form')">reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- buy policy dialog -->
        <el-dialog
        title="purchase home policy"
        :visible.sync="purchaseDialogVisible"
        width="50%">
            <el-form :model="buyForm" status-icon ref="buyForm" label-width="200px">
                <el-form-item label="policy start date" prop="start_date">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="choose date" v-model="buyForm.start_date" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="policy duration" prop="months">
                    <el-input-number v-model="buyForm.months" @change="handleChange" :min="1" :max="120"></el-input-number>
                </el-form-item>
                <el-form-item label="policy amount" prop="pamount">
                    <el-input v-model="buyForm.pamount" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitBuyForm">submit</el-button>
                    <el-button @click="reset('buyForm')">reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { homeDetail, homeAdd, editPol } from '@/api/data';

export default {
    name: 'home-detail-view',
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
            dialogVisible: false,
            purchaseDialogVisible: false,
            form: {},
            buyForm: {},
            homeInfo: null,
            hID: null,
            uId: null
        }
    },
    mounted() {
        this.getHomeDetail()
    },
    computed: {
    },
    methods: {
        submitForm() {
            var param = new FormData()
            for (var key in this.form) {
                param.append(key, this.form[key])
            }
            param.append('uid', this.uId)
            param.append('hid', this.hID)
            homeAdd(param).then(res => {
                if (res.data.code == 0) {
                    this.dialogVisible = false
                    this.$message('edit success');
                    var param = {
                        hid: this.hID
                    }
                    homeDetail(param).then(res => {
                        if (res.data.code == 0) {
                            this.homeInfo = res.data.data
                        }
                    })
                } else {
                    this.$message(res.data.message);
                    this.$refs.form.resetFields();
                }
            })
        },
        submitBuyForm() {
            var param = new FormData()
            for (var key in this.buyForm) {
                param.append(key, this.buyForm[key])
            }
            param.append('uid', this.uId)
            param.append('ptype', 'H')
            param.append('hid', this.hID)
            editPol(param).then(res => {
                if (res.data.code == 0) {
                    this.purchaseDialogVisible = false
                    this.$message('purchase success');
                } else {
                    this.$message(res.data.message);
                    this.$refs.buyForm.resetFields();
                }
            })
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        async getHomeDetail() {
            this.$store.commit('getUser')
            this.uId = this.$store.state.user.uId
            this.hID = this.$route.params.id
            var param = {
                hid: this.hID
            }
            await homeDetail(param).then(res => {
                if (res.data.code == 0) {
                    this.homeInfo = res.data.data
                }
            })
        },
        handleChange(value) {
            this.buyForm.pamount = 10*value
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
