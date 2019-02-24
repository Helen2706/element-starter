<!--学院网站信息基础设置-->
<template>
    <div id="basic-setting">
        <h2>学院网站信息基础设置</h2>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-setting"></i> 基础设置</span>
                <div id="basic-setting-form">
                    <!--对网站内容进行基础设置的表单-->
                    <el-form ref="form" :model="form" label-width="140px" size="medium">
                        <el-form-item label="网站名称：">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="当前图标：" v-if="!isSettingNull">
                            <img :src="currentPicture" alt="">
                        </el-form-item>
                        <el-form-item label="更改图标：" v-if="!isSettingNull">
                            <el-upload class="upload-demo"
                                       name="picture" action="http://localhost:8088/upload/picture"
                                       list-type="picture-card" :limit="1" :fileList="fileList"
                                       :before-upload="beforeUpload" :on-success="handleSucess" :on-exceed="handleExceed">
                                <i class="el-icon-upload"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="网站图标：" v-if="isSettingNull">
                            <el-upload class="upload-demo"
                                       name="picture" action="http://localhost:8088/upload/picture"
                                       list-type="picture-card" :limit="1" :fileList="fileList"
                                       :before-upload="beforeUpload" :on-success="handleSucess" :on-exceed="handleExceed">
                                <i class="el-icon-upload"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="添加英文名称：">
                            <el-switch v-model="form.hasEnglishName"></el-switch>
                        </el-form-item>
                        <el-form-item label="英文名称："  v-if="form.hasEnglishName">
                            <el-input v-model="form.englishName"></el-input>
                        </el-form-item>
                        <el-form-item label="添加父网站名称：">
                            <el-switch v-model="form.hasParent"></el-switch>
                        </el-form-item>
                        <el-form-item label="父网站名称："  v-if="form.hasParent">
                            <el-input v-model="form.parentName"></el-input>
                        </el-form-item>
                        <el-form-item label="版权信息：">
                            <el-input v-model="form.copyright"></el-input>
                        </el-form-item>
                        <el-form-item label="联系信息：">
                            <el-input v-model="form.contactInfo" placeholder="输入电话地址等联系信息..."></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" v-if="isSettingNull">立即创建</el-button>
                            <el-button type="primary" @click="onEditSubmit" v-if="!isSettingNull">更新</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 轮播图设置</span>
                我的行程
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "BasicSetting",
        data(){
            return {
                form:{
                    id:'',
                    name:'',                //网站名称
                    pictureUrl:'',          //网站图标
                    hasEnglishName:false,   //是否有英文名称
                    englishName:'',          //英文名称
                    hasParent:false,         //是否有父网站
                    parentName:'',           //父网站名称
                    copyright:'',                //版权信息
                    contactInfo:''              //联系信息
                },
                fileList:[],                  //上传文件列表
                isSettingNull:true,            //设置是否为空
                currentPicture:''              //当前图标位置
            }
        },mounted(){
            this.getBasicSetting();
        },
        methods:{
            getBasicSetting(){
                this.axios.get('http://localhost:8088/basic_setting/getOne').then((res) =>{
                    if(res.data!=""){
                    this.form = res.data;
                    this.isSettingNull = false;
                    this.currentPicture = "static/" + this.form.pictureUrl;
                }

                });
            },
            onSubmit(){
                this.axios.post(
                    'http://localhost:8088/basic_setting/save',{
                        name:this.form.name,
                        pictureUrl:this.form.pictureUrl,
                        hasEnglishName:this.form.hasEnglishName,
                        englishName:this.form.englishName,
                        hasParent:this.form.hasParent,
                        parentName:this.form.parentName,
                        copyright:this.form.copyright,
                        contactInfo:this.form.contactInfo
                    }).then((res=> {
                    if (res.data.code == 0) {
                        this.addSuccess();
                        this.getBasicSetting();
                    } else {
                        this.addFailed();
                    }
                    })
                )
            },
            onEditSubmit(){
                this.axios.post(
                'http://localhost:8088/basic_setting/update',{
                    id:this.form.id,
                    name:this.form.name,
                    pictureUrl:this.form.pictureUrl,
                    hasEnglishName:this.form.hasEnglishName,
                    englishName:this.form.englishName,
                    hasParent:this.form.hasParent,
                    parentName:this.form.parentName,
                    copyright:this.form.copyright,
                    contactInfo:this.form.contactInfo
                }).then((res=> {
                if (res.data.code == 0) {
                    this.editSuccess();
                    this.getBasicSetting();
                } else {
                    this.editFailed();
                }
            })
        )
            },
            //文件上传前的前的钩子函数
            //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isGIF && !isPNG && !isBMP) {
                    this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
            },
            //文件上传成功钩子函数
            handleSucess(res,file){
                this.$message({
                    type:'info',
                    message:'图片上传成功！',
                    duration:3000
                });
                if(file.response.code==0){
                    this.form.pictureUrl = file.response.msg;
                }
            },
            handleExceed(){
                this.$message({
                    message:"请先删除已上传图片",
                    type:"warning"
                });
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
            }
        }
    }
</script>

<style scoped>
.el-tabs{
    margin: 20px;
    min-height:350px;
}
#basic-setting-form{
    margin-top: 10px;
    width: 600px;
}
    .el-form-item img{
        width: 146px;
        height: 146px;
        display: inline-block;
    }
</style>