<template>
    <div>
        <el-row :gutter="20" v-for="(row, index) in sliceList(vehicleList, 2)" :key="index">
            <el-col :span="8" style="margin-top: 20px;" v-for="(item, i) in row" :key="i">
                <div @click="toDetail(item.vin)">
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
    </div>
</template>

<script>

export default {
    name: 'vehicle-view',
    data () {
        return {
        }
    },
    mounted() {
    },
    computed: {
        vehicleList(){
            return [
            {
                vin: 'JH4DC4340RS000837',
                vmmyear: '2019',
                vstatus: 'lease'
            },
            {
                vin: 'JH4DC4340RS000838',
                vmmyear: '2002',
                vstatus: 'own'
            },
            {
                vin: 'JH4DC4340RS000838',
                vmmyear: '2002',
                vstatus: 'own'
            },
            {
                vin: 'JH4DC4340RS000838',
                vmmyear: '2002',
                vstatus: 'own'
            },
            {
                vin: 'JH4DC4340RS000838',
                vmmyear: '2002',
                vstatus: 'own'
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
            this.$router.push({ name: 'vehicle-detail', params: { id }})
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