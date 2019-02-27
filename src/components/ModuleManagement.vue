<template>
    <div id="ModuleManagement">
        <!--表格上方-->
        <div class="table-top">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="batchRemove">删除</el-button>
        </div>
        <div class="table">
            <el-table :data="tableList" border stripe @selection-change="handleSelectionChange">
                <el-table-column type="selection" align="center" width="80"></el-table-column>
                <el-table-column label="表名称">
                    <template slot-scope="scope">
                        <el-tag type="primary" style="font-size:15px;">{{scope.row.TABLE_NAME}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="描述" prop="TABLE_COMMENT" align="center"></el-table-column>
                <el-table-column label="engine" prop="ENGINE" align="center"></el-table-column>
                <el-table-column width="180" label="创建时间" align="center" prop="CREATE_TIME">
                    <template slot-scope="scope">
                        {{getStringDate(scope.row.CREATE_TIME)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" plain @click="handleDownload(scope.row)"><i class="el-icon-download"></i> 下载代码</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--添加对话框-->
        <el-dialog :title="dialogParams.addDialogTitle" :visible.sync="dialogParams.addDialogVisible"
                   :width="dialogParams.width" :fullscreen="dialogParams.fullscreen">
            <el-form ref="form" :model="form" label-width="100px">
                <div>
                    <el-form-item label="模块名称：">
                        <el-input v-model="form.moduleName"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库名：">
                        <el-input v-model="form.moduleEName"></el-input>
                    </el-form-item>
                </div>
                <div v-for="(field,index) in form.fields">
                    <div>
                        <el-form-item :label="'字段 '+ index+'：'">
                            <el-input v-model="field.name"></el-input>
                        </el-form-item>
                        <el-form-item label="字段类型：">
                            <el-select v-model="field.type" placeholder="请选择">
                                <el-option
                                        v-for="item in form.typeOptions"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="是否必填：">
                            <el-switch
                                    v-model="field.required"
                                    active-color="#13ce66">
                            </el-switch>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="注释 ：">
                            <el-input v-model="field.comment"></el-input>
                        </el-form-item>
                        <el-form-item label="字段长 ：">
                            <el-input v-model="field.length"></el-input>
                        </el-form-item>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button type="warning" @click.prevent="removeField(field)">删除字段</el-button>
                    </div>
                </div>
                <el-form-item>
                    <el-button @click="addField" type="success">新增字段</el-button>
                    <el-button type="primary" @click="submitAddForm">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ModuleManagement",
        data() {
            return {
                form: {                          //表单对象
                    moduleName: '',               //模块名称
                    moduleEName: '',              //英文名称
                    fields: [
                        {name: '',comment:'',type:null,length:null,required:true}
                    ],
                    typeOptions:[
                        {key:1,value:'整型'},
                        {key:2,value:'长整型'},
                        {key:3,value:'浮点型'},
                        {key:4,value:'字符串型'},
                        {key:5,value:'日期型'},
                        {key:6,value:'文本型'},
                        {key:7,value:'图片地址'}
                    ]
                },
                dialogParams: {                      //对话框配置对象
                    addDialogTitle: '添加' + '模块',           //添加对话框标题
                    addDialogVisible: false,         //添加对话框是否可见，默认隐藏
                    editDialogTitle: '编辑' + '模块',          //编辑对话框标题
                    editDialogVisible: false,        //编辑对话框是否可见，默认隐藏
                    width: '80%',                    //宽度，对话框全屏情况下无效
                    fullscreen: false              //对话框是否全屏，默认false
                },
                tableList:[{TABLE_NAME:'',TABLE_COMMENT:'',ENGINE:''}],
                multipleSelection:[]
            }
        },
        mounted(){
            this.listTables();
        },
        methods: {
            /*查询数据库中所有表*/
            listTables(){
                this.axios.get('http://localhost:8088/module/list').then(
                    body => {
                        this.tableList = body.data;
                    }
                );
            },
            /*当点击下载代码按钮时*/
            handleDownload(row){},
            /*当点击表格上面的添加按钮时*/
            handleAdd() {
                this.dialogParams.addDialogVisible = true;
            },
            /*当点击批量删除按钮时*/
            batchRemove() {
                var tables = [];
                if(this.multipleSelection.length>0){
                    for(var value of this.multipleSelection){
                        tables.push(value.TABLE_NAME);
                    }
                    this.axios.get('http://localhost:8088/module/batchRemove', {
                        params: {
                            tables: tables
                        }
                    }).then((res) => {
                        if (res.data.code == 0) {
                            this.listTables();
                            this.deleteSuccess();
                        } else {
                            this.deleteFailed();
                        }
                    }).catch((res)=> {
                        console.log(res);
                    });
                }
            },
            /*当点击删除字段时*/
            removeField(field){
                var index = this.form.fields.indexOf(field);
                if(index!=-1){
                    this.form.fields.splice(index,1);
                }
            },
            /*当添加表单点击提交时*/
            submitAddForm(){
                console.log('field-form:',this.form);
                this.axios.post('http://localhost:8088/module/add', {
                    moduleName:this.form.moduleName,
                    moduleEName:this.form.moduleEName,
                    fields:this.form.fields
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.addSuccess();
                        this.listTables();
                        this.dialogParams.addDialogVisible = false;
                    } else {
                        this.addFailed();
                    }
                }).catch((res)=> {
                    console.log(res);
                    this.addFailed();
                });
            },
            /*当添加表单点击新增字段时*/
            addField(){
                this.form.fields.push(
                {name: '',comment:'',type:null,length:null,required:false}
                );
            },
            /*当更改多选框时*/
            handleSelectionChange(val){
                this.multipleSelection = val;
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
            deleteSuccess() {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
            },
            deleteFailed() {
                this.$message.error('操作失败！');
            },
            /*将毫秒数转化为时间*/
            getStringDate(time){
                if(time!=null&&time!=''){
                    return new Date(time).toLocaleString().split("/").join('-');
                }
                return '';
            },
        }
    }
</script>

<style scoped>
    #ModuleManagement .el-form-item {
        display: inline-block;
    }
    .table-top{
        margin-left: 22px;
    }
    .table{
        margin: 20px;
        margin-top: 10px;
    }
</style>