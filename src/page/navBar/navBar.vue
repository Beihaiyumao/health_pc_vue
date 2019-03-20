<template>
	<div class="navBar">
		<div class="header ml-200">
			<h1 class="title">
				<span>UpHealth后台操作系统</span>
				<el-dropdown class="user-handle">
					<!-- <span class="el-dropdown-link" style="cursor: pointer;">
                        用户管理<i class="el-icon-arrow-down el-icon--right"></i>
                        </span> -->
					<div class="avatar-wrap">
						<!-- 			<img :src="userInfo.avatar" style="width:50px;height:50px"> -->
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="handlePerson">
							个人中心
						</el-dropdown-item>
						<el-dropdown-item @click.native="handleLogout">
							退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</h1>
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
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-news"></i>
						<!-- <span>导航一</span> -->
						<span>管理员用户管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/users">用户列表</el-menu-item>
						<el-menu-item index="/navBar/">新增管理员</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-tickets"></i>
						<!-- <span>导航一</span> -->
						<span>文章管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/">新增文章</el-menu-item>
						<el-menu-item index="/navBar/users">评论列表</el-menu-item>
						<el-menu-item index="/navBar/users">评论回复列表</el-menu-item>
						<el-menu-item index="/navBar/users">待审核文章列表</el-menu-item>
						<el-menu-item index="/navBar/">审核未通过列表</el-menu-item>
						<el-menu-item index="/navBar/">审核已通过列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-question"></i>
						<!-- <span>导航一</span> -->
						<span>问题管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/">问题列表</el-menu-item>
						<el-menu-item index="/navBar/users">问题回答列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-message"></i>
						<!-- <span>导航一</span> -->
						<span>用户反馈</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/navBar/categoryIndex">用户反馈</el-menu-item>
						<!-- <el-menu-item index="/navBar/users">用户管理页</el-menu-item> -->
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
	import {
		mapState
	} from "vuex"
	export default {
		name: "navBar",
		computed: {
			routes() {
				return this.$router.matched
			},
			...mapState(["userInfo"])
		},
		methods: {
			handlePerson() {
				this.$router.push("/navBar/userEdit")
			},
			handleLogout() {
				this.$axios.get("/logout").then(res => {
					if (res.code == 200) {
						//   let payload={
						//       userInfo:"",
						//       avatar:"",
						//       email:"",
						//       desc:""
						//   }
						this.$message.success("退出登录成功")
						//   this.$store.commit("SET_USERINFO",payload)
						this.$router.push("/login")
					} else {
						this.$massage.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			}
		},
		created() {
			console.log(this.$route)
			console.log(this.$router)
		}

	};
</script>

<style>

</style>

<style scoped lang="scss">
	.navBar {
		.title {
			text-align: center;
			font-weight: 600;
			line-height: 60px;
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
</style>
