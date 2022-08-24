<template>
    <el-row class="user" :gutter="20">
            <el-col :span="8" style="margin-top: 20px">
                <el-card shadow="hover">
                    <p style="font-size: 25px">invoices</p>
                    <el-divider></el-divider>
                    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto; height:400px;">
                        <li v-for="i in invoices" class="infinite-list-item" :key="i.iID">{{ i }}</li>
                    </ul>
                </el-card>
            </el-col>
            <el-col :span="8" style="margin-top: 20px;">
                <p>payment information</p>
                <el-card shadow="hover" style="margin-top: 50px;">
                    <div class="paymentMethod">
                        <p class="pay">
                            <span class="pay-text">payment method</span>
                            <el-button type="primary" class="pay-button" round> update payment</el-button>
                        </p>
                        <p>
                            Visa, **** **** **** 5837
                        </p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
</template>

<script>

export default {
    name: 'pay-view',
    data () {
        return {
            invoices: [
                {
                    iID: 1,
                    iDueDate: '2010/07/22',
                    iAMOUNT: 4000,
                    pID: 40
                },
                {
                    iID: 2,
                    iDueDate: '2023/07/21',
                    iAMOUNT: 2000,
                    pID: 98
                },
                {
                    iID: 3,
                    iDueDate: '2023/07/21',
                    iAMOUNT: 5000,
                    pID: 113
                },
            ],
            count: 3,
        }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
        load() {
            if (this.invoices.length <= 20){
                this.count+=1
                this.invoices.push({
                    iID: this.count,
                    iDueDate: '2023/07/21',
                    iAMOUNT: 5000,
                    pID: 113
                })
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
    .pay{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .pay-text{
        font-size: 10px;
    }
    .pay-button{
        font-size: 10px;
    }
</style>
