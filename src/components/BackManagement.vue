<template>
    <div id="back-management">
        <el-container style="min-height:100vh;">
            <el-aside width="250px">
                <div class="web-title">
                    <span>后台管理系统</span>
                </div>
                <div class="navbar-menu">
                    <el-menu background-color="#2f4050"
                             text-color="#fff" active-text-color="#ffd04b" router>
                        <el-submenu v-for="menu,index in menuList" :index="menu.menuId+''" :key="menu.menuId">
                            <template slot="title">
                                <i v-if="index%2==0" class="el-icon-menu"></i>
                                <i v-if="index%2!=0" class="el-icon-location"></i>
                                <span style="font-size: 1.2em">{{menu.name}}</span>
                            </template>
                            <el-menu-item v-for="children in menu.childrens" :index="children.url">{{children.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-aside>
            <el-container style="min-width:100vh;">
                <el-header>
                    <el-row :gutter="20">
                        <el-col :span="6" :offset="1">
                            <!--搜索框-->
                            <div class="search-box">
                                <el-input placeholder="请输入您需要查找的内容..." prefix-icon="el-icon-search"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="11" :offset="6">
                            <div class="nav-header">
                                <el-menu mode="horizontal">
                                    <el-menu-item index="news1">
                                        <i class="el-icon-message"></i>
                                        <span>通知公告</span>
                                    </el-menu-item>
                                    <el-menu-item index="news2">
                                        <i class="el-icon-service"></i>
                                        <span>个人中心</span>
                                    </el-menu-item>
                                    <el-menu-item index="news3">
                                        <i class="el-icon-setting"></i>
                                        <span>设置</span>
                                    </el-menu-item>
                                    <el-menu-item index="news4">
                                        <i class="el-icon-circle-close-outline"></i>
                                        <span>退出</span>
                                    </el-menu-item>
                                </el-menu>
                            </div>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    <div id="footer">
                        <span>学院网站通用后台管理系统</span><br>
                        <span>版权所有 &copy; 中国传媒大学计算机与网络空间安全学院</span>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "BackManagement",
        data() {
            return {
                menuList: [],        //菜单列表
            }
        },
        mounted() {
            this.getMenuList();
        },
        methods: {
            /*获取菜单列表数据*/
            getMenuList() {
                this.axios.get('http://localhost:8088/navbar/listByTree', {
                    params: {
                        offset: 0,
                        limit: 100
                    }
                }).then(
                    body => {
                        this.menuList = body.data;
                    }
                );
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/BackManagement.css";
</style>