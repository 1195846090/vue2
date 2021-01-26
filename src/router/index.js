import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../components/Login.vue')

const Home = () => import('../components/Home.vue')

const Welcome = () => import('../components/Welcome.vue')

const Users = () => import('../components/user/Users.vue')

const Rights = () => import('../components/power/Rights.vue')

const Roles = () => import('../components/power/Roles.vue')
const Cate = () => import('../components/goods/Cate.vue')
// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
// import Users from '../components/user/Users.vue'
// import Rights from '../components/power/Rights.vue'
// import Roles from '../components/power/Roles.vue'
// // import Add from '../components/goods/Add.vue'
// import Cate from '../components/goods/Cate.vue'
// // import List from '../components/goods/List.vue'
// // import Params from '../components/goods/Params.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home', 
    component: Home, 
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      // { path: '/roles', component: Add },
      { path: '/categories', component: Cate },
      // { path: '/roles', component: List },
      // { path: '/roles', component: Params },
    ]
  },
 

]

const router = new VueRouter({
  routes
})

//挂在路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})


export default router
