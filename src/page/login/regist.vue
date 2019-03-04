<template>
	<div>
		<div class="dowebok"v-model="formData">
        <div class="logo"></div>
         <div class="form-item-regist">
            <input v-model="formData.username" type="text" autocomplete="off" placeholder="用户名">
            <p class="tipUsername">用户名错误</p>
        </div>
        <div class="form-item-regist">
            <input  v-model="formData.password" type="password" autocomplete="off" placeholder="登录密码">
            <p class="tip">密码不正确</p>
        </div>
        <div class="form-item-regist">
            <input  v-model="formData.tpassword" type="password" autocomplete="off" placeholder="确认登录密码">
            <p class="tip0">确认密码不为空</p>
            <p class="tip1">密码不一致，请重新输入</p>
        </div>
         <div class="form-item-regist">
            <input  v-model="formData.email" type="text" autocomplete="off" placeholder="邮箱">
            <p class="tipEmail">请输入合法的邮箱地址</p>
        </div>
        <div class="form">
            <input  v-model="formData.identifying" type="text" autocomplete="off" placeholder="验证码">
            <p class="tipIde">验证码格式错误</p>
            <p class="tipIdeisfalse">验证码错误,请重试</p>
            <img :src="imge" @click="getNewImgVerify"  height="45" width="100"/>
        </div>
        <div class="form-item-regist"><button id="submit"@click="regist">注 册</button></div>
        <div class="reg-bar">
            <router-link :to="{ name: 'login'}" class="reg">登录</router-link>
            <a class="forget" href="javascript:">忘记密码</a>
        </div>
    </div>
         <div id="myAlert2" class="alert alert-warning">
    <a href="#" class="close" data-dismiss="alert">&times;</a>
    <p style="text-align: center;">{{msg}}</p>
    </div>
	</div>
</template>

<script>export default {
	data() {
		return {
			formData: {
				username: sessionStorage.username,
				password: '',
				tpassword: '',
				email: '',
				identifying: ''
			},
			imge:'http://localhost:8002/user/getImgVerify',
			msg:''
		}
	},
	methods: {
		regist() {
			this.$ajax({
				method: 'POST',
				url: '/user/regist',
				data:this.formData
			}).then(e=>{
				console.log(e);
				if(e.data.code==200){
					alert(e.data.msg);
				}
				else{
					alert(e.data.msg);
					router.push({path:decodeURIComponent(url)});
				}
			})
		},
		getNewImgVerify(){
			this.imge=this.imge+'?'+Math.random();
		}
	}
}</script>

<style>* {
	margin: 0;
	padding: 0;
}

html {
	height: 100%;
}

body {
	height: 100%;
	background: #fff url(../../assets/images/login/backgroud.png) 50% 50% no-repeat;
	background-size: cover;
}

.dowebok {
	position: absolute;
	left: 50%;
	top: 43%;
	width: 510px;
	height: 700px;
	margin: -300px 0 0 -215px;
	border: 1px solid #fff;
	border-radius: 20px;
	overflow: hidden;
}

.logo {
	width: 104px;
	height: 104px;
	margin: 10px auto 20px;
	background: url(../../assets/images/login/login.png) 0 0 no-repeat;
}

.form-item-regist {
	position: relative;
	width: 360px;
	margin: 0 auto;
	padding-bottom: 30px;
}

.form-item-regist input {
	width: 360px;
	height: 48px;
	padding-left: 70px;
	border: 1px solid #fff;
	border-radius: 25px;
	font-size: 18px;
	color: #fff;
	background-color: transparent;
	outline: none;
}

.form {
	position: relative;
	width: 360px;
	margin: 0 auto;
	padding-bottom: 30px;
}

.form input {
	width: 250px;
	height: 48px;
	padding-left: 70px;
	border: 1px solid #fff;
	border-radius: 25px;
	font-size: 18px;
	color: #fff;
	background-color: transparent;
	outline: none;
}

.form-item-regist button {
	width: 360px;
	height: 50px;
	border: 0;
	border-radius: 25px;
	font-size: 18px;
	color: #1f6f4a;
	outline: none;
	cursor: pointer;
	background-color: #fff;
}

#username {
	background: url(../../assets/images/login/username.png) 20px 11px no-repeat;
}

#password {
	background: url(../../assets/images/login/password.png) 23px 11px no-repeat;
}

#tpassword {
	background: url(../../assets/images/login/password.png) 23px 11px no-repeat;
}

#email {
	background: url(../../assets/images/login/emil.png) 20px 14px no-repeat;
}

#identifying {
	background: url(../../assets/images/login/identifying.png) 20px 10px no-repeat;
}

#myAlert2 {
	display: none;
}

.tip,
.tip1,
.tip0,
.tipIdeisfalse {
	display: none;
	position: absolute;
	left: 20px;
	top: 52px;
	font-size: 14px;
	color: #f50;
}

.tipIde {
	display: none;
	position: absolute;
	left: 20px;
	top: 52px;
	font-size: 14px;
	color: #f50;
}

.tipEmail {
	display: none;
	position: absolute;
	left: 20px;
	top: 52px;
	font-size: 14px;
	color: #f50;
}

.tipUsername {
	display: none;
	position: absolute;
	left: 20px;
	top: 52px;
	font-size: 14px;
	color: #f50;
}

.reg-bar {
	width: 360px;
	margin: 20px auto 0;
	font-size: 14px;
	overflow: hidden;
}

.reg-bar a {
	color: #fff;
	text-decoration: none;
}

.reg-bar a:hover {
	text-decoration: underline;
}

.reg-bar .reg {
	float: left;
}

.reg-bar .forget {
	float: right;
}

.dowebok ::-webkit-input-placeholder {
	font-size: 18px;
	line-height: 1.4;
	color: #fff;
}

.dowebok :-moz-placeholder {
	font-size: 18px;
	line-height: 1.4;
	color: #fff;
}

.dowebok ::-moz-placeholder {
	font-size: 18px;
	line-height: 1.4;
	color: #fff;
}

.dowebok :-ms-input-placeholder {
	font-size: 18px;
	line-height: 1.4;
	color: #fff;
}

@media screen and (max-width: 500px) {
	* {
		box-sizing: border-box;
	}
	.dowebok {
		position: static;
		width: auto;
		height: auto;
		margin: 0 30px;
		border: 0;
		border-radius: 0;
	}
	.logo {
		margin: 50px auto;
	}
	.form-item-regist {
		width: auto;
	}
	.form-item-regist input,
	.form-item-regist button,
	.reg-bar {
		width: 100%;
	}
}</style>
