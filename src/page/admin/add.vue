<template>
	<div>
		<el-form :model="admin" :rules="rules" ref="admin" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username" style='width: 40%; margin-left:30%;'>
				<el-input v-model="admin.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password" style='width: 40%; margin-left:30%;'>
				<el-input type='password' v-model="admin.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="tpassword" style='width: 40%; margin-left:30%;'>
				<el-input type='password' v-model="admin.tpassword"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">提交</el-button>
				<el-button @click="resetForms('admin')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass2 = (rule, value, callback) => {
				if (value !== this.admin.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				admin: {
					username: '',
					password: '',
					tpassword: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 10,
							message: '长度在 4 到 10 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					],
					tpassword: [{
							required: true,
							message: '请输再次入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 个字符',
							trigger: 'blur'
						}, {
							validator: validatePass2,
							trigger: 'blur'
						}
					],					
				}

			}

		},

		methods: {
			//提交
			submitForm(formName) {
				var checkUserInp = this.checkUserInput();
				if (checkUserInp) {
					this.$ajax({
						method: 'POST',
						url: '/admin/addAdmin',
						data: this.admin,
					}).then(e => {
						console.log(e);
						if (e.data.code == 200) {
							this.$message.warning(e.data.msg);
						} else {
							this.$message.success(e.data.msg);
							this.resetForms(formName);
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
				if (this.admin.username == '' || this.admin.username.length < 2 || this.admin.username.length > 4) {
					this.$message.warning("请输入合法的用户名");
					return false;
				} else if (this.admin.password == '' || this.admin.password.length < 6 || this.admin.password.length > 12) {
					this.$message.warning("请输入合法的密码");
					return false;
				} else if (this.admin.tpassword != this.admin.password) {
					this.$message.warning("两次密码不一致");
					return false;
				} 
				return true;
			}
		}
	}
</script>

<style>
</style>
