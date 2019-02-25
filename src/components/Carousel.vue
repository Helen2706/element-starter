<template>
    <!--对页面中的轮播图进行增删改查的页面-->
    <div id="carousel">
        <div id="carousel-top">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="handleBatchRemove">删除</el-button>
        </div>
        <div id="carousel-table">
            <el-table :data="carouselList" border stripe @selection-change="handleSelectionChange" >
                <el-table-column type="selection" align="center" width="80"></el-table-column>
                <el-table-column label="编号" prop="id" align="center" width="120"></el-table-column>
                <el-table-column label="轮播图标题" prop="title" width="360"></el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.imageUrl" :alt="scope.row.title">
                    </template>
                </el-table-column>
                <el-table-column label="链接地址" prop="url" align="center" width="240"></el-table-column>
                <el-table-column label="操作" align="center" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="warning" @click="handleRemove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--添加轮播图对话框-->
        <el-dialog title="添加新的轮播图" :visible.sync="addCarouselDialogVisible" width="650px">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="轮播图标题：">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="链接地址：">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="轮播图图片：">
                    <el-upload class="upload-demo"
                               name="picture" action="http://localhost:8088/upload/picture"
                               list-type="picture-card" :limit="1" :fileList="fileList"
                               :before-upload="beforeUpload" :on-success="handleSucess" :on-exceed="handleExceed">
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                        <i v-else class="el-icon-upload"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="addCarouselDialogVisible=false">取消</el-button>
                    <el-button type="primary" @click="submitAddForm">确定</el-button>
                </span>
        </el-dialog>
        <!--编辑轮播图对话框-->
        <el-dialog title="编辑轮播图" :visible.sync="editCarouselDialogVisible" width="650px">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="轮播图标题：">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="链接地址：">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="当前图片：">
                    <img :src="form.imageUrl" alt="">
                </el-form-item>
                <el-form-item label="更新图片：">
                    <el-upload class="upload-demo"
                               name="picture" action="http://localhost:8088/upload/picture"
                               list-type="picture-card" :limit="1" :fileList="fileList"
                               :before-upload="beforeUpload" :on-success="handleSucess" :on-exceed="handleExceed">
                        <i class="el-icon-upload"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="editCarouselDialogVisible=false">取消</el-button>
                    <el-button type="primary" @click="submitEditForm">确定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Carousel",
        data() {
            return {
                carouselList:[],
                form:{          //轮播图数据
                    id:'',
                    title:'',           //标题
                    url:'',             //链接地址
                    image:'',           //图片名称
                    imageUrl:''         //图片地址
                },
                addCarouselDialogVisible:false,
                editCarouselDialogVisible:false,
                multipleSelection:[],                 //多选框选中的表格内容
                fileList:[]             //轮播图图片列表
            }
        },
        mounted(){
            this.getCarouselList();
        },
        methods: {
            /*获取轮播图列表数据*/
            getCarouselList() {
                this.axios.get('http://localhost:8088/carousel/list').then(
                    body => {
                        this.carouselList = body.data;
                        for(var carousel of this.carouselList){
                            carousel.imageUrl = 'static/'+carousel.image;
                        }
                    }
                );
            },
            /*当更改多选框时*/
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            /*当点击添加按钮时*/
            handleAdd(){
                this.addCarouselDialogVisible = true;
            },
            /*当点击批量删除按钮时*/
            handleBatchRemove(){
                var ids = [];
                if(this.multipleSelection.length>0){
                    for(var value of this.multipleSelection){
                        ids.push(value.id);
                    }
                    this.axios.get('http://localhost:8088/carousel/batchRemove', {
                        params: {
                            ids: ids
                        }
                    }).then((res) => {
                        if (res.data.code == 0) {
                            this.getCarouselList();
                            this.deleteSuccess();
                        } else {
                            this.deleteFailed();
                        }
                    }).catch((res)=> {
                        console.log(res);
                    });
                }
            },
            /*当点击删除按钮时*/
            handleRemove(row){
                this.axios.get('http://localhost:8088/carousel/remove', {
                    params: {
                        id: row.id
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.getCarouselList();
                        this.deleteSuccess();
                    } else {
                        this.deleteFailed();
                    }
                }).catch((res)=> {
                    console.log(res);
                });
            },
            /*当点击编辑按钮时*/
            handleEdit(row){
                this.editCarouselDialogVisible = true;
                this.form.id = row.id;
                this.form.title = row.title;
                this.form.imageUrl = row.imageUrl;
                this.form.url = row.url;
                this.form.image = row.image;
                this.fileList = [];
            },
            //文件上传前的前的钩子函数
            //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isLt4M = file.size / 1024 / 1024 < 4;

                if (!isJPG && !isGIF && !isPNG && !isBMP) {
                    this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
                }
                if (!isLt4M) {
                    this.$message.error('上传图片大小不能超过 4MB!');
                }
                return (isJPG || isBMP || isGIF || isPNG) && isLt4M;
            },
            //文件上传成功钩子函数
            handleSucess(res,file){
                this.$message({
                    type:'info',
                    message:'图片上传成功！',
                    duration:3000
                });
                if(file.response.code==0){
                    this.form.image = file.response.msg;
                }
            },
            //当上传文件超过1个时
            handleExceed(){
                this.$message({
                    message:"请先删除已上传图片",
                    type:"warning"
                });
            },
            //添加轮播图
            submitAddForm(){
                this.fileList = [];
                this.axios.post('http://localhost:8088/carousel/save',{
                    title:this.form.title,
                    url:this.form.url,
                    image:this.form.image,
                }).then((res)=>{
                    if (res.data.code == 0) {
                        this.addSuccess();
                        this.getCarouselList();
                    } else {
                        this.addFailed();
                    }
                }).catch((res)=> {
                    console.log(res);
                    this.addFailed();
                });
                this.form = {};
                this.addCarouselDialogVisible = false;
            },
            //编辑轮播图
            submitEditForm(){
                this.fileList = [];
                this.axios.post('http://localhost:8088/carousel/update',{
                    id:this.form.id,
                    title:this.form.title,
                    url:this.form.url,
                    image:this.form.image,
                }).then((res)=>{
                    if (res.data.code == 0) {
                        this.editSuccess();
                        this.getCarouselList();
                    } else {
                        this.editFailed();
                    }
                }).catch((res)=> {
                    console.log(res);
                    this.editFailed();
                });
                this.editCarouselDialogVisible = false;
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
            }
        }
    }
</script>

<style scoped>
    .el-table__row img{
        width: 250px;
        height: 150px;
    }
    .el-form-item__content img{
        width: 300px;
        height: 200px;
    }
    #carousel-top{
        margin-left: 22px;
    }
    #carousel-table{
        margin: 20px;
        margin-top: 10px;
    }
</style>