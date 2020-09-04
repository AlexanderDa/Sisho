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
      <v-toolbar-title>Opciones</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="loadGroups()" icon><v-icon>fa-redo-alt</v-icon></v-btn>
    </v-app-bar>
    <v-sheet id="scrolling-techniques-7" class="overflow-y-auto grey lighten-4">
      <v-container style="height: 100vh !important; padding-top: 50px;">
        <v-row>
          <v-col v-for="item of groups" :key="item.id" xs="12" sm="6" md="4">
            <options :group="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-card>
</template>
<script lang="ts">
//@ts-ignore
import Controller from './GroupController'
export default Controller
</script>
