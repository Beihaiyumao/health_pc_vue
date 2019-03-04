<template>
	<div>

		<Head></Head>
		<tr v-for="item in hearthyArticleList">
			<p>{{item.title}}</p>
			<p>{{item.author}}</p>
		</tr>
		<button @click="downPage">上一页</button>
		<button @click="upPage">下一页</button>

	</div>
</template>

<script>
	import head from '@/page/index/head.vue'
	export default {
		mounted() {
			//			this.upPage();
			//			this.downPage();
			this.getHealthyArticle();

		},
		data() {
			return {
				currentPage: 1,
				hearthyArticleList: '',
				isFirstPage: '',
				isLastPage: '',
				pageNum: '',
				pageSize: '',
				total: '',
			}

		},
		methods: {
			//下一页
			upPage() {
				if(this.isLastPage == false) {
					this.currentPage = this.currentPage + 1;
					this.getHealthyArticle();
				}

			},
			//上一页
			downPage() {
				if(this.isFirstPage == false) {
					this.currentPage = this.currentPage - 1;
					this.getHealthyArticle();
				}

			},
			//获取文章列表
			getHealthyArticle() {
				console.log(this.currentPage)
				this.$ajax({
					method: 'GET',
					url: '/healthyArticle/healthyArticle?currentPage=' + this.currentPage,
				}).then(e => {
					console.log(e);
					this.hearthyArticleList = e.data.list;
					this.isFirstPage = e.data.isFirstPage;
					this.isLastPage = e.data.isLastPage;
					this.pageNum = e.data.pageNum;
					this.pageSize = e.data.pageSize;
					this.total = e.data.total;
				})

			}
		}
	}
</script>

<style>
	@import "//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css";
</style>