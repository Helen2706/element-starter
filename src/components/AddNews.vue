<template>
    <div id="add-news">
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-plus"></i> 发布新闻</span>
                <div id="add-news-form">
                    <el-form ref="form" :model="form" label-width="140px" size="medium">
                        <el-form-item label="标题：">
                            <el-input v-model="form.title" placeholder="新闻标题" minlength="999px"></el-input>
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "AddNews",
        data() {
            return {
                form:{
                    title:'',
                    author:'',
                    content:'',
                    state:''
                },
                editorOptions:{}
            }
        },
        methods: {
            /*保存新闻*/
            saveNews(){
                this.axios.post('http://localhost:8088/news/save',{
                    title:this.form.title,
                    author:this.form.author,
                    content:this.form.content,
                    state:this.form.state
                }).then((res)=>{
                    if (res.data.code == 0) {
                        this.addSuccess();
                        this.form = {};
                    }else{
                        this.addFailed();
                    }
                }).catch((res)=>{
                    this.addFailed();
                })
            },
            /*保存为草稿*/
            saveAsDraft(){
                this.form.state = 3;
                this.saveNews();
            },
            /*当点击发布按钮时*/
            releaseNews(){
                this.form.state = 2;
                this.saveNews();
            },addSuccess() {
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                });
            },
            addFailed() {
                this.$message.error('添加失败,请重试！');
            }
        }
    }
</script>

<style scoped>
    .el-tabs {
        margin: 10px;
        min-height: 350px;
    }
    #add-news .el-input{
        max-width:350px;
    }
    .quill-editor {
        min-height: 100px;
    }
</style>