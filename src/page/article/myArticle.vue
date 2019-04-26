<template>
	<div id="app">
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="myArticle">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="100">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="title" label="文章标题" width="150">
			</el-table-column>
			<el-table-column prop="article" label="导语" width="180">
			</el-table-column>
			<el-table-column prop="pic" label="图片" width="120">
				<template slot-scope="scope">
					<img :src="scope.row.pic" class="avatar" style="height: 80px; width: 80px;">
				</template>
			</el-table-column>

			<el-table-column prop="author" label="作者" width="120">
			</el-table-column>
			<el-table-column prop="articleGenre" label="文章类别" width="120">
			</el-table-column>
			<el-table-column prop="articleState" label="文章审核状态" width="120">
			</el-table-column>
			<el-table-column prop="createTime" label="文章创建时间" width="240">
			</el-table-column>

			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="getArticleInfo(scope.row.articleId)" size="small" type="primary">
						查看详情
					</el-button>
					<el-button @click="deleteArticle(scope.row.articleId)" size="small" type="danger">
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
				myArticle: [], //文章信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				msg: '',
				loading: '',
				articleId: '', //文章id
				pages: '', //一共多少页
				pageNum: 1, //当前页数
				pageSize: 10 //每页多少数据
			}
		},
		mounted: function() {
			this.loading = true;
			this.getMyArticle();
		},
		methods: {
			//获取我发布的文章列表
			getMyArticle() {
				this.$ajax({
					method: 'get',
					url: '/healthyArticle/selectAllMyCreateHealthArticle?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize
					+'&userId='+sessionStorage.getItem("doctorId")+'&role='+'000100000020',

				}).then(e => {
					console.log(e);
					this.myArticle = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pages = e.data.pages;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.myArticle[i].createTime = this.renderTime(e.data.list[i].createTime);
						this.myArticle[i].pic="https://xiaoyc.com.cn/health/"+e.data.list[i].pic;
						if(e.data.list[i].articleState == '000000000010'){
							this.myArticle[i].articleState="未审核";
						}else if(e.data.list[i].articleState=='000000000020'){
							this.myArticle[i].articleState="审核通过";
						}else{
							this.myArticle[i].articleState="审核不通过";
						}
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
				this.getMyArticle();

			},
			//每页显示多少条数据
			handleSizeChange(val) {
				this.pageSize = val;
				this.getMyArticle();
			},
			//查看详情 params 不显示参数
			getArticleInfo(id) {
				this.$router.push({
					path: '/navBar/articleInfo',
					query: {
						articleId: id,
						outExaState:true,
						passExaState:true,
					}
				});
			},
			//删除文章
			deleteArticle(id) {
				this.articleId = id;
				this.$confirm('确定删除此文章?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerDeletArticle();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			suerDeletArticle() {
				this.$ajax({
					method: 'get',
					url: '/healthyArticle/deleteHealthyArticleById?articleId=' + this.articleId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getMyArticle();
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
