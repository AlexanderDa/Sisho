// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { RouteConfig } from 'vue-router'
const ActivateRoutes: RouteConfig = {
  path: '/app',
  name: 'App',
  component: () => import('@/layouts/app/AppLayout.vue'),
  children: [
    {
      path: '/account',
      name: 'Account',
      component: () => import('@/views/account/AccountPage.vue')
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('@/views/user/UserPage.vue')
    },
    {
      path: '/patients',
      name: 'Patients',
      component: () => import('@/views/patient/PatientPage.vue')
    },
    {
      path: '/hospital',
      name: 'Hospital',
      component: () => import('@/views/hospital/HospitalPage.vue')
    },
    {
      path: '/options',
      name: 'Options',
      component: () => import('@/views/group/GroupPage.vue')
    }
  ]
}
export default ActivateRoutes
