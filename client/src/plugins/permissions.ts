// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import { Module, Permission } from '@/models'

Vue.mixin({
  methods: {
    $modules(): string[] {
      return this.$store.state.module.elements.map((element: Module) => element.name)
    },

    $permissions(module: string): Permission {
      const mod: Module = this.$store.state.module.elements.find(
        (element: Module) => element.name === module
      )
      const per: Permission = this.$store.state.permission.elements.find(
        (element: Permission) => element.moduleId === mod.id
      )
      return per
    },
    $access(module: string): boolean {
      // @ts-ignore
      return this.$modules().includes(module)
    },
    $canCreate(module: string): boolean {
      //@ts-ignore
      const per: Permission = this.$permissions(module)
      return per.create || false
    },
    $canRead(module: string): boolean {
      //@ts-ignore
      const per: Permission = this.$permissions(module)
      return per.read || false
    },
    $canEdit(module: string): boolean {
      //@ts-ignore
      const per: Permission = this.$permissions(module)
      return per.edit || false
    },
    $canDelete(module: string): boolean {
      //@ts-ignore
      const per: Permission = this.$permissions(module)
      return per.del || false
    }
  }
})
