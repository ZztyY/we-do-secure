<template>
    <div>
        <el-row :gutter="20" v-for="(row, index) in sliceList(homeList, 2)" :key="index">
            <el-col :span="8" style="margin-top: 20px;" v-for="(item, i) in row" :key="i">
                <el-card shadow="hover" :class="'home'+ i">
                    <div style="display:flex; justify-content:space-between;">
                        <i class="el-icon-s-home"></i>
                        <span> ${{ item.PUR_VAL }} </span>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <p>Area: {{ item.hAREA}}</p>
                        <p>Home Type: {{ item.hTYPE}}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: 'home-view',
    data () {
        return {
        }
    },
    mounted() {
    },
    computed: {
        homeList(){
            return [
            {
                hID: 1,
                PUR_DATE: '2022/08/14',
                PUR_VAL: 1000000.00,
                hAREA: 300,
                hTYPE: 'S',
                hAFN: 0,
                hHSS: 0,
                hSP: null,
                hBM: 1
            },
            {
                hID: 2,
                PUR_DATE: '2022/08/14',
                PUR_VAL: 1000000.00,
                hAREA: 300,
                hTYPE: 'S',
                hAFN: 0,
                hHSS: 0,
                hSP: null,
                hBM: 1
            },
            {
                hID: 3,
                PUR_DATE: '2022/08/14',
                PUR_VAL: 1000000.00,
                hAREA: 300,
                hTYPE: 'S',
                hAFN: 0,
                hHSS: 0,
                hSP: null,
                hBM: 1
            },
            {
                hID: 4,
                PUR_DATE: '2022/08/14',
                PUR_VAL: 1000000.00,
                hAREA: 300,
                hTYPE: 'S',
                hAFN: 0,
                hHSS: 0,
                hSP: null,
                hBM: 1
            },
            {
                hID: 5,
                PUR_DATE: '2022/08/14',
                PUR_VAL: 1000000.00,
                hAREA: 300,
                hTYPE: 'S',
                hAFN: 0,
                hHSS: 0,
                hSP: null,
                hBM: 1
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