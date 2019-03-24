<template>
	<div id="app">
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="replyList">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="70">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="commentInfo" label="评论内容" width="170">
			</el-table-column>
			<el-table-column prop="content" label="评论回复内容" width="170">
			</el-table-column>
			<el-table-column prop="userName" label="回复者用户名" width="120">
			</el-table-column>

			<el-table-column prop="email" label="回复者邮箱" width="150">
			</el-table-column>
			<el-table-column prop="createTime" label="回复时间" width="160">
			</el-table-column>
			<el-table-column prop="articleTitle" label="所属文章标题" width="200">
			</el-table-column>

			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="deleteReply(scope.row.replyId)" size="small" type="danger">
						删除回复
					</el-button>
					<el-button @click="handleDelete(scope.row.userId)" size="small" type="danger">
						拉黑用户
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
				replyList: [], //评论信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				userId: '',
				msg: '',
				loading: '',
				replyId: '', //评论id
				pages: '', //一共多少页
				pageNum: 1, //当前页数
				pageSize: 10 //每页多少数据
			}
		},
		mounted: function() {
			this.loading = true;
			this.getReplyInfo();
		},
		methods: {
			//获取评论回复列表
			getReplyInfo() {
				this.$ajax({
					method: 'get',
					url: '/admin/allCommentReply?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize,

				}).then(e => {
					console.log(e);
					this.replyList = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pages = e.data.pages;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.replyList[i].createTime = this.renderTime(e.data.list[i].createTime);
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
				this.getReplyInfo();

			},
			//每页显示多少条数据
			handleSizeChange(val) {
				this.pageSize = val;
				this.getReplyInfo();
			},
			//拉黑
			handleDelete(id) {
				this.userId = id;
				this.$prompt('请输入拉黑原因', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputErrorMessage: '请输入拉黑原因'
				}).then(({
					value
				}) => {
					this.msg = value;
					this.deleteUser();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消拉黑'
					});
				});
			},
			//确定拉黑用户
			deleteUser() {
				this.$ajax({
					method: 'get',
					url: '/admin/blackUser?userId=' + this.userId + '&msg=' + this.msg,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getReplyInfo();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			//删除评论回复
			deleteReply(id) {
				this.replyId = id;
				this.$confirm('确定删除此评论?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerDeleteReply();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			suerDeleteReply() {
				this.$ajax({
					method: 'get',
					url: '/admin/deleteReplyById?replyId=' + this.replyId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getReplyInfo();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
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
