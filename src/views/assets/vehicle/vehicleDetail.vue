<template>
    <div>
        <el-descriptions class="Info" title="vehicle" :column="1" :size="size" border>
            <template slot="extra">
                <el-button @click="dialogVisible = true" type="primary" size="small">Edit</el-button>
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

        <!-- edit home dialog -->
        <el-dialog
        title="edit vehicle"
        :visible.sync="dialogVisible"
        width="30%">
            <el-form :model="form" status-icon ref="form" label-width="200px">
                <el-form-item label="VIN" prop="vin">
                    <el-input v-model="form.vin"></el-input>
                </el-form-item>
                <el-form-item label="make model year" prop="vmmyear">
                    <el-date-picker v-model="form.vmmyear" type="year" placeholder="choose a year"></el-date-picker>
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
    </div>
</template>

<script>

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
            form: {

            }
        }
    },
    mounted() {
        console.log(this.$route.params.id)
    },
    computed: {
        vehicleInfo() {
            return {
                vin: 'JH4DC4340RS000837',
                vmmyear: '2019',
                vstatus: 'lease'
            }
        },
        vID() {
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
