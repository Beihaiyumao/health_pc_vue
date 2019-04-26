<template>
	<div id="app">
		<el-button @click="addNewNotice" type="primary" style="margin-right: -1100px;">新增通知</el-button>
		<el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.8)" :data="noticeMsgList" tyle="width: 100%">
			<!-- 组件的数据帮在这里:data="tableData" -->
			<el-table-column prop="username" label="序号" width="100">
				<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
			</el-table-column>
			<el-table-column prop="msg" label="通知内容" width="500">
			</el-table-column>
			<el-table-column prop="state" label="开启状态" width="150">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" width="220">
			</el-table-column>
			<el-table-column label="操作" width="200">	
				<template slot-scope="scope">
					<el-button v-if="scope.row.NoticeState" @click="updateNoticeStateTrue(scope.row.noticeMsgId)" size="small" type="primary">
					开启
					</el-button>
					<el-button v-if="!scope.row.NoticeState" @click="updateNoticeStateFalse(scope.row.noticeMsgId)" size="small" type="warning">
					关闭
					</el-button>
					<el-button @click="handleDelete(scope.row.noticeMsgId)" size="small" type="danger">
						删除
					</el-button>
				</template>
			</el-table-column>

		</el-table>
		<div class="updown">
			<el-pagination @size-change="handleSizeChange" @current-change="changeCurrentPage" :current-page="pageNum"
			 :page-sizes="[10, 15, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				noticeMsgList: [], //用户信息
				currentPage: 1, //页数
				total: 0,
				isFirstPage: true,
				isLastPage: false,
				noticeMsgId: '',
				loading: '',
				pages: '', //一共多少页
				pageNum: 1, //当前页数
				pageSize: 10, //每页多少数据

				noticeMsg: {
					msg: '', //通知内容
				},
				NoticeState:'000500000020'
			}
		},
		mounted: function() {
			this.loading = true;
			this.getNoticeMsg();
		},
		methods: {
			//获取用户列表
			getNoticeMsg() {
				this.$ajax({
					method: 'get',
					url: '/admin/selectAllNoticeMsg?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize,

				}).then(e => {
					console.log(e);
					this.noticeMsgList = e.data.list;
					this.total = e.data.total;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pages = e.data.pages;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.loading = false;
					for (var i = 0; i < e.data.list.length; i++) {
						this.noticeMsgList[i].createTime = this.renderTime(e.data.list[i].createTime);
						if (e.data.list[i].state == '000500000020') {
							this.noticeMsgList[i].state = '未开启',
							this.noticeMsgList[i].NoticeState=true
						} else {
							this.noticeMsgList[i].state = '已开启',
							this.noticeMsgList[i].NoticeState=false
						}
					};
				})
			},
			//时间转换
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			},
			//选择第几页
			changeCurrentPage(vl) {
				this.currentPage = vl;
				this.getNoticeMsg();

			},
			//每页显示多少条数据
			handleSizeChange(val) {
				this.pageSize = val;
				this.getNoticeMsg();
			},
			//新增通知
			addNewNotice() {
				this.$prompt('请输入通知内容', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputErrorMessage: '请输入通知内容'
				}).then(({
					value
				}) => {
					this.noticeMsg.msg = value;
					this.sureAddNewNotice();

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			sureAddNewNotice() {
				this.$ajax({
					method: 'post',
					url: '/admin/insertNoticeMsg',
					data: this.noticeMsg,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getNoticeMsg();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			//删除
			handleDelete(id) {
				this.noticeMsgId = id;
				this.$confirm('确定删除该通知', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteNoticeMsg();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//确定删除
			deleteNoticeMsg() {
				this.$ajax({
					method: 'get',
					url: '/admin/deleteNoticeStateById?noticeMsgId=' + this.noticeMsgId,
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getNoticeMsg();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			updateNoticeStateTrue(id){
				this.noticeMsgId = id;
				this.$confirm('确定开启该通知', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.sureUpdateNoticeStateTrue();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			sureUpdateNoticeStateTrue(){
				this.$ajax({
					method: 'get',
					url: '/admin/updateNoticeState?noticeMsgId=' + this.noticeMsgId+'&state='+'000500000010',
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getNoticeMsg();
					} else {
						this.$message.error(e.data.msg);
					}
				})
			},
			updateNoticeStateFalse(id){
				this.noticeMsgId = id;
				this.$confirm('确定关闭该通知', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.sureUpdateNoticeStateFalse();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			sureUpdateNoticeStateFalse(){
				this.$ajax({
					method: 'get',
					url: '/admin/updateNoticeStateIsFalse?noticeMsgId=' + this.noticeMsgId+'&state='+'000500000020',
				}).then(e => {
					console.log(e);
					if (e.data.code == 100) {
						this.$message.success(e.data.msg);
						this.getNoticeMsg();
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
