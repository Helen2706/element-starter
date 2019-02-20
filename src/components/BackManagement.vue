<template>
    <div id="back-management">
        <el-container style="min-height:100vh;">
            <el-aside width="250px">
                <div class="web-title">
                    <span>后台管理系统</span>
                </div>
                <div class="navbar-menu">
                    <el-menu default-active="2" background-color="#2f4050"
                             text-color="#fff" active-text-color="#ffd04b">
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
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title"><router-link to="/back/menu">
            菜单管理
            </router-link></span>
                        </el-menu-item>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-circle-plus"></i>
                                <span>代码生成</span>
                            </template>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-star-on"></i>
                                <span>系统管理</span>
                            </template>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-goods"></i>
                                <span>图标管理</span>
                            </template>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-circle-check"></i>
                                <span>基础管理</span>
                            </template>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-edit"></i>
                                <span>权限管理</span>
                            </template>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span>通知公告</span>
                            </template>
                        </el-submenu>
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
                <el-footer>Footer</el-footer>
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