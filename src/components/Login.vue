<template>
    <div id="Login">
        <div class="login_div_form">
            <h2>通用后台管理系统</h2>
            <el-form :model="loginForm" :rules="loginRules" label-width="80px">
                <el-form-item label="账户：" prop="name">
                    <el-input v-model="loginForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="captcha">
                    <el-input v-model="loginForm.captcha" @keyup.enter.native="submitForm"></el-input>
                </el-form-item>
                <el-form-item>
                    <ul class="captcha_ul">
                        <li>
                            <img :src="src" alt="如果看不清，请单击刷新验证码！" @click="refreshCode">
                        </li>
                        <li>
                            <span @click="refreshCode">
                                点击刷新
                            </span>
                        </li>
                    </ul>
                </el-form-item>
                <el-button type="primary" @click.stop="submitForm">登录</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login.vue",
        data() {
            return {
                loginForm:{
                    name:"",
                    password:"",
                    captcha:""
                },
                src:"",
                loginRules:{
                    name:[
                        {required:true,message:'请输入登录账号',trigger:'blur'},
                        {min:1,max:12,message:'长度在1到12个字符',trigger:'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 1, max: 12, message: '密码长度为6-12', trigger: 'blur'}
                    ],
                    captcha: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {min: 5, max: 5, message: '验证码长度为5', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted(){
            this.refreshCode();
        },
        methods: {
            submitForm(){
                this.axios.post(
                    'api/sys/login' + "?captcha=" + this.loginForm.captcha, {
                        username: this.loginForm.name,
                        password: this.loginForm.password
                    }).then((res => {
                    if (res.data.code == 0) {
                        this.$router.push({path:'/back'});
                    } else {
                        this.$message.error(res.data.msg);
                    }
                    })
                )
            },
            refreshCode(){
                this.src = "api/sys/captcha?t=" + new Date().getTime();
            },
            resetForm(){
                this.loginForm.name = '';
                this.loginForm.password = '';
                this.loginForm.captcha = '';
            }
        }
    }
</script>

<style scoped>
    ul,li{
        list-style: none;
    }
    .login_div_form{
        text-align: center;
        width: 400px;
        margin: 10% auto;
        background-color: #eff5fd;
        padding: 20px;
    }
    .login_div_form h2{
        margin-bottom:15px;
    }
    .login_div_form li{
        float: left;
        line-height: 55px;
        text-align: left;
    }
</style>