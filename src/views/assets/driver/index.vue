<template>
    <div>
        <el-descriptions v-if="driverInfo" class="Info" title="driver" :column="1" :size="size" border>
            <template slot="extra">
                <el-button @click="dialogVisible = true" type="primary" size="small">Edit</el-button>
            </template>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-user"></i>
                    first name
                </template>
                {{ driverInfo.fName }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-user"></i>
                    last name
                </template>
                {{ driverInfo.lName }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-info"></i>
                    driver license
                </template>
                {{ driverInfo.lNum }}
            </el-descriptions-item>
            <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
                <template slot="label">
                    <i class="el-icon-date"></i>
                    birth date
                </template>
                {{ driverInfo.birth }}
            </el-descriptions-item>
        </el-descriptions>

        <!-- edit home dialog -->
        <el-dialog
        title="edit driver"
        :visible.sync="dialogVisible"
        width="50%">
            <el-form :model="form" status-icon ref="form" label-width="200px">
                <el-form-item label="first name" prop="fName">
                    <el-input v-model="form.fName"></el-input>
                </el-form-item>
                <el-form-item label="last name" prop="lName">
                    <el-input v-model="form.lName"></el-input>
                </el-form-item>
                <el-form-item label="license" prop="lNum">
                    <el-input v-model="form.lNum"></el-input>
                </el-form-item>
                <el-form-item label="birth date" prop="birth">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="choose date" v-model="form.birth" style="width: 100%;"></el-date-picker>
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
import { driverInfo, editDriver } from '@/api/data';

export default {
    name: 'driver-view',
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

            },
            driverInfo: null,
            vId: null,
            dId: null
        }
    },
    mounted() {
        this.getDriverDetail()
    },
    computed: {
    },
    methods: {
        submitForm() {
            var param = new FormData()
            for (var key in this.form) {
                param.append(key, this.form[key])
            }
            param.append('vid', this.vId)
            param.append('did', this.dId)
            editDriver(param).then(res => {
                if (res.data.code == 0) {
                    this.dialogVisible = false
                    this.$message('edit success');
                    var param = {
                        did: this.dId
                    }
                    driverInfo(param).then(res => {
                        if (res.data.code == 0) {
                            this.driverInfo = res.data.data
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
        },
        async getDriverDetail() {
            this.dId = this.$route.params.did
            this.vId = this.$route.params.vid
            var param = {
                did: this.dId
            }
            await driverInfo(param).then(res => {
                if (res.data.code == 0) {
                    this.driverInfo = res.data.data
                }
            })
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
