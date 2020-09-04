// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import Component from 'vue-class-component'
import { hasValidToken } from '@/utils/auth'

@Component({ name: 'app-yalout' })
export default class AppLayoutController extends Vue {
  mini: boolean = false
  public items: Item[] = [
    { title: 'Hospital', icon: 'fa-hospital', routerName: 'Hospital' },
    { title: 'Usuarios', icon: 'fa-user', routerName: 'Users' },
    { title: 'Pacientes', icon: 'fa-user-injured', routerName: 'Patients' },
    { title: 'Opciones', icon: 'fa-clipboard-list', routerName: 'Options' }
  ]

  public optionItems: Item[] = [
    { icon: 'fa-user-cog', title: 'Configuraciones', routerName: 'Account' },
    { icon: 'fa-sign-out-alt', title: 'Salir', routerName: 'Logout' }
  ]

  async beforeMount(): Promise<void> {
    if (hasValidToken()) {
      await this.$store.dispatch('loadProfile')
    } else {
      this.$router.push({ name: 'Root' })
    }
  }

  private changeRoute(item: Item) {
    if (item.routerName !== this.$route.name)
      if (item.routerName === 'Logout') {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('expiresAt')
        // @ts-ignore
        Vue.http.headers.common['Authorization'] = undefined
        this.$router.push({ name: 'Root' })
      } else {
        this.$router.push({ name: item.routerName })
      }
  }
}

interface Route {
  icon?: string
  title: string
  routerName?: string
}

interface Item {
  icon: string
  title: string
  routerName?: string
  children?: Route[]
}
