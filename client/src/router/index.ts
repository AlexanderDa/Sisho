import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteConfig } from 'vue-router'
import Root from '@/router/RootRouter'
import Activate from '@/router/ActivateRouter'
import Login from '@/router/LoginRouter'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [Root, Activate, Login]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
