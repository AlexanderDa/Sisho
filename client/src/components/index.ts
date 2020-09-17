// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'

Vue.component('own-empty', () => import('@/components/empty.vue'))
Vue.component('own-panel', () => import('@/components/drawer.panel.vue'))
Vue.component('own-btn-confirm', () => import('@/components/btn.confirm.vue'))
Vue.component('own-color-picker', () => import('@/components/color.picker.vue'))
Vue.component('own-scroll-sheet', () => import('@/components/scroll.sheet.vue'))
Vue.component('own-search-field', () => import('@/components/search.field.vue'))
Vue.component('own-image-uploader', () => import('@/components/image.uploader.vue'))
Vue.component('own-password-field', () => import('@/components/password.field.vue'))

Vue.component('own-roles', () => import('@/components/roles.vue'))
