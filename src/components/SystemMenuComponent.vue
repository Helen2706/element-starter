<template>
    <div id="SystemMenuComponent">
        <!--表格上方添加和删除按钮-->
        <div class="table-top">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="handleBatchRemove">删除</el-button>
        </div>

        <!--表格-->
        <div class="table">
            <el-table :data="tableList" border stripe @selection-change="handleSelectionChange">
                <el-table-column type="selection" align="center" width="80"></el-table-column>
                                    <el-table-column label="编号" prop="id" align="center"></el-table-column>
                                    <el-table-column label="名称" prop="name" align="center"></el-table-column>
                                    <el-table-column label="类型" prop="type" align="center"></el-table-column>
                                    <el-table-column label="URL" prop="url" align="center"></el-table-column>
                                    <el-table-column label="权限" prop="authority" align="center"></el-table-column>
                                    <el-table-column label="父菜单" prop="parentid" align="center"></el-table-column>
                                <el-table-column label="操作" align="center" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" plain @click="handleEdit(scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>
                        <el-button size="mini" type="warning" plain @click="handleRemove(scope.row)"><i class="el-icon-close"></i> 删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--添加对话框-->
        <el-dialog :title="dialogParams.addDialogTitle" :visible.sync="dialogParams.addDialogVisible"
                   :width="dialogParams.width" :fullscreen="dialogParams.fullscreen">
            <el-form ref="form" :model="form" label-width="100px">
                                    <el-form-item label="编号：">
                        <el-input v-model="form.id"></el-input>
                    </el-form-item>
                                    <el-form-item label="名称：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                                    <el-form-item label="类型：">
                        <el-input v-model="form.type"></el-input>
                    </el-form-item>
                                    <el-form-item label="URL：">
                        <el-input v-model="form.url"></el-input>
                    </el-form-item>
                                    <el-form-item label="权限：">
                        <el-input v-model="form.authority"></el-input>
                    </el-form-item>
                                    <el-form-item label="父菜单：">
                        <el-input v-model="form.parentid"></el-input>
                    </el-form-item>
                                <el-form-item>
                    <el-button type="primary" @click="submitAddForm">提交</el-button>
                    <el-button @click="resetAddForm">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--编辑对话框-->
        <el-dialog :title="dialogParams.editDialogTitle" :visible.sync="dialogParams.editDialogVisible"
                   :width="dialogParams.width" :fullscreen="dialogParams.fullscreen">
            <el-form ref="form" :model="form" label-width="100px">
                                    <el-form-item label="编号：">
                        <el-input v-model="form.id"></el-input>
                    </el-form-item>
                                    <el-form-item label="名称：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                                    <el-form-item label="类型：">
                        <el-input v-model="form.type"></el-input>
                    </el-form-item>
                                    <el-form-item label="URL：">
                        <el-input v-model="form.url"></el-input>
                    </el-form-item>
                                    <el-form-item label="权限：">
                        <el-input v-model="form.authority"></el-input>
                    </el-form-item>
                                    <el-form-item label="父菜单：">
                        <el-input v-model="form.parentid"></el-input>
                    </el-form-item>
                                <el-form-item>
                    <el-button type="primary" @click="submitEditForm">提交</el-button>
                    <el-button @click="resetEditForm">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "SystemMenuComponent",
        data() {
            return {
                dialogParams: {                      //对话框配置对象
                    addDialogTitle: '添加' + '系统菜单',           //添加对话框标题
                    addDialogVisible: false,         //添加对话框是否可见，默认隐藏
                    editDialogTitle: '编辑' + '系统菜单',          //编辑对话框标题
                    editDialogVisible: false,        //编辑对话框是否可见，默认隐藏
                    width: '50%',                    //宽度，对话框全屏情况下无效
                    fullscreen: false              //对话框是否全屏，默认false
                },
                form: {                               //表单数据
                            id:'',                            name:'',                            type:'',                            url:'',                            authority:'',                            parentid:''                    },
            tableList:[{}],                           //表格列表数据
            multipleSelection:[],                     //多选框选中的数组
        }
        },
        mounted() {
            this.getTableList();
        },
        methods: {
            /*获取表格数据列表*/
            getTableList(){
                this.axios.get('/api/systemMenu/list').then(
                        body => {
                            this.tableList = body.data;
                        }
                );
            },

            /*当点击表格上方添加按钮时*/
            handleAdd(){
                this.form = {};
                this.dialogParams.addDialogVisible = true;
            },

            /*当点击编辑按钮时*/
            handleEdit(row){
                                    this.form.id = row.id,
                                    this.form.name = row.name,
                                    this.form.type = row.type,
                                    this.form.url = row.url,
                                    this.form.authority = row.authority,
                                    this.form.parentid = row.parentid,
                                this.dialogParams.editDialogVisible = true;
            },

            /*当点击删除按钮时*/
            handleRemove(row){
                this.axios.get('/api/systemMenu/remove', {
                    params: {
                id: row.id
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.getTableList();
                        this.deleteSuccess();
                    } else {
                        this.deleteFailed();
                    }
                }).catch((res)=> {
                    console.log(res);
                });
            },

            /*当点击表格上方批量删除按钮时*/
            handleBatchRemove(){
                var ids = [];
                if(this.multipleSelection.length>0){
                    for(var value of this.multipleSelection){
                            ids.push(value.id);
                    }
                    this.axios.get('/api/systemMenu/batchRemove', {
                        params: {
                                ids: ids
                        }
                    }).then((res) => {
                        if (res.data.code == 0) {
                            this.getTableList();
                            this.deleteSuccess();
                        } else {
                            this.deleteFailed();
                        }
                    }).catch((res)=> {
                        console.log(res);
                    });
                }
            },

            /*当添加对话框中点击提交时*/
            submitAddForm(){
                this.axios.post('/api/systemMenu/save', {
                                    id:this.form.id,
                                    name:this.form.name,
                                    type:this.form.type,
                                    url:this.form.url,
                                    authority:this.form.authority,
                                    parentid:this.form.parentid,
                                }).then((res)=>{
                    if (res.data.code == 0) {
                        this.addSuccess();
                        this.getTableList();
                        this.dialogParams.addDialogVisible = false;
                        this.form = {};
                    } else {
                        this.addFailed();
                    }
                }).catch((res)=> {
                    this.addFailed();
                });
            },

            /*当在添加按钮中点击取消按钮时*/
            resetAddForm(){
                this.dialogParams.addDialogVisible = false;
            },

            /*当在编辑对话框点击提交时*/
            submitEditForm(){
                this.axios.post('/api/systemMenu/update', {
                                    id:this.form.id,
                                    name:this.form.name,
                                    type:this.form.type,
                                    url:this.form.url,
                                    authority:this.form.authority,
                                    parentid:this.form.parentid,
                            }).then((res)=>{
                    if (res.data.code == 0) {
                        this.editSuccess();
                        this.getTableList();
                        this.dialogParams.editDialogVisible = false;
                        this.form = {};
                    } else {
                        this.editFailed();
                    }
                }).catch((res)=> {
                    this.editFailed();
                });
            },

            /*当在编辑对话框中点击取消时*/
            resetEditForm(){
                this.dialogParams.editDialogVisible = false;
            },

            /*当更改多选框时*/
            handleSelectionChange(val){
                this.multipleSelection = val;
            },

            addSuccess(){
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                });
            },

            addFailed(){
                this.$message.error('添加失败！');
            },

            editSuccess(){
                this.$message({
                    message: '编辑成功！',
                    type: 'success'
                });
            },

            editFailed(){
                this.$message.error('编辑失败！');
            },

            deleteSuccess(){
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
            },

            deleteFailed(){
                this.$message.error('操作失败！');
            }
        }
    }
</script>

<style scoped>
    .table-top {
        margin-left: 22px;
    }

    .table {
        margin: 20px;
        margin-top: 10px;
    }
</style>