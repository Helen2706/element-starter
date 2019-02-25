<template>
    <div id="college-home-page">
        <!--走马灯-->
        <div id="carousel">
            <el-carousel height="330px">
                    <el-carousel-item v-for="carousel in carouselList" :key="carousel.id" class="bgStyle" :style="{background: 'url('+carousel.imageUrl+') no-repeat'}">
                        <router-link :to="carousel.url">
                        <h3>{{ carousel.title }}</h3>
                        </router-link>
                    </el-carousel-item>
            </el-carousel>
        </div>
        <!--主页新闻通知等内容-->
        <div id="content">
            <div id="newsList">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>学院要闻</span>
                        <el-button style="float:right;padding:3px 0" type="text">更多>></el-button>
                    </div>
                    <div v-for="news in newsList" :key="news.id" class="text item">
                        <span>{{news.title}}</span>
                        <span style="float: right">{{convertMilliToDate(news.createTime)}}</span>
                    </div>
                </el-card>
            </div>
            <div id="newsList2">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>学院要闻</span>
                        <el-button style="float:right;padding:3px 0" type="text">更多>></el-button>
                    </div>
                    <div v-for="news in newsList" :key="news.id" class="text item">
                        <span>{{news.title}}</span>
                        <span style="float: right">{{convertMilliToDate(news.createTime)}}</span>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CollegeHomePage",
        data() {
            return {
                carouselList:[{url:'',title:'',url:'',imgUrl:''}],                    //轮播图数据
                newsList:[]
            }
        },
        mounted(){
            this.getCarouselList();
            this.getNewsList();
        },
        methods: {
            /*获取轮播图列表数据*/
            getCarouselList() {
                this.axios.get('http://localhost:8088/carousel/list').then(
                    body => {
                        this.carouselList = body.data;
                        for(var carousel of this.carouselList){
                            carousel.imageUrl = 'static/'+carousel.image;
                        }
                        console.log('carouselList',this.carouselList);
                    }
                );
            },
            /*获取新闻列表数据*/
            getNewsList(){
                this.axios.get('http://localhost:8088/news/list').then(
                    body => {
                        this.newsList = body.data;
                    }
                );
            },
            convertMilliToDate(time){
                if(time!=null&&time!='') {
                    var localTime = new Date(time).toLocaleString();
                    var i = localTime.indexOf(' ');
                    return localTime.substring(0,i);
                }
                return '';
            }
        }

    }
</script>

<style scoped>
    #college-home-page #carousel {
        width: 100%;
        height: 330px;
        background-color: #cdd8e4;
    }

    .el-carousel__item h3 {
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        width: 500px;
        margin: auto;
        margin-top: 270px;
        background-color: rgba(33, 33, 33, 0.8);
    }
    .bgStyle{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-size:900px 330px !important;
    }
    #college-home-page #content{
        margin-top: 10px;
    }
    #college-home-page #newsList{
        margin-left: 10px;
        width:435px;
        display: inline-block;
    }
    #college-home-page #newsList2{
        margin-right: 10px;
        width:435px;
        float: right;
    }
    #college-home-page .item{
        height:35px;
        font-size: 10px;
        border-bottom:1px dashed #545c64;
        line-height: 35px;
        padding: 2px;
    }
    #college-home-page .el-card__body{
        padding-top:0;
    }
</style>