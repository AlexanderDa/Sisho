// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import moment from 'moment'
moment.lang('es')

Vue.mixin({
  methods: {
    $formatDate(date: string): string {
      return moment(date).format('LL')
    },

    $formatDateISO(date: string): string {
      return new Date(date).toISOString().substr(0, 10)
    },

    $formatDateTime(date: string): string {
      return moment(date).format('LLL')
    },

    $calcAge(date: string): number {
      var birthday = +new Date(date)
      return ~~((Date.now() - birthday) / 31557600000)
    }
  }
})
