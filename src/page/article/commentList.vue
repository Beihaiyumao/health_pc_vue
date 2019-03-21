<template>
	<div id="app">
		<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="commentList">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="180">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="content" label="评论内容" width="240">
			</el-table-column>

			<el-table-column prop="userName" label="评论者用户名" width="180">
			</el-table-column>

			<el-table-column prop="email" label="评论者邮箱" width="180">
			</el-table-column>
			<el-table-column prop="articleName" label="所属文章标题" width="260">
			</el-table-column>

			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="deleteComment(scope.row.commentId)" size="small" type="danger">
						删除评论
					</el-button>
					<el-button @click="handleDelete(scope.row.userId)" size="small" type="danger">
						拉黑用户
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
				commentList: [], //评论信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				userId: '',
				msg: '',
				loading: '',
				commentId: '', //评论id
			}
		},
		mounted: function() {
			this.loading = true;
			this.getCommentInfo();
		},
		methods: {
			//获取评论列表
			getCommentInfo() {
				this.$ajax({
					method: 'get',
					url: '/admin/allArticleComment?currentPage=' + this.currentPage,

				}).then(e => {
					console.log(e);
					this.commentList = e.data.list;
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
				this.getCommentInfo();

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
				this.getCommentInfo();
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
						this.getCommentInfo();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			deleteComment(id) {
				this.commentId = id;
				this.$confirm('确定删除此评论?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerDeleteComment();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			suerDeleteComment() {
				this.$ajax({
					method: 'get',
					url: '/admin/deleteCommentById?commentId=' + this.commentId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getCommentInfo();
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
</style>
