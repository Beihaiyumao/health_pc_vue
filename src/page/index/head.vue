<template>
	<div>
		<!--页头-->
		<div>
			<div class=" container">
				<div class="row">
					<div class="col-md-10">
					</div>
					<div class="col-md-2">

						<div class="">
							<br>
							<router-link :to="{ name: 'login'}" v-if="loginTrue" class="btn btn-success">注册/登录</router-link>
							<p class="btn btn-success" @click="userInfo" v-if="loginTrueName">{{username}}</p>

						</div>

					</div>
				</div>
			</div>
			<nav class="navbar navbar-default">
				<div class="container">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				<span class="sr-only"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span> <span class="icon-bar"></span>
			</button>
						<a class="navbar-brand" href="">首页</a>
					</div>

					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse " id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav">

							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">健康报告 <span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">心理测评分析</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">国民体质检测</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">中医体质辨识</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">生理风险评估</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">基因检测报告</a>
									</li>
								</ul>
							</li>
							<li>
								<a href="#">健康检测</a>
							</li>
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">健康日志 <span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">膳食日志</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="">运动日志</a>
									</li>
								</ul>
							</li>
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">健康行动 <span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">健康管理目标</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">健康管理任务</a>
									</li>
								</ul>
							</li>
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">健康工具 <span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li role="separator" class="divider"></li>
									<li>
										<a href="">BMI计算器</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="">每日能量需求</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="">理想体重计算器</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="">腰臀比计算器</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">减掉一公斤</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">营养计算器</a>
									</li>
									<li role="separator" class="divider"></li>
									<li>
										<a href="#">运动能耗计算器</a>
									</li>
								</ul>
							</li>
							<li>
								<router-link :to="{ name: 'article'}" class="btn btn-success">健康百科</router-link>
							</li>
							<li>
								<form class="navbar-form navbar-left" role="search" action="" method="post">
									<div class="form-group">
										<input type="text" name="title" class="form-control" placeholder="请输入想要搜索的文章">
									</div>
									<button type="submit" class="btn btn-default">搜索</button>
								</form>
							</li>
						</ul>

					</div>
					<!-- /.navbar-collapse -->
				</div>
				<!-- /.container -->
			</nav>
			<!-- 导航栏结束-->
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			if(this.username != null) {
				this.loginTrue = false;
				this.loginTrueName = true;
			}
		},
		data() {
			return {
				username: sessionStorage.getItem("username"),
				loginTrue: true,
				loginTrueName: false,
				userId: sessionStorage.getItem("userId")
			}
		},
		methods: {
			userInfo() {
				console.log(this.userId);

				console.log(this.loginTrue);
				console.log(this.loginTrueName);
				this.$router.push("/userInfo");
			}
		}
	}
</script>
<style>
	@import "//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css";
</style>