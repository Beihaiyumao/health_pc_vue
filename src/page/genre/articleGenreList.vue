<template>
	<div>
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="articleGenreList" tyle="width: 100%">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="250">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="articleGenreCode" label="文章分类CODE" width="250">
			</el-table-column>
			<el-table-column prop="articleGenreName" label="文章分类名称" width="250">
			</el-table-column>
			<el-table-column prop="createTime" label="添加时间" width="250">
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<el-button @click="updateGenreName(scope.row.healthyArticleGenreId)" size="small" type="primary">
						修改
					</el-button>
					<el-button @click="handleDelete(scope.row.healthyArticleGenreId)" size="small" type="danger">
						删除
					</el-button>
				</template>
			</el-table-column>
		
		</el-table>
		<div class="updown">
			<el-pagination @size-change="handleSizeChange" @current-change="changeCurrentPage"
			  :current-page="pageNum" :page-sizes="[10, 15, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				articleGenreList: [], //用户信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				loading: '',
				pages: '', //一共多少页
				pageNum: 1, //当前页数
				pageSize: 10 ,//每页多少数据
				healthyArticleGenreId:'',
				articleGenreName:'',
			}
		},
		mounted: function() {
			this.loading = true;
			this.getArticleGenre();
		},
		methods: {
			//获取文章分类列表
			getArticleGenre() {
				this.$ajax({
					method: 'get',
					url: '/admin/selectAllArticleGenre?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize+'&all='+100,
	
				}).then(e => {
					console.log(e);
					this.articleGenreList = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pages = e.data.pages;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.articleGenreList[i].createTime = this.renderTime(e.data.list[i].createTime);
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
				this.getArticleGenre();
	
			},
			//每页显示多少条数据
			handleSizeChange(val) {
				this.pageSize=val;
				this.getArticleGenre();
			},
			//删除文章分类
			handleDelete(id) {
				this.healthyArticleGenreId = id;
				this.$confirm('确定删除该分类', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.sureDeleteArticleGenre();
				
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			sureDeleteArticleGenre() {
				this.$ajax({
					method: 'get',
					url: '/admin/deleteHealthArticleGenreById?healthyArticleGenreId=' + this.healthyArticleGenreId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getArticleGenre();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			//修改分类名称
			updateGenreName(id){
				this.healthyArticleGenreId = id;
				this.$prompt('请输入新的名称', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputErrorMessage: '请输入新的名称'
				}).then(({
					value
				}) => {
					this.articleGenreName = value;
					this.sureUpdateGenreName();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消修改'
					});
				});
			},
			sureUpdateGenreName(){
				this.$ajax({
					method: 'get',
					url: '/admin/updateHealthArticleGenre?healthyArticleGenreId=' + this.healthyArticleGenreId+'&articleGenreName='+this.articleGenreName,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getArticleGenre();
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
