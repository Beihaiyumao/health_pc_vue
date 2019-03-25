<template>
	<div>
		<el-row>
			<el-col :span="24"><a>{{title}}</a></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><a>{{createTime}}</a></el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<el-button @click="backList" size="small" type="primary">
					返回
				</el-button>
			</el-col>
			<el-col :span="18">
				<a v-html="detail"></a>
			</el-col>
			<el-col :span="3">
				<el-button @click="handleDelete" size="small" type="danger">
					删除
				</el-button>

			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				questionId: '', //问题id
				detail: '', //问题内容
				createTime: '', //创建时间
				title: '', //标题
			}
		},
		mounted: function() {
			this.questionId = this.$route.query.questionId;
			this.getQuestionInfo();
		},
		methods: {
			//根据问题id获取问题详情
			getQuestionInfo() {
				this.$ajax({
					method: 'get',
					url: '/question/selectQuestionDetailById?questionId=' + this.questionId,

				}).then(e => {
					console.log(e);
					this.detail = this.Trim(e.data.object.detail);
					this.createTime = this.renderTime(e.data.object.createTime);
					this.title = e.data.object.title;
				})
			},
			//时间转换
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			},
			//文本转换
			Trim(str) { //str表示要转换的字符串
				return str.replace(/\n|\r\n/g, "<br/>");
			},
			//返回按钮
			backList() {
				this.$router.back(-1);
			},
			//删除问题
			handleDelete() {
				this.$confirm('确定删除此问题?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerDeleteQuestion();
					this.$router.back(-1);
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
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
		}
	}
</script>

<style>
</style>
