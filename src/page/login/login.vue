<template>
	
	<div>
		<div class="dowebok" v-model="formData">

			<div class="logo"></div>
			<div class="form-item-login">
				<input v-model="formData.email" id="username" type="text" autocomplete="off" placeholder="邮箱">

				<p class="tipEmail">请输入合法的邮箱地址</p>
			</div>
			<div class="form-item-login">
				<input v-model="formData.password" id="password" type="password" autocomplete="off" placeholder="登录密码">
				<p class="tipPassword">请输入密码</p>
			</div>
			<div class="form-item-login"><button id="submit" @click="login">登 录</button></div>
			<div class="reg-bar">
				<router-link :to="{ name: 'regist'}" class="reg">立即注册</router-link>
				<a class="forget" href="">忘记密码</a>
			</div>
		</div>
		<div id="" v-if="showPrise" class="alert alert-warning">
			<a href="#" class="close" data-dismiss="alert">&times;</a>
			<p style="text-align: center;">{{msg}}</p>
		</div>
	</div>
</template>
 <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script>

	export default {
		  mounted(){
  /*页面挂载获取session，如果存在username的session，则跳转到主页，不需登录*/
    if(sessionStorage.getItem("username")){
        this.$router.push('/index')
    }
  },
		data() {
			return {
				formData: {
					email:'',
					password:''
				},
				showPrise:true,
				msg:'',

			}
		},
		methods: {
			login() {
				
				console.log(this.formData);
				this.$ajax({
					method:'post',
					url:'/user/login',
					data:this.formData
				}).then(a => {
					console.log(a);
					if(a.data.code==200){
						showPrise:true;
						alert(a.data.msg);
						this.msg=a.data.msg;
					}
					else{
						sessionStorage.setItem("username",a.data.object.username);
						sessionStorage.setItem("userId",a.data.object.userId);
						console.log(sessionStorage.getItem("username"));
						this.$router.push("/index");
					}
				})
			}
		}
	}
</script>

<style>
	@import 'https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css';
	* {
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
		top: 50%;
		width: 430px;
		height: 550px;
		margin: -300px 0 0 -215px;
		border: 1px solid #fff;
		border-radius: 20px;
		overflow: hidden;
	}
	
	.logo {
		width: 104px;
		height: 104px;
		margin: 50px auto 80px;
		background: url(../../assets/images/login/login.png) 0 0 no-repeat;
	}
	
	.form-item-login {
		position: relative;
		width: 360px;
		margin: 0 auto;
		padding-bottom: 30px;
	}
	
	.form-item-login input {
		width: 300px;
		height: 48px;
		padding-left: 70px;
		border: 1px solid #fff;
		border-radius: 25px;
		font-size: 18px;
		color: #fff;
		background-color: transparent;
		outline: none;
	}
	
	.form-item-login button {
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
		background: url(../../assets/images/login/emil.png) 20px 14px no-repeat;
	}
	
	#password {
		background: url(../../assets/images/login/password.png) 23px 11px no-repeat;
	}
	
	#myAlert2 {
		display: none;
	}
	
	.tipEmail {
		display: none;
		position: absolute;
		left: 20px;
		top: 52px;
		font-size: 14px;
		color: #f50;
	}
	
	.tipPassword {
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
		.form-item-login {
			width: auto;
		}
		.form-item-login input,
		.form-item-login button,
		.reg-bar {
			width: 100%;
		}
	}
</style>