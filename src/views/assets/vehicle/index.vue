<template>
    <div>
        <el-button @click="dialogVisible=true" type="primary">new</el-button>
        <el-row :gutter="20" v-for="(row, index) in sliceList(vehicleList, 2)" :key="index">
            <el-col :span="8" style="margin-top: 20px;" v-for="(item, i) in row" :key="i">
                <div @click="toDetail(item.vid)">
                    <el-card shadow="hover" :class="'vehicle'+ i">
                        <div>
                            <i class="el-icon-bicycle"></i>
                            <span> {{ item.vin }} </span>
                        </div>
                        <el-divider></el-divider>
                        <div>
                            <p>Vehicle make model year: {{ item.vmmyear }}</p>
                            <p>Vehicle status: {{ item.vstatus }}</p>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>

        <el-dialog
        title="edit vehicle"
        :visible.sync="dialogVisible"
        width="30%">
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
    </div>
</template>

<script>
import { vehicleList, editVehicle } from '@/api/data'

export default {
    name: 'vehicle-view',
    data () {
        return {
            uId: null,
            vehicleList: null,
            dialogVisible: false,
            form: {

            }
        }
    },
    mounted() {
        this.$store.commit('getUser')
        this.uId = this.$store.state.user.uId
        var param = {
            uid: this.uId
        }
        vehicleList(param).then(res => {
            if (res.data.code == 0) {
                this.vehicleList = res.data.data.list
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
        toDetail(id) {
            this.$router.push({ name: 'vehicle-detail', params: { id }})
        },
        submitForm() {
            this.dialogVisible = false
            var param = new FormData()
            for (var key in this.form) {
                param.append(key, this.form[key])
            }
            param.append('uid', this.uId)
            editVehicle(param).then(res => {
                if (res.data.code == 0) {
                    this.$message('create vehicle success');
                    var param = {
                        uid: this.uId
                    }
                    vehicleList(param).then(res => {
                        if (res.data.code == 0) {
                            this.vehicleList = res.data.data.list
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
</style>