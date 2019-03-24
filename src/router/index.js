import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const components = {
	adminLogin: () => import('../page/admin/adminLogin'),
	navBar: () => import('../page/navBar/navBar'),
	index: () => import('../page/index/index'),
	userList: () => import('../page/user/userList'),
	userBlack: () => import('../page/user/userBlack'),
	addDoctor: () => import('../page/doctor/add'),
	doctorList: () => import('../page/doctor/doctorList'),
	doctorBlack: () => import('../page/doctor/doctorBlack'),
	adminList: () => import('../page/admin/adminList'),
	addAdmin: () => import('../page/admin/add'),
	addArticle: () => import('../page/article/addArticle'),
	commentList: () => import('../page/article/commentList'),
	replyList: () => import('../page/article/replyList'),
	waitExa: () => import('../page/article/waitExa'),
	outExa: () => import('../page/article/outExa'),
	passExa: () => import('../page/article/passExa'),
	articleInfo: () => import('../page/article/articleInfo'),
	questionList: () => import('../page/question/questionList'),
	questionAnswer: () => import('../page/question/questionAnswer'),
	questionInfo: () => import('../page/question/questionInfo'),
	feedback: () => import('../page/admin/feedback'),
	changePassword: () => import('../page/admin/changePassword'),
}

export default new Router({
	routes: [{
			path: '/',
			redirect: "/login"
		},

		{
			path: '/login',
			name: 'login',
			component: components.adminLogin
		},

		{
			path: '/navBar',
			name: 'navBar',
			redirect: "/navBar/index",
			meta: {
				title: "首页"
			},
			component: components.navBar,
			children: [{
					path: "index",
					component: components.index
				},

				{
					path: "users",
					meta: {
						title: "用户管理"
					},
					component: components.userList
				},

				{
					path: "userBlack",
					meta: {
						title: "用户黑名单"
					},
					component: components.userBlack
				},

				{
					path: "doctor",
					meta: {
						title: "医生列表"
					},
					component: components.doctorList
				},

				{
					path: "addDoctor",
					meta: {
						title: "新增医生"
					},
					component: components.addDoctor
				},
				{
					path: "doctorBlack",
					meta: {
						title: "医生黑名单"
					},
					component: components.doctorBlack
				},
				{
					path: "adminList",
					meta: {
						title: "管理员列表"
					},
					component: components.adminList
				},
				{
					path: "addAdmin",
					meta: {
						title: "新增管理员"
					},
					component: components.addAdmin
				},
				{
					path: "addArticle",
					meta: {
						title: "新增文章"
					},
					component: components.addArticle
				},
				{
					path: "commentList",
					meta: {
						title: "评论列表"
					},
					component: components.commentList
				},
				{
					path: "replyList",
					meta: {
						title: "回复列表"
					},
					component: components.replyList
				},
				{
					path: "waitExa",
					meta: {
						title: "待审核文章列表"
					},
					component: components.waitExa
				},
				{
					path: "outExa",
					meta: {
						title: "审核未通过文章列表"
					},
					component: components.outExa
				},
				{
					path: "passExa",
					meta: {
						title: "审核通过文章列表"
					},
					component: components.passExa
				},
				{
					path: "articleInfo",
					meta: {
						title: "文章详情"
					},
					component: components.articleInfo
				},
				{
					path: "questionList",
					meta: {
						title: "问题列表"
					},
					component: components.questionList
				},
				{
					path: "questionAnswer",
					meta: {
						title: "问题回答列表"
					},
					component: components.questionAnswer
				},
				{
					path: "questionInfo",
					meta: {
						title: "问题详情"
					},
					component: components.questionInfo
				},
				{
					path: "feedback",
					meta: {
						title: "用户反馈"
					},
					component: components.feedback
				},
				{
					path: "changePassword",
					meta: {
						title: "修改密码"
					},
					component: components.changePassword
				},
			]
		}



	]
})
