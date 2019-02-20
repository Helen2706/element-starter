<template>
    <div id="navbar-management">
        <h2>菜单管理</h2>
        <div id="menu-table">
            <el-table :data="menuList" border stripe max-height="600px">
                <el-table-column type="selection" align="center" width="80"></el-table-column><!--多选框-->
                <el-table-column label="编号" prop="menuId" align="center" width="80"></el-table-column>
                <el-table-column label="菜单名称" prop="name" align="center" width="120"></el-table-column>
                <el-table-column label="排序号" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{scope.row.orderNum}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="类型" align="center" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==1"><el-tag size="medium" type="success">一级菜单</el-tag></span>
                        <span v-else-if="scope.row.type==2"><el-tag size="medium" type="danger">二级菜单</el-tag></span>
                        <span v-else><el-tag size="medium">三级菜单</el-tag></span>
                    </template>
                </el-table-column>
                <el-table-column label="访问地址" prop="url" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                        <el-button size="mini" type="warning" @click="handleDelete(scope.$index,scope.row)">删除
                        </el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.$index,scope.row)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavbarManagement",
        data() {
            return {
                menuList: []
            }
        },
        mounted() {
            this.getMenuList()
        },
        methods: {
            /*获取菜单列表数据*/
            getMenuList() {
                this.axios.post('http://localhost:8088/navbar/list').then(
                    body => {
                        this.menuList = body.data;
                    }
                );
            },
            deleteSuccess() {
                this.$message({
                    message:'删除成功！',
                    type:'success'
                });
            },
            handleDelete(index, row) {
                this.axios.get('http://localhost:8088/navbar/remove', {
                    params: {
                        menuId: row.menuId
                    }
                }).then(function (res) {
                    if (res.data.code == 0) {
                        console.log("删除菜单操作成功！");
                        $root.axios.post('http://localhost:8088/navbar/list').then(
                            body => {
                                this.menuList = body.data;
                            }
                        );
                    } else {
                        console.log("删除菜单操作失败！");
                    }
                }).catch(function (res) {
                    console.log(res);
                });
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleAdd(index, row) {
                console.log(index, row);
            }
        }

    }
</script>

<style scoped>
    #menu-table {
        margin: 20px;
    }
</style>