<template>
	<div>
		<el-row>
			<el-col :span="24"><a>{{title}}</a></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><a>{{author}}</a></el-col>
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
				<a v-html="content"></a>
			</el-col>
			<el-col :span="3">
				<el-button @click="passExaArticle" size="small" type="warning" v-if="passExaState">
					审核通过
				</el-button><br /><br />
				<el-button @click="outExaArticle" size="small" type="danger" v-if="outExaState">
					审核不通过
				</el-button><br /><br />
				<el-button @click="deletePassExaArticle" size="small" type="danger" v-if="deleteExaState">
					删除文章
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
				author: '', //作者
				article: '', //导语
				loading: '',
				articleId: '', //文章id
				content: '', //文章内容
				createTime: '', //创建时间
				title: '', //标题
				pic: '', //图片
				passExaState:false,
				outExaState:false,
				deleteExaState:false,
			}
		},
		mounted: function() {
			this.articleId = this.$route.query.articleId;
			this.passExaState=this.$route.query.passExaState;
			this.outExaState=this.$route.query.outExaState;
			this.deleteExaState=this.$route.query.deleteExaState;
			this.loading = true;
			this.getArticleInfo();
		},
		methods: {
			//根据文章id获取文章详情
			getArticleInfo() {
				this.$ajax({
					method: 'get',
					url: '/healthyArticle/selectHealthyArticleById?articleId=' + this.articleId,

				}).then(e => {
					console.log(e);
					this.article = e.data.article;
					this.author = e.data.author;
					this.content = this.Trim(e.data.content);
					this.createTime = this.renderTime(e.data.createTime);
					this.loading = false;
					this.title = e.data.title;
					this.pic = e.data.pic;
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
			//审核通过文章
			passExaArticle() {
				this.$confirm('确定审核通过此文章?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerPassExaArticle();
					this.$router.back(-1);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			suerPassExaArticle() {
				this.$ajax({
					method: 'get',
					url: '/healthyArticle/passHealthyArticle?articleId=' + this.articleId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			//审核不通过文章
			outExaArticle() {
				this.$confirm('确定审核不通过此文章?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.sureOutExaArticle();
					this.$router.back(-1);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			sureOutExaArticle() {
				this.$ajax({
					method: 'get',
					url: '/healthyArticle/outHealthyArticle?articleId=' + this.articleId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			//删除审核通过文章
			deletePassExaArticle() {
				this.$confirm('确定删除此文章?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.suerDeletePassExaArticle();
					this.$router.back(-1);
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
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},

		},
	}
</script>

<style>
</style>
