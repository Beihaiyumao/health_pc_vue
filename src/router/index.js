import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const components = {
  head: () => import('../page/index/head'),
  login:()=> import('../page/login/login'),
  regist:()=>import('../page/login/regist'),
  article:()=>import('../page/article/article'),
  userInfo: ()=>import('../page/user/userInfo'),
  adminLogin:()=>import('../page/admin/adminLogin')
}
export default new Router({
   routes: [
      {
      path: '/',
      redirect: '/index',
    },
    {
    	path: '/index',
    	name: 'head',
    	component: components.head
    },
    {
    	path: '/login',
    	name: 'login',
    	component: components.login
    },
    {
    	path: '/register',
    	name: 'regist',
    	component: components.regist
    },
    {
    	path:'/article',
    	name:'article',
    	component: components.article
    },
    {
    	path:'/userInfo',
    	name:'userInfo',
    	component:components.userInfo
    },
    {
    	path:'/admin/adminLogin',
    	name:'adminLogin',
    	component:components.adminLogin
    }
  ]
})
