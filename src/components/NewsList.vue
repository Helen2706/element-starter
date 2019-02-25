<template>
    <div id="news-list">
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-tickets"></i> 新闻列表</span>
                <div id="news-table">
                    <el-table :data="newsList" border stripe>
                        <el-table-column label="新闻标题" prop="title" ></el-table-column>
                        <el-table-column label="作者" prop="author" align="center" width="100" ></el-table-column>
                        <el-table-column label="状态" width="100" align="center" >
                            <template slot-scope="scope">
                        <span v-if="scope.row.state==1">
                            <el-tag size="medium" type="success">首页</el-tag>
                        </span>
                                <span v-else-if="scope.row.state==2">
                            <el-tag size="medium" type="primary">已发布</el-tag>
                        </span>
                                <span v-else-if="scope.row.state==3">
                            <el-tag size="medium" type="warning">草稿</el-tag>
                        </span>
                                <span v-else-if="scope.row.state==4">
                            <el-tag size="medium" type="danger">已归档</el-tag>
                        </span>
                            </template>
                        </el-table-column>
                        <el-table-column width="180" label="创建时间" align="center" prop="createTime">
                            <template slot-scope="scope">
                                {{getStringDate(scope.row.createTime)}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="300">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="toHomePage(scope.row)">推首页</el-button>
                                <el-button size="mini" @click="toFile(scope.row)">归档</el-button>
                                <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="warning" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!--编辑新闻对话框-->
        <el-dialog title="编辑新闻" :visible="editNewsDialogVisible" width="900px">
            <div id="edit-news-form">
                <el-form ref="form" :model="form" label-width="140px" size="medium">
                    <el-form-item label="标题：">
                        <el-input v-model="form.title" placeholder="新闻标题"></el-input>
                    </el-form-item>
                    <el-form-item label="作者：">
                        <el-input v-model="form.author" placeholder="作者"></el-input>
                    </el-form-item>

                    <el-form-item label="新闻内容：">
                        <!--<div class="quill-editor" v-model="form.content"></div>-->
                        <quill-editor class="editor" ref="myTextEditor" v-model="form.content" :options="editorOptions">

                        </quill-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="saveAsDraft">存为草稿</el-button>
                        <el-button type="primary" @click="releaseNews">发布</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "NewsList",
        data() {
            return {
                newsList:[],
                form:{
                    id:'',
                    title:'',
                    content:'',
                    state:'',
                    author:''
                },
                editNewsDialogVisible:false,    //编辑新闻对话框是否可见
                editorOptions:{}
            }
        },mounted(){
            this.getNewsList();
        },
        methods: {
            getNewsList(){
                this.axios.get('http://localhost:8088/news/list').then(
                    body => {
                        this.newsList = body.data;
                    }
                );
            },
            /*将毫秒数转化为时间*/
            getStringDate(time){
                if(time!=null&&time!=''){
                    return new Date(time).toLocaleString().split("/").join('-');
                }
                return '';
            },
            /*更新新闻*/
            updateNews(form){
                this.axios.post('http://localhost:8088/news/update',{
                    id:form.id,
                    title:form.title,
                    author:form.author,
                    content:form.content,
                    state:form.state
                }).then((res)=>{
                    if (res.data.code == 0) {
                        this.editSuccess();
                        this.getNewsList();
                    } else {
                        this.editFailed();
                    }
                }).catch((res)=> {
                    this.editFailed();
                });
            },
            /*当点击编辑按钮时*/
            handleEdit(row){
                this.form.id = row.id;
                this.form.title = row.title;
                this.form.author = row.author;
                this.form.content = row.content;
                this.form.state = row.state;
                this.editNewsDialogVisible = true;
            },
            /*当点击删除按钮时*/
            handleDelete(row){
                this.axios.get('http://localhost:8088/news/remove', {
                    params: {
                        id: row.id
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.getNewsList();
                        this.deleteSuccess();
                    } else {
                        this.deleteFailed();
                    }
                }).catch((res)=> {
                    console.log(res);
                });
            },
            /*当点击推首页按钮时*/
            toHomePage(row){
                row.state = 1;
                this.updateNews(row);
            },
            toFile(row){
                row.state = 4;
                this.updateNews(row);
            },
            /*保存为草稿*/
            saveAsDraft(){
                this.form.state = 3;
                this.updateNews(this.form);
                this.editNewsDialogVisible = false;
            },
            /*当点击发布按钮时*/
            releaseNews(){
                this.form.state = 2;
                this.updateNews(this.form);
                this.editNewsDialogVisible = false;
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
            }
        }
    }
</script>

<style scoped>
    .el-tabs {
        margin: 10px;
        min-height: 350px;
    }
</style>