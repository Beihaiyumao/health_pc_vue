<template>
	<div>
		<div class="login">
			<div id="myAlert2" class="alert alert-warning">
				<a href="#" class="close" data-dismiss="alert">&times;</a>
				<p style="text-align: center;"></p>
			</div>
			<form id="form">
				<div class="logo"></div>
				<div class="login_form1">
					<div class="user" v-model="formData">
						<input class="text_value1" v-model="formData.username" value="" name="username" type="text" id="username" placeholder="用户名">
						<input class="text_value1" v-model="formData.password" value="" name="password" type="password" id="password" placeholder="登录密码">
					</div>
					<button class="button"  @click="adminLogin">登录</button>
				</div>

				<div id="tip"></div>
				<div class="foot">
					Copyright © 2019 UpHealth All Rights Reserved.
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				formData: {
					username:'',
					password:''},
}
},
methods: {
		adminLogin() {
			this.$ajax({
					method:'POST',
					url:'/admin/adminLogin',
					data:this.formData,
				}).then(e=>{
					console.log(e);
					if(e.data.code==100){
						this.$message.success(e.data.msg);
						this.$router.push("/navBar");
						sessionStorage.setItem("username",e.data.object.username);
						sessionStorage.setItem("adminId",e.data.object.adminId);
						console.log(e);
					}else{
						this.$message.error(e.data.msg);
					}
				})
			}
		}
	}
</script>

<style>
	html,
	body {
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin: 0;
		font-family: 'microsoft yahei';
		background-image: url(../../assets/images/login/login_bg.jpg);
	}
	
	html {
		_height: auto;
		_padding: 50px 0 0px;
	}
	
	.login {
		width: 640px;
		height: 400px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -320px;
		margin-top: -200px;
	}
	
	.logo {
		background-image: url(../../assets/images/login/admin_logo.png);
		background-repeat: no-repeat;
		background-position: 30px center;
		height: 150px;
	}
	
	.login_form1 {
		height: 80px;
		margin-left: auto;
		margin-right: auto;
		width: 600px;
	}
	
	.login_form1 .user {
		background-image: url(../../assets/images/login/login_name_bg.jpg);
		width: 540px;
		height: 80px;
		float: left;
	}
	
	.login_form1 .button {
		background: url(../../assets/images/login/login_button.jpg);
		width: 50px;
		background-repeat: no-repeat;
		background-position: left center;
		height: 54px;
		float: left;
		display: block;
		text-indent: -9999px;
		border: none;
		margin-top: 10px;
		position: relative
	}
	
	.login_form1 .text_value1 {
		
		
		padding-left: 20px;
		padding-right: 10px;
		margin-top: 15px;
		width: 225px;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		color: #666;
		font-weight: bold;
		border: none;
		background-color: #f5f6f7
	}
	
	.foot {
		padding-top: 30px;
		text-align: center;
		color: #FFF;
		padding-right: 80px;
	}
	
	#tip {
		padding-top: 10px;
		color: #FFF;
		background-image: none;
		text-align: center;
		padding-right: 80px;
		font-size: 14px;
	}
	
	#myAlert2 {
		display: none;
	}
</style>