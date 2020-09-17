<template>
  <div class="drawer-panel">
    <v-card class="overflow-hidden body" height="100vh">
      <v-app-bar color="primary" absolute dense dark>
        <v-toolbar-title>
          <v-list-item-content>
            <v-list-item-title>
              {{ title ? title.toUpperCase() : '' }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ subtitle ? subtitle.toUpperCase() : '' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <slot name="actions" />
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </v-app-bar>
      <v-sheet
        :class="scrollable ? 'overflow-y-auto' : ''"
        class="grey lighten-4 particle"
      >
        <v-container :fluid="fluid">
          <own-empty v-if="empty" width="400" />
          <slot else name="content" />
        </v-container>
      </v-sheet>
    </v-card>
    <v-card class="overflow-hidden sidebar" v-if="drawer">
      <v-app-bar
        scroll-target="#scrolling-techniques-7"
        elevate-on-scroll
        color="grey lighten-4"
        absolute
      >
        <v-text-field
          style="height: 40px; border-radius: 30px"
          @keyup.enter="onSearch()"
          @click:clear="onClearSearch()"
          @input="v => v !== '' || onClearSearch()"
          v-model="value"
          autocomplete="off"
          label="Buscar ..."
          clearable
          dense
          solo
        >
          <template v-slot:prepend v-if="filter">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="secondary" v-bind="attrs" v-on="on" small icon>
                  <v-icon small>fa-sliders-h</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-toolbar class="primary lighten-1" dark dense>
                  <v-icon class="mr-3" small>fa-sliders-h</v-icon>
                  <v-toolbar-title class="subtitle-1">Filtro de busqueda</v-toolbar-title>
                </v-toolbar>

                <v-divider></v-divider>

                <v-list>
                  <v-list-item>
                    <v-list-item-action>
                      <v-switch v-model="includeRemoveds" />
                    </v-list-item-action>
                    <v-list-item-title>Incluir eliminados</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </template>

          <template v-slot:append>
            <v-btn @click="onSearch()" color="secondary" small icon>
              <v-icon small>fa-search</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-7" class="overflow-y-auto">
        <v-container style="height: 100vh; padding: 60px 0px">
          <div class="drawer-content">
            <slot name="drawer" />
          </div>
        </v-container>
      </v-sheet>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
//@ts-ignore
import Search from '@/utils/search'

@Component({})
export default class DawerPanel extends Vue {
  @Prop() title!: string
  @Prop() subtitle!: string
  @Prop({ default: false }) fluid!: boolean
  @Prop({ default: false }) filter!: boolean
  @Prop({ default: false }) empty!: boolean
  @Prop({ default: false }) scrollable!: boolean
  private drawer: boolean = true
  private value: string = ''
  private includeRemoveds: boolean = false

  onClearSearch(): void {
    this.value = ''
    this.onSearch()
  }

  @Emit('onSearch')
  onSearch(): Search | null {
    return this.value
      ? {
          value: this.value,
          includeRemoveds: this.includeRemoveds
        }
      : null
  }

  private mounted(): void {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 800) {
        this.drawer = false
      } else {
        this.drawer = true
      }
    })
  }
}
</script>

<style lang="sass">
.drawer-panel
    width: 100%
    height: 100%
    display: flex
    justify-content: flex-end

    header .v-list-item__subtitle
      font-size: .6em

    .body
        width: 100%
        & .v-sheet
            height: 100%
            & .container
                margin-top: 50px
                height: 100%

    .sidebar
        width: 400px
        background-color: red
        & .search
            padding: 0px 10px
        & .drawer-content
            height: calc( 100% - 50px )
            & .container
                margin-top: 50px
                overflow-y: auto
</style>
