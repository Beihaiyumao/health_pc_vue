<template>
	<div>
		<a>{{title}}</a><br />
		<a>{{author}}</a><br />
		<a>{{createTime}}</a><br />
		<a>{{article}}</a><br />
		<a>{{content}}</a>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				author: '',//作者
				article: '',//导语
				loading: '',
				articleId:'',//文章id
				content:'',//文章内容
				createTime:'',//创建时间
				title:'',//标题
				pic:'',//图片
			}
		},
		mounted: function() {
			this.articleId=this.$route.query.articleId;
			this.loading = true;
			this.getArticleInfo();
		},
		methods: {
			//根据文章id获取文章详情
			getArticleInfo() {
				this.$ajax({
					method: 'get',
					url: '/healthyArticle/selectHealthyArticleById?articleId=' + this.articleId,
	
				}).then(e => {
					console.log(e);
					this.article = e.data.article;
					this.author = e.data.author;
					this.content = e.data.content;
					this.createTime = this.renderTime(e.data.createTime);
					this.loading = false;
					this.title=e.data.title;
					this.pic=e.data.pic;
				})
			},
			//时间转换
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			},
			
	},
	}
</script>

<style>
</style>
