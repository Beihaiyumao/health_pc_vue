<template>
	<div>
		<el-form :model="questionGenre" :rules="rules" ref="questionGenre" label-width="100px" class="demo-ruleForm">
			<el-form-item label="类别code" prop="questionGenreCode" style='width: 40%; margin-left:30%;'>
				<el-input type='text' v-model="questionGenre.questionGenreCode"></el-input>
			</el-form-item>
			<el-form-item label="类别name" prop="questionGenreName" style='width: 40%; margin-left:30%;margin-top: 50px;'>
				<el-input type='text' v-model="questionGenre.questionGenreName"></el-input>
			</el-form-item>
			<el-form-item style='margin-top: 60px;'>
				<el-button type="primary" @click="submitForm">提交</el-button>
				<el-button @click="resetForms('questionGenre')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				questionGenre: {
					questionGenreCode: '',
					questionGenreName: '',
					
				},
				rules: {
					questionGenreCode: [{
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
					questionGenreName: [{
							required: true,
							message: '请输入文章分类名字',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 8,
							message: '长度在 2 到 8个字符',
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
						url: '/admin/insertHealthQuestionGenre',
						data:this.questionGenre,
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
				if (this.questionGenre.questionGenreCode == '' || this.questionGenre.questionGenreCode.length != 12||!num.test(this.questionGenre.questionGenreCode)) {
					this.$message.warning("请输入合法的code");
					return false;
				} else if (this.questionGenre.questionGenreName == '' || this.questionGenre.questionGenreName.length < 2 || this.questionGenre.questionGenreName.length > 8) {
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
