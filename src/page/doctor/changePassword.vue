<template>
	<div>
		<el-form :model="doctor" :rules="rules" ref="doctor" label-width="100px" class="demo-ruleForm">
			<el-form-item label="旧密码" prop="opassword" style='width: 40%; margin-left:30%;'>
				<el-input  type='password' v-model="doctor.opassword"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="password" style='width: 40%; margin-left:30%;'>
				<el-input type='password' v-model="doctor.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="tpassword" style='width: 40%; margin-left:30%;'>
				<el-input type='password' v-model="doctor.tpassword"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">提交</el-button>
				<el-button @click="resetForms('doctor')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass2 = (rule, value, callback) => {
				if (value !== this.doctor.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				doctor: {
					opassword: '',
					password: '',
					tpassword: '',
					doctorId:sessionStorage.getItem("doctorId"),
				},
				rules: {
					opassword: [{
							required: true,
							message: '请输入旧密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 个字符',
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
		mounted: function() {
			this.doctorId = sessionStorage.getItem("doctorId");
		},
		methods: {
			submitForm() {
				var checkUserInp = this.checkUserInput();
				if (checkUserInp) {
					this.$ajax({
							method:'GET',
							url:'/doctor/updatePassword?doctorId='+this.doctor.doctorId+'&newPassword='+this.doctor.password+'&oldPassword='+this.doctor.opassword,
						}).then(e=>{
							console.log(e);
							if(e.data.code==100){
								this.$message.success(e.data.msg);
								console.log(e);
							}else{
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
				if (this.doctor.opassword == '' || this.doctor.opassword.length < 6 || this.doctor.opassword.length > 12) {
					this.$message.warning("请输入合法的旧密码");
					return false;
				} else if (this.doctor.password == '' || this.doctor.password.length < 6 || this.doctor.password.length > 12) {
					this.$message.warning("请输入合法的密码");
					return false;
				} else if (this.doctor.tpassword != this.doctor.password) {
					this.$message.warning("两次密码不一致");
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
</style>
