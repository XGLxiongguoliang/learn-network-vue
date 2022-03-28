import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Network from '../views/network/networkManager'
import User from '../views/user/userManager'
import Relation from '../views/relation/relationManager'
import Hobby from '../views/hobby/hobbyManager'
import UserRelation from '../views/userrelation/userRelationManager'
import AddUserRelation from '../views/userrelation/userRelationAddManager'
import Login from '../views/login/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/network',
    name: 'network',
    component: Network
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/relation',
    name: 'relation',
    component: Relation
  },
  {
    path: '/hobby',
    name: 'hobby',
    component: Hobby
  },
  {
    path: '/userrelation',
    name: 'userrelation',
    component: UserRelation
  },
  {
    path: '/adduserrelation',
    name: 'adduserrelation',
    component: AddUserRelation
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
