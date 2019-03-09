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
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项一</el-menu-item>
                                <el-menu-item index="1-2">选项二</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-3">
                                <template slot="title">
                                    <span>导航1-3</span>
                                </template>
                                <el-menu-item index="1-3-1">选项三</el-menu-item>
                            </el-submenu>
                            <el-menu-item index="1-4">选项四</el-menu-item>
                        </el-submenu>
                        <router-link to="/back/menu">
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">
                                    菜单管理
                                </span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/back/module-management">
                            <el-menu-item index="3">
                                <i class="el-icon-circle-plus"></i>
                                    <span slot="title">
                                        代码生成
                                    </span>
                            </el-menu-item>
                        </router-link>
                        <el-submenu index="8">
                            <template slot="title">
                                <i class="el-icon-star-on"></i>
                                <span>系统管理</span>
                            </template>
                            <router-link to="/back/basic-setting">
                                <el-menu-item index="4-1">
                                    <span slot="title">
                                        基础设置
                                    </span>
                                </el-menu-item>
                            </router-link>
                            <router-link to="/back/system-menu">
                                <el-menu-item index="4-2">
                                    <span slot="title">
                                        菜单设置
                                    </span>
                                </el-menu-item>
                            </router-link>
                            <router-link to="/back/carousel">
                                <el-menu-item index="4-3">
                                    <span slot="title">
                                        轮播图设置
                                    </span>
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                        <el-submenu index="9">
                            <template slot="title">
                                <i class="el-icon-goods"></i>
                                <span>新闻管理</span>
                            </template>
                            <router-link to="/back/add-news">
                                <el-menu-item index="9-1">
                                    <i class="el-icon-plus"></i>
                                    <span slot="title">
                                    发布新闻
                                </span>
                                </el-menu-item>
                            </router-link>
                            <router-link to="/back/news-list">
                                <el-menu-item index="9-2">
                                    <i class="el-icon-tickets"></i>
                                    <span slot="title">
                                    新闻列表
                                </span>
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-circle-check"></i>
                                <span>基础管理</span>
                            </template>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title">
                                <i class="el-icon-edit"></i>
                                <span>权限管理</span>
                            </template>
                        </el-submenu>
                        <router-link to="/back/notification">
                            <el-menu-item index="7">
                                <i class="el-icon-message"></i>
                                <span slot="title">
                                    通知公告
                                </span>
                            </el-menu-item>
                        </router-link>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-bell"></i>
                                <span>用户管理</span>
                            </template>
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
        name: "BackManagement"
    }
</script>

<style scoped>
    @import "../assets/css/BackManagement.css";
</style>