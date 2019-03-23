<template>
	<div id="app">
		<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="userLists">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="70">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="120">
			</el-table-column>

			<el-table-column prop="password" label="密码" width="120">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="70">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="170">
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="120">
			</el-table-column>
			<el-table-column prop="address" label="家庭住址" width="155">
			</el-table-column>
			<el-table-column prop="blackMsg" label="拉黑原因" width="155">
			</el-table-column>
			<el-table-column prop="blackTime" label="拉黑时间" width="155">
			</el-table-column>

			<el-table-column label="操作" width="155">
				<template slot-scope="scope">
					<el-button @click="cancelDeleteUser(scope.row.userId)" size="small" type="danger">
						取消拉黑
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
				loading: '',
				userId: '',
			}
		},
		mounted: function() {
			this.loading = true;
			this.getUserInfo();
		},
		methods: {
			//获取用户列表
			getUserInfo() {
				this.$ajax({
					method: 'get',
					url: '/admin/allDeleteUser?currentPage=' + this.currentPage,

				}).then(e => {
					console.log(e);
					this.userLists = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.userLists[i].blackTime = this.renderTime(e.data.list[i].blackTime);
						if (e.data.list[i].sex == 0) {
							this.userLists[i].sex = '男';
						} else {
							this.userLists[i].sex = '女';
						}
					};
				})
			},
			//时间转换
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
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
				this.getUserInfo();

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
				this.getUserInfo();
			},
			//取消拉黑
			cancelDeleteUser(id) {
				this.userId = id;
				this.$confirm('确定取消拉黑该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.sureCancelDeleteUser();

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//确定取消拉黑用户
			sureCancelDeleteUser() {
				this.$ajax({
					method: 'get',
					url: '/admin/cancelBlackUser?userId=' + this.userId,
				}).then(e => {
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getUserInfo();
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
