<template>
	<div id="app">
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="feedbackList">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="100">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="username" label="反馈者用户名" width="155">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="150">
			</el-table-column>
			<el-table-column prop="phone" label="注册时手机号" width="155">
			</el-table-column>
			<el-table-column prop="msg" label="反馈内容" width="240">
			</el-table-column>
			<el-table-column prop="wechat" label="联系方式" width="155">
			</el-table-column>
			<el-table-column prop="createTime" label="反馈时间" width="180">
			</el-table-column>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button @click="handleDelete(scope.row.userFeedbackId)" size="small" type="danger">
						删除
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
				feedbackList: [],
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				userFeedbackId: '',
				loading: '',
				msg: '',
				pages: '', //一共多少页
				pageNum: 1, //当前页数
				pageSize: 10 //每页多少数据
			}
		},
		mounted: function() {
			this.loading = true;
			this.getUserFeedback();
		},
		methods: {
			//获取用户反馈列表
			getUserFeedback() {
				this.$ajax({
					method: 'get',
					url: '/admin/selectFeedback?currentPage=' + this.currentPage + '&msg=' + this.msg + '&pageSize=' + this.pageSize,

				}).then(e => {
					console.log(e);
					this.feedbackList = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pages = e.data.pages;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.feedbackList[i].createTime = this.renderTime(e.data.list[i].createTime);
					};
				})
			},
			//时间转换
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1550).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			},
			//选择第几页
			changeCurrentPage(vl) {
				this.currentPage = vl;
				this.getUserFeedback();

			},
			//每页显示多少条数据
			handleSizeChange(val) {
				this.pageSize = val;
				this.getUserFeedback();
			},
			//删除反馈
			handleDelete(id) {
				this.userFeedbackId = id;
				this.$confirm('确定删除此反馈?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerDeleteFeedback();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//确定删除反馈
			suerDeleteFeedback() {
				this.$ajax({
					method: 'get',
					url: '/admin/deleteFeedback?userFeedbackId=' + this.userFeedbackId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getUserFeedback();
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
