<template>
    <el-descriptions class="Info" title="vehicle" :column="1" :size="size" border>
        <template slot="extra">
            <el-button type="primary" size="small">Edit</el-button>
        </template>
        <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
            <template slot="label">
                <i class="el-icon-user"></i>
                First Name
            </template>
            {{ userInfo.fName }}
        </el-descriptions-item>
        <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
            <template slot="label">
                <i class="el-icon-user"></i>
                Last Name
            </template>
            {{ userInfo.lName }}
        </el-descriptions-item>
        <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
            <template slot="label">
                <i class="el-icon-position"></i>
                Street
            </template>
            {{ userInfo.street }}
        </el-descriptions-item>
        <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
            <template slot="label">
                <i class="el-icon-position"></i>
                City
            </template>
            {{ userInfo.city }}
        </el-descriptions-item>
        <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
            <template slot="label">
                <i class="el-icon-position"></i>
                State
            </template>
            {{ userInfo.state }}
        </el-descriptions-item>
        <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
            <template slot="label">
                <i class="el-icon-position"></i>
                Zipcode
            </template>
            {{ userInfo.zipcode }}
        </el-descriptions-item>
        <el-descriptions-item :labelStyle="labelStyle" :contentStyle="contentStyle">
            <template slot="label">
                <i class="el-icon-male"></i>
                Gender
            </template>
            {{ userInfo.gender }}
        </el-descriptions-item>
        <el-descriptions-item :contentStyle="contentStyle">
            <template slot="label">
                <i class="el-icon-connection"></i>
                Marrital Status
            </template>
            {{ userInfo.mar_status }}
        </el-descriptions-item>
    </el-descriptions>
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
            }
        }
    },
    mounted() {
        console.log(this.$route.params.id)
    },
    computed: {
        userInfo() {
            return {
                fName: 'Tianyi',
                lName: 'Zheng',
                street: '33 Bond St',
                city: 'brooklyn',
                state: 'NY',
                zipcode: '11201',
                gender: 'male',
                mar_status: 'single'
            }
        },
        hID() {
            return this.$route.params.id
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
