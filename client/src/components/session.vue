<template>
  <v-dialog v-model="dialog" persistent width="500">
    <v-card>
      <v-system-bar color="primary" class="pa-4 white--text"
        >Sesión expirada<v-spacer></v-spacer>
        <v-icon @click="onClose()" color="white" size="22">far fa-times-circle</v-icon>
      </v-system-bar>
      <v-alert dense text color="primary" icon="fa-info-circle">
        Para extender la sesión ingrese su contraseña nuevamente.
      </v-alert>
      <v-card-text>
        <password time="1500" />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="dialog = false">
          extender
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

@Component({})
export default class Session extends Vue {
  private dialog = true

  onClose() {
    //@ts-ignore
    this.$router.push({ name: 'Root' })
  }
}
</script>

<style></style>
