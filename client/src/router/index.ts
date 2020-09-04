// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteConfig } from 'vue-router'
import Root from '@/router/RootRouter'
import RestorePassword from '@/router/RestorePasswordRouter'
import RestoreAccount from '@/router/RestoreAccountRouter'
import Activate from '@/router/ActivateRouter'
import Login from '@/router/LoginRouter'
import app from '@/router/AppRouter'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  Root,
  RestorePassword,
  RestoreAccount,
  Activate,
  Login,
  app
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
