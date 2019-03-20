<template>
	<div id="app">
		<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="userLists" tyle="width: 100%">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="320">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="320">
			</el-table-column>

			<el-table-column prop="password" label="密码" width="320">
			</el-table-column>

			<el-table-column label="操作" width="320">
				<template slot-scope="scope">
					<el-button @click="handleDelete(scope.row.adminId)" size="small" type="danger">
						删除
					</el-button>
				</template>
			</el-table-column>

		</el-table>
			<div>
				<el-button-group>
					<el-button @click="upPage" type="primary" icon="el-icon-arrow-left">上一页</el-button>

					<el-button @click="downPage" type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
				</el-button-group>
				<a>当前是第{{currentPage}}页</a>
				<a>一共有{{total}}条数据</a>
			</div>

	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				userLists: [], //用户信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				adminId: '',
				loading: '',
			}
		},
		mounted: function() {
			this.loading = true;
			this.getAdminInfo();
		},
		methods: {
			//获取用户列表
			getAdminInfo() {
				this.$ajax({
					method: 'get',
					url: '/admin/selectAllAdmin?currentPage=' + this.currentPage,

				}).then(e => {
					console.log(e);
					this.userLists = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.loading = false;
				})
			},
			//上一页
			upPage() {
				if (this.isFirstPage == false) {
					this.currentPage = this.currentPage - 1;
				} else {
					this.currentPage = 1;
					this.$message({
						message: '当前是第一页哦',
						type: 'warning'
					});
				}
				this.getAdminInfo();

			},
			//下一页
			downPage() {
				if (this.isLastPage == false) {
					this.currentPage = this.currentPage + 1;
				} else {
					this.$message({
						message: '当前是最后一页哦',
						type: 'warning'
					});
				}
				this.getAdminInfo();
			},
			//删除
			handleDelete(id) {
				this.adminId = id;
				this.$confirm('确定删除该管理员', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteUser();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//确定拉黑用户
			deleteUser() {
				this.$ajax({
					method: 'get',
					url: '/admin/deleteAdmin?adminId=' + this.adminId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getAdminInfo();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			}
		}
	}
</script>

<style>
	#app {
		margin-top: 0px;
	}
</style>
