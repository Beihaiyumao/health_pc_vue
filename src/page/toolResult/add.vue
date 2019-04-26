<template>
	<div>
		<el-form :model="addToolResult" :rules="rules" ref="addToolResult" label-width="100px" class="demo-ruleForm">
			<el-form-item label="结果开始值" prop="resultCodeStart" style='width: 40%; margin-left:30%;'>
				<el-input v-model="addToolResult.resultCodeStart" placeholder="小数点后保留两位小数"></el-input>
			</el-form-item>
			<el-form-item label="结果结束值" prop="resultCodeEnd" style='width: 40%; margin-left:30%;margin-top: 50px;'>
				<el-input v-model="addToolResult.resultCodeEnd" placeholder="小数点后保留两位小数"></el-input>
			</el-form-item>
			<el-form-item label="结果内容" prop="resultMsg" style='width: 40%; margin-left:30%;margin-top: 50px;'>
				<el-input v-model="addToolResult.resultMsg" placeholder="不少于两个字符"></el-input>
			</el-form-item>
			<el-form-item label="医生建议" prop="proposal" style='width: 40%; margin-left:30%;margin-top: 50px;'>
				<el-input v-model="addToolResult.proposal" placeholder="不少于5个字符"></el-input>
			</el-form-item>
			<el-form-item label="适用性别" prop="sex" style='width: 40%; margin-left:30%;margin-top: 50px;'>
				<el-select v-model="addToolResult.sex" placeholder="请选择适用性别">
					<el-option label="男" :value='"0"'></el-option>
					<el-option label="女" :value='"1"'></el-option>
					<el-option label="男/女" :value='"2"'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="所属工具" prop="toolType" style='width: 40%; margin-left:30%;margin-top: 50px;'>
				<el-select v-model="addToolResult.toolType" placeholder="请选择所属工具">
					<el-option label="BMI计算器" :value='"000300000010"'></el-option>
					<el-option label="腰臀比" :value='"000300000040"'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item style='margin-top: 60px;'>
				<el-button type="primary" @click="submitForm">提交</el-button>
				<el-button @click="resetForms('addToolResult')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				addToolResult: {
					resultCodeStart: '',
					resultCodeEnd: '',
					resultMsg: '',
					proposal: '',
					sex: '',
					toolType: '',
				},
				rules: {
					resultCodeStart: [{
							required: true,
							message: '请输入结果开始值',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 5,
							message: '小数点保留两位',
							trigger: 'blur'
						}
					],
					resultCodeEnd: [{
							required: true,
							message: '请输入结束值',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 5,
							message: '小数点保留两位',
							trigger: 'blur'
						}
					],
					resultMsg: [{
							required: true,
							message: '请输入结果值',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 999,
							message: '长度至少2个字符',
							trigger: 'blur'
						}
					],
					proposal: [{
							required: true,
							message: '请输入医生建议',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 999,
							message: '长度至少5个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择适用对象性别',
						trigger: 'change'
					}],
					toolType: [{
						required: true,
						message: '请选择工具',
						trigger: 'change'
					}],
				},
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
						url: '/healthyTool/insertToolResult',
						data: this.addToolResult,
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
				var num = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/;
				if (this.addToolResult.resultCodeStart == '' || !num.test(this.addToolResult.resultCodeStart)) {
					this.$message.warning("请输入合法的结果开始值(保留两位小数)");
					return false;
				} else if (this.addToolResult.resultCodeEnd == '' || !num.test(this.addToolResult.resultCodeEnd)) {
					this.$message.warning("请输入合法的结果结束值(保留两位小数)");
					return false;
				}
				 else if (this.addToolResult.resultCodeEnd < this.addToolResult.resultCodeStart) {
					this.$message.warning("请检查结果开始值和结束值");
					return false;
				}
				else if (this.addToolResult.resultMsg == '' || this.addToolResult.resultMsg.length<2) {
					this.$message.warning("请输入合法的结果内容");
					return false;
				}
				else if (this.addToolResult.proposal == '' || this.addToolResult.proposal.length<5) {
					this.$message.warning("请输入合法的医生建议");
					return false;
				}
				else if (this.addToolResult.sex == '') {
					this.$message.warning("请选择适用性别");
					return false;
				}
				else if (this.addToolResult.toolType == '') {
					this.$message.warning("请选择所属工具");
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
