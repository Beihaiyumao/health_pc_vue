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
	doctorInfo: () => import('../page/doctor/doctorInfo'),
	addArticleGenre: () => import('../page/genre/addArticleGenre'),
	articleGenreList: () => import('../page/genre/articleGenreList'),
	addQuestionGenre: () => import('../page/genre/addQuestionGenre'),
	questionGenreList: () => import('../page/genre/questionGenreList'),
	myArticle: () => import('../page/article/myArticle'),
	myQuestion: () => import('../page/question/myQuestion'),
	noticeMsgList: () => import('../page/admin/noticeMsgList'),
	bmi: () => import('../page/toolResult/bmi'),
	whr: () => import('../page/toolResult/whr'),
	addToolResult:()=>import('../page/toolResult/add'),
	doctorChanPW:()=>import('../page/doctor/changePassword'),
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
				title: "首页",

			},
			component: components.navBar,
			children: [{
					path: "index",
					component: components.index,
					meta: {
						requireAuth: false,
					}
				},

				{
					path: "users",
					meta: {
						title: "用户管理",
						requireAuth: true,
					},
					component: components.userList
				},

				{
					path: "userBlack",
					meta: {
						title: "用户黑名单",
						requireAuth: true,
					},
					component: components.userBlack
				},

				{
					path: "doctor",
					meta: {
						title: "医生列表",
						requireAuth: true,
					},
					component: components.doctorList
				},

				{
					path: "addDoctor",
					meta: {
						title: "新增医生",
						requireAuth: true,
					},
					component: components.addDoctor
				},
				{
					path: "doctorBlack",
					meta: {
						title: "医生黑名单",
						requireAuth: true,
					},
					component: components.doctorBlack
				},
				{
					path: "adminList",
					meta: {
						title: "管理员列表",
						requireAuth: true,
					},
					component: components.adminList
				},
				{
					path: "addAdmin",
					meta: {
						title: "新增管理员",
						requireAuth: true,
					},
					component: components.addAdmin
				},
				{
					path: "addArticle",
					meta: {
						title: "新增文章",
						requireAuth: true,
					},
					component: components.addArticle
				},
				{
					path: "commentList",
					meta: {
						title: "评论列表",
						requireAuth: true,
					},
					component: components.commentList
				},
				{
					path: "replyList",
					meta: {
						title: "回复列表",
						requireAuth: true,
					},
					component: components.replyList
				},
				{
					path: "waitExa",
					meta: {
						title: "待审核文章列表",
						requireAuth: true,
					},
					component: components.waitExa
				},
				{
					path: "outExa",
					meta: {
						title: "审核未通过文章列表",
						requireAuth: true,
					},
					component: components.outExa
				},
				{
					path: "passExa",
					meta: {
						title: "审核通过文章列表",
						requireAuth: true,
					},
					component: components.passExa
				},
				{
					path: "articleInfo",
					meta: {
						title: "文章详情",
						requireAuth: true,
					},
					component: components.articleInfo
				},
				{
					path: "questionList",
					meta: {
						title: "问题列表",
						requireAuth: true,
					},
					component: components.questionList
				},
				{
					path: "questionAnswer",
					meta: {
						title: "问题回答列表",
						requireAuth: true,
					},
					component: components.questionAnswer
				},
				{
					path: "questionInfo",
					meta: {
						title: "问题详情",
						requireAuth: true,
					},
					component: components.questionInfo
				},
				{
					path: "feedback",
					meta: {
						title: "用户反馈",
						requireAuth: true,
					},
					component: components.feedback
				},
				{
					path: "changePassword",
					meta: {
						title: "修改密码",
						requireAuth: true,
					},
					component: components.changePassword
				},
				{
					path: "doctorInfo",
					meta: {
						title: "医生个人中心",
						requireAuth: true,
					},
					component: components.doctorInfo
				},
				{
					path: "addArticleGenre",
					meta: {
						title: "新增文章分类",
						requireAuth: true,
					},
					component: components.addArticleGenre
				},
				{
					path: "articleGenreList",
					meta: {
						title: "文章分类列表",
						requireAuth: true,
					},
					component: components.articleGenreList
				},
				{
					path: "addQuestionGenre",
					meta: {
						title: "新增问题分类",
						requireAuth: true,
					},
					component: components.addQuestionGenre
				},
				{
					path: "questionGenreList",
					meta: {
						title: "问题分类列表",
						requireAuth: true,
					},
					component: components.questionGenreList
				},
				{
					path: "myArticle",
					meta: {
						title: "我发布的文章",
						requireAuth: true,
					},
					component: components.myArticle
				},
				{
					path: "myQuestion",
					meta: {
						title: "我回答的问题",
						requireAuth: true,
					},
					component: components.myQuestion
				},
				{
					path: "noticeMsgList",
					meta: {
						title: "消息通知列表",
						requireAuth: true,
					},
					component: components.noticeMsgList
				},
				{
					path: "bmi",
					meta: {
						title: "BMI",
						requireAuth: true,
					},
					component: components.bmi
				},
				{
					path: "whr",
					meta: {
						title: "WHR",
						requireAuth: true,
					},
					component: components.whr
				},
				{
					path: "addToolResult",
					meta: {
						title: "新增健康工具结果",
						requireAuth: true,
					},
					component: components.addToolResult
				},
				{
					path: "doctorChanPW",
					meta: {
						title: "修改密码",
						requireAuth: true,
					},
					component: components.doctorChanPW
				},
			]
		}



	]
})
