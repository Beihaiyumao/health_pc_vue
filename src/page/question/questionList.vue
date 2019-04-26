<template>
	<div id="app">
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="questionList">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="180">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="username" label="提问者名称" width="180">
			</el-table-column>
			<el-table-column prop="sex" label="提问者性别" width="180" :formatter="formatSex">
			</el-table-column>
			<el-table-column prop="title" label="问题标题" width="240">
			</el-table-column>
			<el-table-column prop="questionGenre" label="归属类型" width="180">
			</el-table-column>
			<el-table-column prop="createTime" label="提问时间" width="180">
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button @click="getQuestionInfo(scope.row.questionId)" size="small" type="primary">
						查看详情
					</el-button>
					<el-button @click="handleDelete(scope.row.questionId)" size="small" type="danger" v-if="admin">
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
				questionList: [], //用户信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				questionId: '',
				loading: '',
				pages: '', //一共多少页
				pageNum: 1, //当前页数
				pageSize: 10 ,//每页多少数据
				genre:'',
				doctor: false,
				admin: false,
				adminState: false, //判断是不是超级管理员
			}
		},
		mounted: function() {
			this.loading = true;
			this.getQuestionList();
			this.username = sessionStorage.getItem("username");
			if (this.username == "admin") {
				this.adminState = true;
			}
			if (sessionStorage.getItem("doctor") == 200) {
				this.doctor = true;
			}
			if (sessionStorage.getItem("admin") == 200) {
				this.admin = true;
			}
		},
		methods: {
			//性别显示转换
			formatSex: function(row, column) {
				return row.sex == 0 ? '男' : row.sex == 1 ? '女' : '未知';
			},
			//获取问题列表
			getQuestionList() {
				this.$ajax({
					method: 'get',
					url: '/question/allQuestion?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize+'&genre='+this.genre,

				}).then(e => {
					console.log(e);
					this.questionList = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pages = e.data.pages;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.questionList[i].createTime = this.renderTime(e.data.list[i].createTime);
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
				this.getQuestionList();

			},
			//每页显示多少条数据
			handleSizeChange(val) {
				this.pageSize = val;
				this.getQuestionList();
			},
			//删除问题
			handleDelete(id) {
				this.questionId = id;
				this.$confirm('确定删除此问题?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerDeleteQuestion();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//确定删除问题
			suerDeleteQuestion() {
				this.$ajax({
					method: 'get',
					url: '/question/deleteQuestion?questionId=' + this.questionId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getQuestionList();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			//查看问题详情
			getQuestionInfo(id) {
				this.$router.push({
					path: '/navBar/questionInfo',
					query: {
						questionId: id,
					}
				});
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
