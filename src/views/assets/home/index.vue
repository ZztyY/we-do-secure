<template>
    <div>
        <el-button @click="dialogVisible=true" type="primary">new</el-button>
        <el-row :gutter="20" v-for="(row, index) in sliceList(homeList, 2)" :key="index">
            <el-col :span="8" style="margin-top: 20px;" v-for="(item, i) in row" :key="i">
                <div @click="toDetail(item.hid)">
                    <el-card shadow="hover" :class="'home'+ i">
                        <div style="display:flex; justify-content:space-between;">
                            <i class="el-icon-s-home"></i>
                            <span> ${{ item.pur_val }} </span>
                        </div>
                        <el-divider></el-divider>
                        <div>
                            <p>Area: {{ item.harea }}</p>
                            <p>Home Type: {{ item.htype }}</p>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>

        <el-dialog
        title="edit home"
        :visible.sync="dialogVisible"
        width="30%">
            <el-form :model="form" status-icon ref="form" label-width="200px">
                <el-form-item label="purchase date" prop="pur_date">
                    <el-date-picker type="date" v-model="form.pur_date" placeholder="choose date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
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
                <el-form-item label="has home security system" prop="hbm">
                    <el-switch active-value="1" inactive-value="0" v-model="form.hbm"></el-switch>
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
import { homeList, homeAdd } from '@/api/data';

export default {
    name: 'home-view',
    data () {
        return {
            uId:null,
            homeList: null,
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
        homeList(param).then(res => {
            if (res.data.code == 0) {
                this.homeList = res.data.data.list
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
            this.$router.push({ name: 'home-detail', params: { id }})
        },
        submitForm() {
            this.dialogVisible = false
            var param = new FormData()
            for (var key in this.form) {
                param.append(key, this.form[key])
            }
            param.append('uid', this.uId)
            homeAdd(param).then(res => {
                if (res.data.code == 0) {
                    this.$message('create home success');
                    var param = {
                        uid: this.uId
                    }
                    homeList(param).then(res => {
                        if (res.data.code == 0) {
                            this.homeList = res.data.data.list
                        }
                    })
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