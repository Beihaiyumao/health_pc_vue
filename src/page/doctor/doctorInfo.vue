<template>
	<div>
		<el-form :model="doctor" :rules="rules" ref="doctor" label-width="100px" class="demo-ruleForm">
			<el-form-item label="医生姓名" prop="username" style='width: 40%; margin-left:30%;'>
				<el-input v-model="doctor.username"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email" style='width: 40%; margin-left:30%;'>
				<el-input v-model="doctor.email" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex" style='width: 40%; margin-left:30%;'>
				<el-radio-group v-model="doctor.sex">
					<el-radio :label="0">男</el-radio>
					<el-radio :label="1">女</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="电话" prop="phone" style='width: 40%; margin-left:30%;'>
				<el-input v-model="doctor.phone"></el-input>
			</el-form-item>
			<el-form-item label="所属医院" prop="hospital" style='width: 40%; margin-left:30%;'>
				<el-input v-model="doctor.hospital"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">修改</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {

			return {
				doctor: {
					username: '',
					email: '',
					phone: '',
					hospital: '',
					sex:0,
					doctorId:sessionStorage.getItem("doctorId"),
				},
				rules: {
					username: [{
							required: true,
							message: '请输入医生姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 4,
							message: '长度在 2 到 4 个字符',
							trigger: 'blur'
						}
					],
					phone: [{
							required: true,
							message: '请输入电话号码',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '长度应是 11 个字符',
							trigger: 'blur'
						}
					],
					hospital: [{
							required: true,
							message: '请输入所属医院',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 20,
							message: '长度在 5 到 20 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请输入选择性别',
						trigger: 'blur'
					}],
				}

			}

		},
		mounted: function() {
			this.getDoctorInfoById();
		},
		methods: {
			//查询医生信息
			getDoctorInfoById() {
				this.$ajax({
					method: 'get',
					url: '/doctor/doctorInfo?doctorId=' + sessionStorage.getItem("doctorId"),
				}).then(e => {
					console.log(e);
					this.doctor.username = e.data.object.username;
					this.doctor.sex=e.data.object.sex;
					this.doctor.hospital=e.data.object.hospital;
					this.doctor.email=e.data.object.email;
					this.doctor.phone=e.data.object.phone;
				})
			},
			//提交
			submitForm() {
				var checkUserInp = this.checkUserInput();
				if (checkUserInp) {
					this.$ajax({
						method: 'POST',
						url: '/doctor/updateInfo',
						data: this.doctor,
					}).then(e => {
						console.log(e);
						if (e.data.code == 200) {
							this.$message.warning(e.data.msg);
						} else {
							this.$message.success(e.data.msg);
						}
					})
				}
			},
			//检查用户输入情况
			checkUserInput() {
				var emailTrue = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
				var phoneTrue = /^1[34578]\d{9}$/;
				if (this.doctor.username == '' || this.doctor.username.length < 2 || this.doctor.username.length > 4) {
					this.$message.warning("请输入合法的姓名");
					return false;
				}else if (this.doctor.phone == '' || !phoneTrue.test(this.doctor.phone)) {
					this.$message.warning("请输入正确的电话");
					return false;
				} else if (this.doctor.hospital == '' || this.doctor.hospital.length < 5 || this.doctor.hospital.length > 20) {
					this.$message.warning("请输入合法的医院");
					return false;
				}
				return true;
			}
		}
	}
</script>

<style>
	#app {
		margin-top: 0px;
	}
</style>
