<template>
	<div>
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="BMIResultList" tyle="width: 150%">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="100">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="sex" label="针对性别" width="100" :formatter="formatSex">
			</el-table-column>
			<el-table-column prop="resultCodeStart" label="结果开始值" width="120">
			</el-table-column>
			<el-table-column prop="resultCodeEnd" label="结果结束值" width="120">
			</el-table-column>
			<el-table-column prop="resultMsg" label="结果内容" width="180">
			</el-table-column>
			<el-table-column prop="proposal" label="医生建议" width="220">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" width="160">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="updateToolResult(scope.row.healthToolId),dialogFormVisible = true " size="small" type="primary">
						修改
					</el-button>
					<el-button @click="handleDelete(scope.row.healthToolId)" size="small" type="danger">
						删除
					</el-button>
				</template>
			</el-table-column>
		
		</el-table>
		<div class="updown">
			<el-pagination @size-change="handleSizeChange" @current-change="changeCurrentPage"
			  :current-page="pageNum" :page-sizes="[10, 15, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</div>
		<el-dialog title="修改腰臀比结果" :visible.sync="dialogFormVisible">
			<el-form :model="updateTool">
				<el-form-item label="结果开始值" :label-width="formLabelWidth">
					<el-input v-model="updateTool.resultCodeStart" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="结果结束值" :label-width="formLabelWidth">
					<el-input v-model="updateTool.resultCodeEnd" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="结果内容" :label-width="formLabelWidth">
					<el-input v-model="updateTool.resultMsg" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="医生建议" :label-width="formLabelWidth">
					<el-input v-model="updateTool.proposal" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="适用性别" :label-width="formLabelWidth">
					<el-select v-model="updateTool.sex" placeholder="请选择适用性别">
						<el-option label="男" :value="0"></el-option>
						<el-option label="女" :value="1"></el-option>
						<el-option label="男/女" :value="2"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureUpdateToolResult">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				BMIResultList: [], //用户信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				loading: '',
				pages: '', //一共多少页
				pageNum: 1, //当前页数
				pageSize: 10 ,//每页多少数据
				updateTool: {
					healthToolId: '',
					resultCodeStart: '11',
					resultCodeEnd: '1',
					resultMsg: '',
					proposal: '',
					sex: '',
				},
				dialogFormVisible: false,
				formLabelWidth: '120px',
			}
		},
		mounted: function() {
			this.loading = true;
			this.getBMIResult();
		},
		methods: {
			//获取BMI结果列表
			getBMIResult() {
				this.$ajax({
					method: 'get',
					url: '/healthyTool/selectAllBMIResult?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize
					+'&toolType='+'000300000040',
	
				}).then(e => {
					console.log(e);
					this.BMIResultList = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pages = e.data.pages;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.BMIResultList[i].createTime = this.renderTime(e.data.list[i].createTime);
					};
				})
			},
			//时间转换
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1500).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			},
			//性别显示转换
			formatSex: function(row, column) {
				return row.sex == 0 ? '男' : row.sex == 1 ? '女' : '男/女';
			},
			//选择第几页
			changeCurrentPage(vl) {
				this.currentPage = vl;
				this.getBMIResult();
	
			},
			//每页显示多少条数据
			handleSizeChange(val) {
				this.pageSize=val;
				this.getBMIResult();
			},
			//删除结果
			handleDelete(id) {
				this.healthToolId = id;
				this.$confirm('确定删除该结果', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.sureDeleteToolResult();
				
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			sureDeleteToolResult() {
				this.$ajax({
					method: 'get',
					url: '/healthyTool/deleteToolResultById?healthToolId=' + this.healthToolId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getBMIResult();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			//修改结果
			updateToolResult(id) {
				this.updateTool.healthToolId = id;
				this.selectToolResultById();
			},
			selectToolResultById() {
				this.$ajax({
					method: 'get',
					url: '/healthyTool/selectToolResultById?healthToolId=' + this.updateTool.healthToolId,
			
				}).then(e => {
					console.log(e);
					this.updateTool = e.data.object;
				})
			},
			sureUpdateToolResult() {
				this.$ajax({
					method: 'post',
					url: '/healthyTool/updateToolResult',
					data: this.updateTool,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getBMIResult();
						this.dialogFormVisible= false;
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
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
