<template>
    <div>
        <el-row :gutter="20" v-for="(row, index) in sliceList(homePoliciesList, 2)" :key="index">
            <el-col :span="8" style="margin-top: 20px;" v-for="(item, i) in row" :key="i">
                <div @click="toDetail(item.pID)">
                    <el-card shadow="hover" :class="'homePolicies'+ i">
                        <div style="display:flex; justify-content:space-between;">
                            <i class="el-icon-document"></i>
                            <span> #{{ item.pID }} </span>
                        </div>
                        <el-divider></el-divider>
                        <div>
                            <p>Policy Amount: ${{ item.pAMOUNT}}</p>
                            <p v-if="item.pSTATUS === 'C'" style="color: green">CURRENT</p>
                            <p v-else style="color: red">EXPIRED</p>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: 'home-policies-view',
    data () {
        return {
        }
    },
    mounted() {
    },
    computed: {
        homePoliciesList(){
            return [
            {
                pID: 16348123,
                START_DATE: '2010/07/22',
                END_DATE: '2020/7/22',
                pAMOUNT: 4000,
                pSTATUS: 'P',
                pTYPE: 'H',
                cID: 1
            },
            {
                pID: 16349999,
                START_DATE: '2010/07/22',
                END_DATE: '2024/7/22',
                pAMOUNT: 6000,
                pSTATUS: 'C',
                pTYPE: 'H',
                cID: 1
            },
            {
                pID: 18948123,
                START_DATE: '2010/07/22',
                END_DATE: '2020/7/22',
                pAMOUNT: 4000,
                pSTATUS: 'P',
                pTYPE: 'H',
                cID: 1
            },
            {
                pID: 16309123,
                START_DATE: '2010/07/22',
                END_DATE: '2020/7/22',
                pAMOUNT: 4000,
                pSTATUS: 'P',
                pTYPE: 'H',
                cID: 1
            },
            {
                pID: 16301723,
                START_DATE: '2010/07/22',
                END_DATE: '2020/7/22',
                pAMOUNT: 4000,
                pSTATUS: 'P',
                pTYPE: 'H',
                cID: 1
            }
            ]
        }
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
