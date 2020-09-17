<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      scroll-target="#scrolling-techniques-7"
      color="primary"
      elevate-on-scroll
      absolute
      dense
      dark
    >
      <v-toolbar-title style="font-size: 1em">
        {{ title ? title.toUpperCase() : '' }}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <slot name="icons" />
    </v-app-bar>
    <v-sheet id="scrolling-techniques-7" class="overflow-y-auto grey lighten-4 particle">
      <v-container style="height: 100vh !important; padding-top: 50px" :fluid="fluid">
        <slot name="default" />
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

@Component({})
export default class ScrollSheet extends Vue {
  @Prop() title!: string
  @Prop({ default: false }) fluid!: boolean
}
</script>
