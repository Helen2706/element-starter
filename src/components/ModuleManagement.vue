<template>
    <div id="ModuleManagement">
        <!--表格上方-->
        <div class="table-top">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="batchRemove">删除</el-button>
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
                    addDialogVisible: true,         //添加对话框是否可见，默认隐藏
                    editDialogTitle: '编辑' + '模块',          //编辑对话框标题
                    editDialogVisible: false,        //编辑对话框是否可见，默认隐藏
                    width: '80%',                    //宽度，对话框全屏情况下无效
                    fullscreen: true              //对话框是否全屏，默认false
                }
            }
        },
        methods: {
            /*当点击表格上面的添加按钮时*/
            handleAdd() {
                this.dialogParams.addDialogVisible = true;
            },
            /*当点击批量删除按钮时*/
            batchRemove() {
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
    #ModuleManagement .el-form-item {
        display: inline-block;
    }
</style>