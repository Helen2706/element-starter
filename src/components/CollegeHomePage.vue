<template>
    <div id="college-home-page">
        <!--走马灯-->
        <div id="carousel">
            <el-carousel height="300px">
                    <el-carousel-item v-for="item in 4" :key="item" :style="{background: 'url('+bgUrl+')'}">
                        <router-link to="/back">
                        <h3>{{ item }}</h3>
                        </router-link>
                    </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CollegeHomePage",
        data() {
            return {
                bgUrl:'static/1550967537952.jpg'
            }
        },
        methods: {}

    }
</script>

<style scoped>
    #college-home-page #carousel {
        width: 100%;
        height: 300px;
        background-color: #cdd8e4;
    }

    .el-carousel__item h3 {
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        width: 500px;
        margin: auto;
        margin-top: 240px;
        background-color: rgba(33, 33, 33, 0.8);
    }
</style>