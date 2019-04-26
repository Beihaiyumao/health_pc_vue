<template>
	<div>
		<body class="login-page sidebar-collapse">
			<div class="page-header" filter-color="orange">
				<div class="page-header-image" style="background-image: url(../../assets/img/login.jpg);"></div>
				<div class="container">
					<div class="col-md-4 content-center">
						<div class="card card-login card-plain">
							<form class="form" method="" action="" v-model="formData">
								<div class="header header-primary text-center">
									<div class="logo-container">
										<img src="../../assets/img/logo.png" alt="">
									</div>
								</div>
								<div class="content">
									<div class="input-group form-group-no-border input-lg">
										<span class="input-group-addon">
											<i class="now-ui-icons users_circle-08"></i>
										</span>
										<input type="text" v-model="formData.username" class="form-control" placeholder="用户名">
									</div>
									<div class="input-group form-group-no-border input-lg">
										<span class="input-group-addon">
											<i class="now-ui-icons text_caps-small"></i>
										</span>
										<input type="password" v-model="formData.password" placeholder="密码" class="form-control" />
									</div>
									<div style="margin-top: 20px;">
										<el-radio v-model="role" label="1" border size="medium" style="color: #ebebeb;">管理员</el-radio>
										<el-radio v-model="role" label="2" border size="medium" style="color: #ebebeb;">医生用户</el-radio>
									</div>
								</div>
								<div class="footer text-center">
									<a @click="login" class="btn btn-primary btn-round btn-lg btn-block">登陆</a>
								</div>

							</form>
						</div>
					</div>
				</div>
				<footer class="footer">
					<div class="container">
						<div class="copyright">
							Copyright © 2019 UpHealth All Rights Reserved.
						</div>
					</div>
				</footer>
			</div>
		</body>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: '',
					email: '',
				},
				role: '1',
			}
		},
		methods: {
			login() {
				console.log(this.role);
				if (this.role == 1) {
					this.adminLogin();
				} else {
					this.doctorLogin();
				}
			},
			//管理员登陆
			adminLogin() {
				this.$ajax({
					method: 'POST',
					url: '/admin/adminLogin',
					data: this.formData,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.$router.push("/navBar");
						sessionStorage.setItem("username", e.data.object.username);
						sessionStorage.setItem("adminId", e.data.object.adminId);
						sessionStorage.setItem("admin", 200);
						localStorage.setItem("access_token",true);
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			//医生登录
			doctorLogin() {
				this.formData.email = this.formData.username;
				this.$ajax({
					method: 'POST',
					url: '/doctor/doctorLogin',
					data: this.formData,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.$router.push("/navBar");
						sessionStorage.setItem("username", e.data.object.username);
						sessionStorage.setItem("doctorId", e.data.object.doctorId);
						sessionStorage.setItem("doctor", 200);
						localStorage.setItem("access_token",true);
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},

		}
	}
</script>
<style>
	@import url("../../../static/css/bootstrap.min.css");
	@import url("../../../static/css/demo.css");
	@import url("../../../static/css/now-ui-kit.css");
</style>
<style>
	/* 	div {
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin: 0;
		font-family: 'microsoft yahei'; 
		background-image: url(../../assets/img/login.jpg);
	} */
	body {
		background-image: url(../../assets/img/login.jpg);
	}

	#app {
		margin-top: 0px;
	}
</style>
