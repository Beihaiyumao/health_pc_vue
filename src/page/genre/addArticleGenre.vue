<template>
	<div>
		<el-form :model="articleGenre" :rules="rules" ref="articleGenre" label-width="100px" class="demo-ruleForm">
			<el-form-item label="类别code" prop="articleGenreCode" style='width: 40%; margin-left:30%;'>
				<el-input type='text' v-model="articleGenre.articleGenreCode"></el-input>
			</el-form-item>
			<el-form-item label="类别name" prop="articleGenreName" style='width: 40%; margin-left:30%;margin-top: 50px;'>
				<el-input type='text' v-model="articleGenre.articleGenreName"></el-input>
			</el-form-item>
			<el-form-item style='margin-top: 60px;'>
				<el-button type="primary" @click="submitForm">提交</el-button>
				<el-button @click="resetForms('articleGenre')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				articleGenre: {
					articleGenreCode: '',
					articleGenreName: '',
					
				},
				rules: {
					articleGenreCode: [{
							required: true,
							message: '请输入文章分类code',
							trigger: 'blur'
						},
						{
							min: 12,
							max: 12,
							message: '长度是12个数字',
							trigger: 'blur'
						}
					],
					articleGenreName: [{
							required: true,
							message: '请输入文章分类名字',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 8,
							message: '长度在 2 到 8 个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		mounted: function() {
			
		},
		methods: {
			submitForm() {
				var checkUserInp = this.checkUserInput();
				if (checkUserInp) {
					this.$ajax({
						method: 'POST',
						url: '/admin/insertHealthArticleGenre',
						data:this.articleGenre,
					}).then(e => {
						console.log(e);
						if (e.data.code == 100) {
							this.$message.success(e.data.msg);
							console.log(e);
						} else {
							this.$message.error(e.data.msg);
						}
					})
				}
			},
			//重置
			resetForms(formName) {
				this.$refs[formName].resetFields();
			},
			//检查用户输入情况
			checkUserInput() {
					var num=/^\d{12}$/;
				if (this.articleGenre.articleGenreCode == '' || this.articleGenre.articleGenreCode.length != 12||!num.test(this.articleGenre.articleGenreCode)) {
					this.$message.warning("请输入合法的code");
					return false;
				} else if (this.articleGenre.articleGenreName == '' || this.articleGenre.articleGenreName.length < 2 || this.articleGenre.articleGenreName.length > 8) {
					this.$message.warning("请输入合法的名称");
					return false;
				} 
				return true;
			}
		},

	}
</script>

<style>
	#app {
		margin-top: 0px;
	}
	.demo-ruleForm{
		margin-top: 100px;
	}
</style>
