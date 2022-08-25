<template>
    <div>
        <el-descriptions v-if="vehicleInfo" class="Info" title="vehicle" :column="1" :size="size" border>
            <template slot="extra">
                <el-button @click="dialogVisible = true" type="primary" size="small">Edit</el-button>
                <el-button @click="purchaseDialogVisible = true" type="primary" size="small">buy policy</el-button>
            </template>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-bicycle"></i>
                    vehicle identification number
                </template>
                {{ vehicleInfo.vin }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    vehicle make-model-year
                </template>
                {{ vehicleInfo.vmmyear }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-info"></i>
                    status of the vehicle
                </template>
                {{ vehicleInfo.vstatus }}
            </el-descriptions-item>
        </el-descriptions>

        <div v-if="driverList">
            <el-divider content-position="left">related drivers</el-divider>
            <el-button @click="driverDialogVisible=true" type="primary">new</el-button>
            <el-row :gutter="20" v-for="(row, index) in sliceList(driverList, 2)" :key="index">
                <el-col :span="8" style="margin-top: 20px;" v-for="(item, i) in row" :key="i">
                    <div @click="toDetail(item.did)">
                        <el-card shadow="hover" :class="'driver'+ i">
                            <div>
                                <i class="el-icon-user"></i>
                                <span> {{ item.lNum }} </span>
                            </div>
                            <el-divider></el-divider>
                            <div>
                                <p>first name: {{ item.fName }}</p>
                                <p>last name: {{ item.lName }}</p>
                                <p>birth date: {{ item.birth }}</p>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- edit home dialog -->
        <el-dialog
        title="edit vehicle"
        :visible.sync="dialogVisible"
        width="50%">
            <el-form :model="form" status-icon ref="form" label-width="200px">
                <el-form-item label="VIN" prop="vin">
                    <el-input v-model="form.vin"></el-input>
                </el-form-item>
                <el-form-item label="make model year" prop="vmmyear">
                    <el-date-picker v-model="form.vmmyear" value-format="yyyy" type="year" placeholder="choose a year"></el-date-picker>
                </el-form-item>
                <el-form-item label="status" prop="vstatus">
                    <el-select v-model="form.vstatus" placeholder="choose your vehicle status">
                        <el-option label="leased" value="L"></el-option>
                        <el-option label="financed" value="F"></el-option>
                        <el-option label="owned" value="O"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">submit</el-button>
                    <el-button @click="reset('form')">reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
        title="new driver"
        :visible.sync="driverDialogVisible"
        width="50%">
            <el-form :model="driverForm" status-icon ref="driverForm" label-width="200px">
                <el-form-item label="first name" prop="fName">
                    <el-input v-model="driverForm.fName"></el-input>
                </el-form-item>
                <el-form-item label="last name" prop="lName">
                    <el-input v-model="driverForm.lName"></el-input>
                </el-form-item>
                <el-form-item label="license" prop="lNum">
                    <el-input v-model="driverForm.lNum"></el-input>
                </el-form-item>
                <el-form-item label="birth date" prop="birth">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="choose date" v-model="driverForm.birth" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitDriverForm">submit</el-button>
                    <el-button @click="reset('driverForm')">reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- buy policy dialog -->
        <el-dialog
        title="purchase auto policy"
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
import { editVehicle, vehicleInfo, vehicleDriverList, editDriver, editPol } from '@/api/data';


export default {
    name: 'vehicle-detail-view',
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
            driverDialogVisible: false,
            purchaseDialogVisible: false,
            form: {},
            buyForm: {},
            driverForm: {

            },
            vId: null,
            uId: null,
            vehicleInfo: null,
            driverList: null
        }
    },
    mounted() {
        this.getVehicleDetail()
        this.getDriverList()
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
            param.append('vid', this.vId)
            editVehicle(param).then(res => {
                if (res.data.code == 0) {
                    this.dialogVisible = false
                    this.$message('edit success');
                    var param = {
                        vid: this.vId
                    }
                    vehicleInfo(param).then(res => {
                        if (res.data.code == 0) {
                            this.vehicleInfo = res.data.data
                        }
                    })
                } else {
                    this.$message(res.data.message);
                    this.$refs.form.resetFields();
                }
            })
        },
        submitDriverForm() {
            var param = new FormData()
            for (var key in this.driverForm) {
                param.append(key, this.driverForm[key])
            }
            param.append('vid', this.vId)
            editDriver(param).then(res => {
                if (res.data.code == 0) {
                    this.driverDialogVisible = false
                    this.$message('create success');
                    var param = {
                        vid: this.vId
                    }
                    vehicleDriverList(param).then(res => {
                        if (res.data.code == 0) {
                            this.driverList = res.data.data
                        }
                    })
                } else {
                    this.$message(res.data.message);
                    this.$refs.driverForm.resetFields();
                }
            })
        },
        submitBuyForm() {
            var param = new FormData()
            for (var key in this.buyForm) {
                param.append(key, this.buyForm[key])
            }
            param.append('uid', this.uId)
            param.append('ptype', 'A')
            param.append('vid', this.vId)
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
        async getVehicleDetail() {
            this.$store.commit('getUser')
            this.uId = this.$store.state.user.uId
            this.vId = this.$route.params.id
            var param = {
                vid: this.vId
            }
            await vehicleInfo(param).then(res => {
                if (res.data.code == 0) {
                    this.vehicleInfo = res.data.data
                }
            })
        },
        async getDriverList() {
            var param = {
                vid: this.vId
            }
            await vehicleDriverList(param).then(res => {
                if (res.data.code == 0) {
                    this.driverList = res.data.data
                }
            })
        },
        toDetail(id) {
            this.$router.push({ name: 'driver-detail', params: { 
                did: id,
                vid: this.vId}})
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
