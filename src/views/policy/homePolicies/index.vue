<template>
    <div>
        <div v-if="homePoliciesList">
            <el-row :gutter="20" v-for="(row, index) in sliceList(homePoliciesList, 2)" :key="index">
                <el-col :span="8" style="margin-top: 20px;" v-for="(item, i) in row" :key="i">
                    <div @click="toDetail(item.pid)">
                        <el-card shadow="hover" :class="'homePolicies'+ i">
                            <div style="display:flex; justify-content:space-between;">
                                <i class="el-icon-document"></i>
                                <span> #{{ item.pid }} </span>
                            </div>
                            <el-divider></el-divider>
                            <div>
                                <p>Policy Amount: ${{ item.pamount}}</p>
                                <p v-if="item.pstatus === 'C'" style="color: green">CURRENT</p>
                                <p v-else style="color: red">EXPIRED</p>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-empty v-else description="no policies yet"></el-empty>
    </div>
</template>

<script>
import { userPolicyList } from '@/api/data'

export default {
    name: 'home-policies-view',
    data () {
        return {
            homePoliciesList: null,
            count: null,
            uId: null
        }
    },
    mounted() {
        this.$store.commit('getUser')
        this.uId = this.$store.state.user.uId
        var param = {
            uid: this.uId,
            ptype: 'H'
        }
        userPolicyList(param).then(res => {
            if (res.data.code == 0) {
                this.homePoliciesList = res.data.data.list
                this.count = res.data.data.count
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
            this.$router.push({ name: 'home-policies-detail', params: { id }})
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
