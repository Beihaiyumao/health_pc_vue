<template>
	<div id="app">
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="questionAnswerList">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="60">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="userName" label="提问者用户名" width="100">
			</el-table-column>
			<el-table-column prop="title" label="问题标题" width="150">
			</el-table-column>
			<el-table-column prop="sex" label="提问者性别" width="100">
			</el-table-column>
			<el-table-column prop="createTime" label="提问时间" width="155">
			</el-table-column>
			<el-table-column prop="doctorName" label="医生名字" width="100">
			</el-table-column>
			<el-table-column prop="answerDetail" label="回答内容" width="150">
			</el-table-column>
			<el-table-column prop="doctorEmail" label="医生邮箱" width="150">
			</el-table-column>
			<el-table-column prop="answerTime" label="回答时间" width="155">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button @click="handleDelete(scope.row.answerId)" size="small" type="danger">
						删除回答
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
				questionAnswerList: [], //用户信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				questionAnswerId: '',
				loading: '',
				pages: '', //一共多少页
				pageNum: 1, //当前页数
				pageSize: 10 //每页多少数据
			}
		},
		mounted: function() {
			this.loading = true;
			this.getquestionAnswerList();
		},
		methods: {
			//获取问题列表
			getquestionAnswerList() {
				this.$ajax({
					method: 'get',
					url: '/question/selectAllAnswerQuestion?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize,

				}).then(e => {
					console.log(e);
					this.questionAnswerList = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pages = e.data.pages;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.questionAnswerList[i].createTime = this.renderTime(e.data.list[i].createTime);
						this.questionAnswerList[i].answerTime = this.renderTime(e.data.list[i].answerTime);
						if (e.data.list[i].sex == 0) {
							this.questionAnswerList[i].sex = '男';
						} else {
							this.questionAnswerList[i].sex = '女';
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
				this.getquestionAnswerList();

			},
			//每页显示多少条数据
			handleSizeChange(val) {
				this.pageSize = val;
				this.getquestionAnswerList();
			},
			//删除回答
			handleDelete(id) {
				this.answerId = id;
				this.$confirm('确定删除此回答?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerDeleteuestionAnswer();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//确定删除回答
			suerDeleteuestionAnswer() {
				this.$ajax({
					method: 'get',
					url: '/question/deleteQuestionAnswerById?answerId=' + this.answerId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getquestionAnswerList();
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
