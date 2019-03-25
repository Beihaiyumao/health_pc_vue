<template>
	<div class="navBar">
		<div class="header ml-200">
			<el-container>
				<el-header style="text-align: right; font-size: 12px">
					<span>UpHealth后台操作系统</span>
					<el-dropdown>
						<i class="el-icon-setting" style="margin-right: 15px"></i>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item><a @click="changePassword">修改密码</a></el-dropdown-item>
							<el-dropdown-item><a @click="loginOut">退出登陆</a></el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span>{{username}}</span>
				</el-header>

			</el-container>
		</div>

		<div class="sider-bar">
			<el-menu :router="true" background-color="#545c64" text-color="#fff">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-news"></i>
						<!-- <span>导航一</span> -->
						<span>普通用户管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/users">用户列表</el-menu-item>
						<el-menu-item index="/navBar/userBlack">用户黑名单</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-news"></i>
						<!-- <span>导航一</span> -->
						<span>医生用户管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/doctor">医生列表</el-menu-item>
						<el-menu-item index="/navBar/addDoctor">新增医生</el-menu-item>
						<el-menu-item index="/navBar/doctorBlack">医生黑名单</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3" v-if="adminState">
					<template slot="title">
						<i class="el-icon-news"></i>
						<!-- <span>导航一</span> -->
						<span>管理员用户管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/adminList">管理员列表</el-menu-item>
						<el-menu-item index="/navBar/addAdmin">新增管理员</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-tickets"></i>
						<!-- <span>导航一</span> -->
						<span>文章管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/addArticle">新增文章</el-menu-item>
						<el-menu-item index="/navBar/commentList">评论列表</el-menu-item>
						<el-menu-item index="/navBar/replyList">评论回复列表</el-menu-item>
						<el-menu-item index="/navBar/waitExa">待审核文章列表</el-menu-item>
						<el-menu-item index="/navBar/outExa">审核未通过列表</el-menu-item>
						<el-menu-item index="/navBar/passExa">审核已通过列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-question"></i>
						<!-- <span>导航一</span> -->
						<span>问题管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/questionList">问题列表</el-menu-item>
						<el-menu-item index="/navBar/questionAnswer">问题回答列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-message"></i>
						<!-- <span>导航一</span> -->
						<span>用户反馈</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/feedback">用户反馈</el-menu-item>
					</el-menu-item-group>
				</el-submenu>

			</el-menu>
		</div>
		<div class="main-content ml-200">
			<router-view></router-view>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				adminState: false, //判断是不是超级管理员
			}
		},
		mounted: function() {
			this.username = sessionStorage.getItem("username");
			if (this.username === ("admin")) {
				this.adminState = true;
			}
		},
		methods: {
			//修改密码跳转路由
			changePassword() {
				this.$router.push("/navBar/changePassword");
			},
			//退出登陆
			loginOut() {
				sessionStorage.clear();
				this.$router.push("/login");
			}
		}

	};
</script>

<style>

</style>

<style scoped lang="scss">
	.navBar {
		.title {
			text-align: center;
			font-weight: 300;

			height: 60px;
			border-bottom: 1px solid #f1f1f1;
			font-size: 20px;
		}

		.ml-200 {
			margin-left: 200px;

		}

		.sider-bar {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			width: 200px;
			border-bottom: 1px solid #f1f1f1;
			overflow: hidden;
			background-color: #545c64;

			/deep/ {
				.el-menu {
					border-right: none
				}
			}


		}

		.main-content {
			padding: 15px;
		}
	}

	.user-handle {
		float: right;
		margin-right: 40px;
		margin-top: 5px;
	}

	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}
</style>
