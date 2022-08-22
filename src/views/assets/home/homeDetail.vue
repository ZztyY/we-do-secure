<template>
    <div>
        <el-descriptions class="Info" title="home" :column="1" :size="size" border>
            <template slot="extra">
                <el-button @click="dialogVisible = true" type="primary" size="small">Edit</el-button>
            </template>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    purchase date
                </template>
                {{ homeInfo.PUR_DATE }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-coin"></i>
                    purchase value
                </template>
                {{ homeInfo.PUR_VAL }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-location"></i>
                    home area
                </template>
                {{ homeInfo.hAREA }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-house"></i>
                    home type
                </template>
                {{ homeInfo.hTYPE }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-bell"></i>
                    has auto fire notification
                </template>
                {{ homeInfo.hAFN }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-monitor"></i>
                    has home security system
                </template>
                {{ homeInfo.hHSS }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-ship"></i>
                    has swimming pool
                </template>
                {{ homeInfo.hSP }}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-lock"></i>
                    has basement
                </template>
                {{ homeInfo.hBM }}
            </el-descriptions-item>
        </el-descriptions>

        <!-- edit home dialog -->
        <el-dialog
        title="edit home"
        :visible.sync="dialogVisible"
        width="30%">
            <el-form :model="form" status-icon ref="form" label-width="200px">
                <el-form-item label="purchase date" prop="PUR_DATE">
                    <el-date-picker type="date" placeholder="choose date" v-model="form.PUR_DATE" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="purchase value" prop="PUR_VAL">
                    <el-input v-model="form.PUR_VAL"></el-input>
                </el-form-item>
                <el-form-item label="home area" prop="hAREA">
                    <el-input v-model="form.hAREA"></el-input>
                </el-form-item>
                <el-form-item label="home type" prop="hTYPE">
                    <el-select v-model="form.hTYPE" placeholder="choose your home type">
                        <el-option label="single family" value="S"></el-option>
                        <el-option label="multi family" value="M"></el-option>
                        <el-option label="condominium" value="C"></el-option>
                        <el-option label="town house" value="T"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has auto fire notification" prop="hAFN">
                    <el-switch v-model="form.hAFN"></el-switch>
                </el-form-item>
                <el-form-item label="has home security system" prop="hHSS">
                    <el-switch v-model="form.hHSS"></el-switch>
                </el-form-item>
                <el-form-item label="has swimming pool" prop="hSP">
                    <el-select v-model="form.hSP" placeholder="choose your swimming pool type">
                        <el-option label="under ground" value="U"></el-option>
                        <el-option label="over ground" value="O"></el-option>
                        <el-option label="indoor" value="I"></el-option>
                        <el-option label="multiple" value="M"></el-option>
                        <el-option label="no" value=null></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="has home security system" prop="hBM">
                    <el-switch v-model="form.hBM"></el-switch>
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
            form: {

            }
        }
    },
    mounted() {
        console.log(this.$route.params.id)
    },
    computed: {
        homeInfo() {
            return {
                hID: 1,
                PUR_DATE: '2022/08/14',
                PUR_VAL: 1000000.00,
                hAREA: 300,
                hTYPE: 'S',
                hAFN: 0,
                hHSS: 0,
                hSP: null,
                hBM: 1
            }
        },
        hID() {
            return this.$route.params.id
        }
    },
    methods: {
        submitForm() {
            console.log(this.form)
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
