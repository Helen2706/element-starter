<template>
    <div id="navbar-management">
        <div id="menu-top">
            <!--<h2>菜单管理</h2>-->
            <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd(null,null)">添加</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="batchRemove">删除</el-button>
        </div>
        <div id="menu-table">
            <el-table :data="menuList" @selection-change="handleSelectionChange" border stripe>
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
                        <span v-if="scope.row.type==1||scope.row.type==2">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.$index,scope.row)">添加</el-button>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <!--添加菜单对话框-->
            <el-dialog title="添加新的导航菜单" :visible.sync="addMenuDialogVisible" width="650px">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="菜单类型：">
                        <el-radio-group v-model="form.type" @change="menuRadioChange">
                            <el-radio :label="1" border>一级菜单</el-radio>
                            <el-radio :label="2" border>二级菜单</el-radio>
                            <el-radio :label="3" border>三级菜单</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="父级菜单：">
                        <el-select v-model="form.parentId" placeholder="请选择父级菜单">
                            <el-option v-for="parent in form.parents" :label="parent.name"
                                       :value="parent.menuId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="排序号：">
                        <el-input v-model="form.orderNum"></el-input>
                    </el-form-item>
                    <el-form-item label="访问地址：">
                        <el-input v-model="form.url"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：">
                        <el-input type="textarea" v-model="form.description"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addMenuDialogVisible=false">取消</el-button>
                    <el-button type="primary" @click="submitAddForm">确定</el-button>
                </span>
            </el-dialog>
            <!--编辑菜单对话框-->
            <el-dialog title="编辑导航菜单" :visible.sync="editMenuDialogVisible" width="650px">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="菜单类型：">
                        <el-radio-group v-model="form.type" @change="menuRadioChange">
                            <el-radio :label="1" border>一级菜单</el-radio>
                            <el-radio :label="2" border>二级菜单</el-radio>
                            <el-radio :label="3" border>三级菜单</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="父级菜单：">
                        <el-select v-model="form.parentId" placeholder="请选择父级菜单">
                            <el-option v-for="parent in form.parents" :label="parent.name"
                                       :value="parent.menuId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="排序号：">
                        <el-input v-model="form.orderNum"></el-input>
                    </el-form-item>
                    <el-form-item label="访问地址：">
                        <el-input v-model="form.url"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：">
                        <el-input type="textarea" v-model="form.description"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editMenuDialogVisible=false">取消</el-button>
                    <el-button type="primary" @click="submitEditForm">确定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavbarManagement",
        data() {
            return {
                menuList: [],        //菜单列表
                addMenuDialogVisible: false,         //添加菜单对话框可见性
                editMenuDialogVisible: false,         //编辑菜单对话框可见性
                multipleSelection:[],                 //多选框选中的表格内容
                form: {                               //菜单数据
                    menuId:null,
                    name: null,
                    url: null,
                    type: null,
                    parentId: null,
                    parents: [],
                    orderNum: null,
                    description: null
                }
            }
        },
        mounted() {
            this.getMenuList()
        },
        methods: {
            /*获取菜单列表数据*/
            getMenuList() {
                this.axios.get('http://localhost:8088/navbar/list', {
                    params: {
                        offset: 1,
                        limit: 100
                    }
                }).then(
                    body => {
                        this.menuList = body.data;
                    }
                );
            },
            /*当更改多选框时*/
            handleSelectionChange(val){
                this.multipleSelection = val;
                console.log('multipleSelection:',this.multipleSelection)
            },
            /*当点击单行删除按钮时*/
            handleDelete(index, row) {
                this.axios.get('http://localhost:8088/navbar/remove', {
                    params: {
                        menuId: row.menuId
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.getMenuList();
                        this.deleteSuccess();
                    } else {
                        this.deleteFailed();
                    }
                }).catch(function (res) {
                    console.log(res);
                });
            },
            /*批量删除*/
            batchRemove() {
                var ids = [];
                if(this.multipleSelection.length>0){
                    for(var value of this.multipleSelection){
                        ids.push(value.menuId);
                    }
                    this.axios.get('http://localhost:8088/navbar/batchRemove', {
                        params: {
                            ids: ids
                        }
                    }).then((res) => {
                        if (res.data.code == 0) {
                            this.getMenuList();
                            this.deleteSuccess();
                        } else {
                            this.deleteFailed();
                        }
                    }).catch(function (res) {
                        console.log(res);
                    });
                }
            },
            /*当点击编辑按钮时*/
            handleEdit(index, row) {
                /*1 处理数据，将该行数据传递给form变量*/
                this.form.menuId = row.menuId;
                this.form.parentId = row.parentId;
                this.form.type = row.type;
                this.form.url = row.url;
                this.form.name = row.name;
                this.form.orderNum = row.orderNum;
                /*获取父级菜单列表*/
                this.axios.get('http://localhost:8088/navbar/list', {
                    params: {
                        offset: 0,
                        limit: 100,
                        type: row.type-1
                    }
                }).then(
                    body => {
                        this.form.parents = body.data;
                    }
                );
                /*2 显示编辑菜单对话框*/
                this.editMenuDialogVisible = true;
            },
            /*当点击增加菜单按钮时*/
            handleAdd(index, row) {
                /*如果点击表格上方的添加按钮，默认添加一级菜单*/
                if (index == null) {
                    this.form.type = 1;
                    this.form.parents = [{menuId: 1, name: '根目录'}];
                    this.form.parentId = 1;
                } else {
                    this.form.type = row.type+1;
                    this.form.parentId = row.menuId;
                    /*获取同级别的父级菜单列表*/
                    this.axios.get('http://localhost:8088/navbar/list', {
                        params: {
                            offset: 0,
                            limit: 100,
                            type: row.type
                        }
                    }).then(
                        body => {
                            this.form.parents = body.data;
                        }
                    );
                }
                this.form.url = null;
                this.form.name = null;
                this.form.orderNum = null;
                this.addMenuDialogVisible = true;
            },
            /*当添加菜单对话框中菜单类型发生变化时*/
            menuRadioChange(value){
                this.axios.get('http://localhost:8088/navbar/list', {
                    params: {
                        offset: 0,
                        limit: 100,
                        type: value-1
                    }
                }).then(
                    body => {
                        this.form.parents = body.data;
                        this.form.parentId = null;
                    }
                );
            },
            /*当提交添加菜单的表单时*/
            submitAddForm(){
                this.axios.post('http://localhost:8088/navbar/save', {
                    name:this.form.name,
                    url:this.form.url,
                    parentId:this.form.parentId,
                    orderNum:this.form.orderNum,
                    type:this.form.type
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.getMenuList();
                        this.addSuccess();
                    } else {
                        this.addFailed();
                    }
                }).catch(function (res) {
                    console.log(res);
                    this.addFailed();
                });
                this.addMenuDialogVisible = false;
                this.getMenuList();
            },
            /*当提交编辑菜单的表单时*/
            submitEditForm(){
                this.axios.post('http://localhost:8088/navbar/update', {
                    menuId:this.form.menuId,
                    name:this.form.name,
                    url:this.form.url,
                    parentId:this.form.parentId,
                    orderNum:this.form.orderNum,
                    type:this.form.type
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.getMenuList();
                        this.editSuccess();
                    } else {
                        this.editFailed();
                    }
                }).catch(function (res) {
                    console.log(res);
                    this.editFailed();
                });
                this.editMenuDialogVisible = false;
                this.getMenuList();
            },
            deleteSuccess() {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
            },
            deleteFailed() {
                this.$message.error('操作失败！');
            },
            addSuccess() {
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                });
            },
            addFailed() {
                this.$message.error('添加失败！');
            },
            editSuccess() {
                this.$message({
                    message: '编辑成功！',
                    type: 'success'
                });
            },
            editFailed() {
                this.$message.error('编辑失败！');
            },
        }

    }
</script>

<style scoped>
    #menu-top {
        margin-left: 22px;
    }

    #menu-table {
        margin: 20px;
        margin-top: 10px;
    }
</style>