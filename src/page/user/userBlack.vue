<template>
	<div id="app">
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="userLists">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="70">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="120">
			</el-table-column>

			<el-table-column prop="password" label="密码" width="120">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="70" :formatter="formatSex">
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
		<div class="updown">
			<el-pagination @size-change="handleSizeChange" @current-change="changeCurrentPage" :current-page="pageNum"
			 :page-sizes="[10, 15, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
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
				pages: '', //一共多少页
				pageNum: 1, //当前页数
				pageSize: 10 //每页多少数据
			}
		},
		mounted: function() {
			this.loading = true;
			this.getUserInfo();
		},
		methods: {
			//性别显示转换
			formatSex: function(row, column) {
				return row.sex == 0 ? '男' : row.sex == 1 ? '女' : '未知';
			},
			//获取用户列表
			getUserInfo() {
				this.$ajax({
					method: 'get',
					url: '/admin/allDeleteUser?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize,

				}).then(e => {
					console.log(e);
					this.userLists = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pages = e.data.pages;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.loading = false;

					for (var i = 0; i < e.data.list.length; i++) {
						this.userLists[i].blackTime = this.renderTime(e.data.list[i].blackTime);
					};
				})
			},
			//时间转换
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			},
			//选择第几页
			changeCurrentPage(vl) {
				this.currentPage = vl;
				this.getUserInfo();

			},
			//每页显示多少条数据
			handleSizeChange(val) {
				this.pageSize = val;
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

	.updown {
		position: fixed;
		right: 30%;
		bottom: 0;

	}
</style>
