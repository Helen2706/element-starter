<template>
    <div id="college-website">
        <el-container style="min-height: 100vh">
            <el-header>
                <div id="header-title">
                    <div id="hasParent" v-if="basicSetting.hasParent">
                        <el-row>
                            <el-col :span="3">
                                <div class="logo">
                                    <img :src="basicSetting.currentPicture" alt="">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div id="parent-title">
                                    <span>{{basicSetting.parentName}}</span>
                                </div>
                            </el-col>
                            <el-col :span="9">
                                <div class="title">
                                    <span class="web-name">{{basicSetting.name}}</span><br>
                                    <span class="english-name">{{basicSetting.englishName}}</span>
                                </div>
                            </el-col>
                        </el-row>


                    </div>
                    <div id="noParent" v-if="!basicSetting.hasParent">
                        <el-row>
                            <el-col :span="3">
                                <div class="logo">
                                    <img :src="basicSetting.currentPicture" alt="">
                                </div>
                            </el-col>
                            <el-col :span="9">
                                <div class="title">
                                    <span class="web-name">{{basicSetting.name}}</span><br>
                                    <span class="english-name">{{basicSetting.englishName}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6" :offset="6">
                                <div class="search-box">
                                    <el-input placeholder="请输入您需要查找的内容..." prefix-icon="el-icon-search"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>


            </el-header>
            <el-main>
                <!--顶部导航栏-->
                <div id="navbar">
                    <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                        <div style="display: inline-block; width:40px"></div>
                        <div style="display: inline-block;" v-for="menu in menuList">
                            <el-menu-item :index="baseUrl+menu.url" v-if="menu.childrens.length==0">{{menu.name}}</el-menu-item>
                            <el-submenu :index="baseUrl+menu.url" v-if="menu.childrens.length!=0">
                                <template slot="title">{{menu.name}}</template>
                                <el-menu-item v-for="item in menu.childrens" :index="baseUrl+item.url">{{item.name}}</el-menu-item>
                            </el-submenu>
                        </div>
                    </el-menu>
                </div>
                <!--中间路由部分-->
                <router-view></router-view>
            </el-main>
            <el-footer>
                <div class="copyright">
                    <span>{{basicSetting.copyright}}</span><br>
                    <span>{{basicSetting.contactInfo}}</span>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "CollegeWebsite",
        data() {
            return {
                basicSetting: {              //网站基础信息
                    name: '',                //网站名称
                    pictureUrl: '',          //网站图标
                    hasEnglishName: false,   //是否有英文名称
                    englishName: '',          //英文名称
                    hasParent: false,         //是否有父网站
                    parentName: '',           //父网站名称
                    copyright: '',                //版权信息
                    contactInfo: '',              //联系信息
                    currentPicture: ''            //图标位置
                },
                menuList:[],                       //导航栏菜单列表
                baseUrl:'/website'
            }
        }, mounted() {
            this.getBasicSetting();
            this.getMenus();
        },
        methods: {
            /*获取网页基本设置*/
            getBasicSetting() {
                this.axios.get('http://localhost:8088/basic_setting/getOne').then((res) => {
                    if (res.data != "") {
                        this.basicSetting = res.data;
                        this.basicSetting.currentPicture = "static/" + this.basicSetting.pictureUrl;
                    }

                });
            },
            /*获取导航栏菜单*/
            getMenus(){
                this.axios.get('http://localhost:8088/navbar/listByLevel').then((res) => {
                    if (res.data != "") {
                        this.menuList = res.data;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/CollegeWebsite.css";
</style>