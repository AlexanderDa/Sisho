// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { RouteConfig } from 'vue-router'
const ActivateRoutes: RouteConfig = {
  path: '/app',
  name: 'App',
  meta: { auth: true },
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
      meta: { modules: ['users', 'profiles'] },
      component: () => import('@/views/user/UserPage.vue')
    },

    {
      path: '/hospital',
      name: 'Hospital',
      meta: { modules: ['company'] },
      component: () => import('@/views/hospital/HospitalPage.vue')
    },
    {
      path: '/options',
      name: 'Options',
      meta: { modules: ['options'] },
      component: () => import('@/views/group/GroupPage.vue')
    },
    {
      path: '/diseasetypes',
      name: 'DiseaseTypes',
      meta: { modules: ['diseases', 'diseasetypes'] },
      component: () => import('@/views/diseases/TypesPage.vue'),
      children: [
        {
          path: '/diseasetype/:id/disease',
          name: 'Disease',
          component: () => import('@/views/diseases/DiseasePage.vue')
        }
      ]
    },
    {
      path: '/examtypes',
      name: 'ExamTypes',
      meta: { modules: ['exams', 'examtypes'] },
      component: () => import('@/views/exams/ExamTypesPage.vue'),
      children: [
        {
          path: '/examtype/:id/exam',
          name: 'Exam',
          component: () => import('@/views/exams/ExamPage.vue')
        }
      ]
    },
    {
      path: '/patients',
      name: 'Patients',
      meta: { modules: ['patients'] },
      component: () => import('@/views/patient/PatientPage.vue')
    },
    {
      path: '/medics',
      name: 'Medics',
      meta: { modules: ['medics'] },
      component: () => import('@/views/medic/MedicPage.vue')
    },
    {
      path: '/patient/:id/medidalrecords',
      name: 'PatientMedRec',
      meta: { modules: ['antecedents', 'diagnostics', 'medicalrecords', 'vitalsigns'] },
      component: () => import('@/views/medrec/MedicalRecordPage.vue')
    },
    {
      path: '/vitalsigns',
      name: 'VitalSigns',
      meta: { modules: ['vitalsigns'] },
      component: () => import('@/views/vitalsign/VitalSignPage.vue')
    }
  ]
}
export default ActivateRoutes
