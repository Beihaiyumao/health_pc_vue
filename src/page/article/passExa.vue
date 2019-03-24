<template>
	<div id="app">
		<el-table stripe  v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="passExaList">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="100">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="title" label="文章标题" width="180">
			</el-table-column>
			<el-table-column prop="article" label="导语" width="180">
			</el-table-column>
			<el-table-column prop="pic" label="图片" width="150">
				<template slot-scope="scope">
					<img :src="scope.row.pic" class="avatar">
				</template>
			</el-table-column>

			<el-table-column prop="author" label="作者" width="130">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" width="160">
			</el-table-column>
			<el-table-column prop="changeAtricleStateTime" label="审核通过时间" width="160">
			</el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="getArticleInfo(scope.row.articleId)" size="small" type="primary">
						查看详情
					</el-button>
					<el-button @click="deletePassExaArticle(scope.row.articleId)" size="small" type="danger">
						删除文章
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
				passExaList: [{
					createTime: '',
				}], //文章信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				msg: '',
				loading: '',
				articleId: '', //文章id
			}
		},
		mounted: function() {
			this.loading = true;
			this.getPassExaArticle();
		},
		methods: {
			//获取审核通过文章列表
			getPassExaArticle() {
				this.$ajax({
					method: 'get',
					url: '/admin/passHelthyArticle?currentPage=' + this.currentPage,

				}).then(e => {
					console.log(e);
					this.passExaList = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.passExaList[i].createTime = this.renderTime(e.data.list[i].createTime);
					};
					for (var i = 0; i < e.data.list.length; i++) {
						this.passExaList[i].changeAtricleStateTime = this.renderTime(e.data.list[i].changeAtricleStateTime);
					}
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
				this.getPassExaArticle();

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
				this.getPassExaArticle();
			},
			//查看详情
			getArticleInfo(id) {
				this.$ajax({
					method: 'get',
					url: '/admin/blackUser?userId=' + this.userId + '&msg=' + this.msg,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getPassExaArticle();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			//删除审核通过文章
			deletePassExaArticle(id) {
				this.articleId = id;
				this.$confirm('确定删除此文章?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerDeletePassExaArticle();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			suerDeletePassExaArticle() {
				this.$ajax({
					method: 'get',
					url: '/healthyArticle/deleteHealthyArticleById?articleId=' + this.articleId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getPassExaArticle();
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
