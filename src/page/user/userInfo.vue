<template>
	<div>

		<Head></Head>
		<!--栅格系统个人中心-->
		<div class="container">
			<div class="row">
				<div class="col-md-2">
					<table class="table table-bordered table-hover success">

						<tr>
							<td class="active success">
								<h2>
								<a
									href=""
									style="color: black">个人中心</a>
							</h2></td>
						</tr>
						<tr>
							<td class="active">
								<a href="" style="color: black">网站首页</a>
							</td>
						</tr>
						<tr>
							<td class="active">
								<a href="" style="color: black">资料修改</a>
							</td>
						</tr>
						<tr>
							<td class="active">
								<a href="" style="color: black">修改密码</a>
							</td>
						</tr>
						<tr>
							<td class="active">
								<a href="" style="color: black">注销用户</a>
							</td>
						</tr>
						<tr>
							<td class="active">
								<a href="#" style="color: black">退出登陆</a>
							</td>
						</tr>

					</table>
				</div>
				<div class="col-md-10">
					<table class="table table-bordered table-hover success">

						<div class="alert alert-warning">
							<a href="#" class="close" data-dismiss="alert"> &times; </a> <strong>为了更好的为您提供服务，请您完善个人信息！</strong>
						</div>
						<tr>
							<td class="active success">
								<h4>个人资料</h4></td>
						</tr>
						<tr>
							<td class="active">
								<h6>用户名:{{username}}</h6></td>
						</tr>
						<tr>
							<td class="active">
								<h6>
									头像:<img alt="" class="img-circle" width="50px" height="50px"
										src="">
								</h6></td>
						</tr>
						<tr>
							<td class="active">
								<h6>手机号:{{phone}}</h6></td>
						</tr>
						<tr>
							<td class="active">
								<h6>邮箱:{{email}}</h6></td>
						</tr>

						<tr>
							<td class="active">
								<h6>联系地址:{{address}}</h6></td>
						</tr>
						<tr>
							<td class="active">
								<a href="" class="btn btn-success btn-group btn-group-justified">编辑资料</a>
							</td>
						</tr>

					</table>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import head from '@/page/index/head.vue'
	export default {
		mounted() {
			this.userInfo();
		},
		data() {
			return {
				username: '',
				pic:'',
				phone:'',
				sex:'',
				email:'',
				address:'',
				userId: sessionStorage.getItem("userId")
			}
		},
		methods: {
			userInfo() {
				this.$ajax.get('/user/selectUserInfo?userId=' + this.userId).then(e => {
					if(e.data.code = 100) {
						console.log(e.data.object);
						this.username = e.data.object.username;
						this.pic=e.data.object.pic;
						this.phone=e.data.object.phone;
						this.sex=e.data.object.sex;
						this.email=e.data.object.email;
						this.address=e.data.object.address;
						console.log(this.username);
					}
				})
			}
		},

		components: {
			'Head': head
		},

	}
</script>

<style>
@import "//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css";
</style>