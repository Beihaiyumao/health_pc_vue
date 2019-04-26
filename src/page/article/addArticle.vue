<template>
	<div>
		<el-form :model="healthyArticle" :rules="rules" ref="healthyArticle" label-width="100px" class="demo-healthyArticle">
			<el-form-item label="文章标题" prop="title" style='width: 40%; margin-left:30%;'>
				<el-input v-model="healthyArticle.title"></el-input>
			</el-form-item>
			<el-form-item label="作者" prop="author" style='width: 40%; margin-left:30%;'>
				<el-input v-model="healthyArticle.author"></el-input>
			</el-form-item>
			<el-form-item label="导语" prop="article" style='width: 40%; margin-left:30%;'>
				<el-input v-model="healthyArticle.article"></el-input>
			</el-form-item>
			<el-form-item label="文章内容" prop="content" style='width: 40%; margin-left:30%;'>
				<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" v-model="healthyArticle.content"></el-input>
			</el-form-item>
			<el-form-item label="文章类型" prop="articleGenre" style='width: 40%; margin-left:30%;'>
				<el-select v-model="healthyArticle.articleGenre" clearable placeholder="请选择">
					<el-option v-for="item in articleGenre" :key="item.articleGenreCode" :label="item.articleGenreName" :value="item.articleGenreCode">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="" prop="article" style='width: 40%; margin-left:30%;'>
				<img :src="src" alt="" style="width:100%;" />
			</el-form-item>
			<el-form-item label="上传图片" prop="name" style='width: 40%; margin-left:30%;'>
				<el-upload class="upload-demo" :auto-upload="false" :on-change="onchange" :on-remove="handleRemove" :limit="1" drag
				 action="" style="margin-left:80px;">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">这里只能上传一张,如需更换请先手动删除列表中的！</div>
				</el-upload>
			</el-form-item>
			<el-form-item style='width: 40%; margin-left:30%;'>
				<el-button type="primary" @click="submitForm1">发布</el-button>
				<el-button @click="resetForm('healthyArticle')">重置</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				articleGenre: [],
				healthyArticle: {
					title: '',
					articleGenre: '',
					author: '',
					article: '',
					content: '',
					createUserId: '',
					createUserRole: '',
				},
				rules: {
					title: [{
							required: true,
							message: '请输入文章标题',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 15,
							message: '长度在 5 到 15 个字符',
							trigger: 'blur'
						}
					],
					author: [{
							required: true,
							message: '请输入作者名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 10,
							message: '长度在 2 到 10 个字符',
							trigger: 'blur'
						}
					],
					article: [{
							required: true,
							message: '请输入导语',
							trigger: 'blur'
						},
						{
							min: 20,
							max: 50,
							message: '长度在 20 到 50 个字符',
							trigger: 'blur'
						}
					],
					content: [{
							required: true,
							message: '请输入文章内容',
							trigger: 'blur'
						},
						{
							min: 100,
							max: 999999,
							message: '请不要少于100个字符',
							trigger: 'blur'
						}
					],
					articleGenre: [{
						required: true,
						message: '请选择文章类型',
						trigger: 'change'
					}],
				},
				imageUrl: '',
				src: '',
				fd: '',
			}
		},
		mounted: function() {
			this.getArticleGenre();
		},
		methods: {
			//获取文章类别列表
			getArticleGenre() {
				this.$ajax({
					method: 'get',
					url: '/admin/selectAllArticleGenre?pageSize=' + 100+'&all='+10,
				}).then(e => {
					console.log(e);
					this.articleGenre = e.data.list;
				})
			},
			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleRemove(file, filesList) {
				this.fd.delete('file')
			},
			onchange(file, filesList) {
				console.log(file)
				this.fd = new FormData(); //通过form数据格式来传
				this.fd.append('file', file.raw, file.name);
				this.fd.append('title', this.healthyArticle.title);
				this.fd.append('articleGenre', this.healthyArticle.articleGenre);
				this.fd.append('author', this.healthyArticle.author);
				this.fd.append('article', this.healthyArticle.article);
				this.fd.append('content', this.healthyArticle.content);
				console.log(sessionStorage.getItem("admin") == 200)
				if (sessionStorage.getItem("admin") == 200) {
					this.fd.append('createUserRole', "000100000030");
					this.fd.append('createUserId', sessionStorage.getItem("adminId"));
				}  
				if(sessionStorage.getItem("doctor") == 200)
				{
					this.fd.append('createUserRole', "000100000020");
					this.fd.append('createUserId', sessionStorage.getItem("doctorId"));
				}

				
				this.imageUrl = true;
				//创建临时的路径来展示图片
				var windowURL = window.URL || window.webkitURL;
				this.src = windowURL.createObjectURL(file.raw);
				return false;
			},
			//覆盖默认的上传行为
			httprequest() {

			},
			submitForm1() {

				var inputState = this.checkuserInput();
				if (inputState) {
					this.$ajax({
						method: 'post',
						url: '/healthyArticle/addHealthyArticle',
						data: this.fd,
						dataType: "json",
					}).then(e => {
						console.log(e);
						if (e.data.code == 100) {
							this.$message.success(e.data.msg);
							this.healthyArticle = {
									brand_right: 0
								},
								this.src = "";
							this.handleRemove(this.fd.get("file"));
							console.log(e);
						} else {
							this.$message.error(e.data.msg);
						}
					})
				}

			},
			checkuserInput() {
				if (this.healthyArticle.title == '' || this.healthyArticle.title.length < 5 || this.healthyArticle.title.length >
					15) {
					this.$message.warning("请输入正确合法的标题");
					return false;
				} else if (this.healthyArticle.author == '' || this.healthyArticle.author.length < 2 || this.healthyArticle.author.length >
					10) {
					this.$message.warning("请输入正确的作者名称");
					return false;
				} else if (this.healthyArticle.article == '' || this.healthyArticle.article.length < 20 || this.healthyArticle.article
					.length > 50) {
					this.$message.warning("请输入正确的导语");
					return false;
				} else if (this.healthyArticle.content == "" || this.healthyArticle.content.length < 10) {
					this.$message.warning("正文内容不少于100个字符");
					return false;
				} else if (this.healthyArticle.articleGenre == '') {
					this.$message.warning("请选择文章分类");
					return false;
				} else if (this.fd.get("file") == null) {
					this.$message.warning("请选择一张封面图");
					return false;
				}
				return true;
			},
		}
	}
</script>

<style>
	#app {
		text-align: center;
		margin-top: 0px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
