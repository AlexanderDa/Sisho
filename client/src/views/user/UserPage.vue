<template>
  <own-panel
    @onSearch="findProfiles"
    title="usuarios"
    :fluid="true"
    :filter="true"
    :scrollable="true"
  >
    <template slot="actions">
      <v-btn
        v-if="elementIndex !== -1 && !user.emailVerified && !element.deleted"
        @click="sendWelcomeEmail()"
        icon
      >
        <v-icon>fa-envelope</v-icon>
      </v-btn>
      <v-btn :disabled="!isValidForm || element.deleted" @click="submit()" icon>
        <v-icon>fa-save</v-icon>
      </v-btn>

      <v-btn icon @click="clear()">
        <v-icon>fa-eraser</v-icon>
      </v-btn>

      <own-btn-confirm
        :disabled="elementIndex === -1 || element.deleted"
        @click:confirm="deleteElement()"
        :small="false"
      />
    </template>

    <template slot="drawer">
      <v-list-item v-for="item in elements" :key="item.id" @click="toShowElement(item)">
        <v-list-item-avatar>
          <v-img :src="item.image || require('@/assets/user.svg')" :alt="item.lastName" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.lastName"></v-list-item-title>
          <v-list-item-subtitle v-text="item.firstName"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon v-if="item.deleted" color="warning lighten-3">fa-minus-circle</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>

    <template slot="content">
      <v-form ref="form" v-model="isValidForm" lazy-validation>
        <v-row>
          <v-col cols="12" sm="5" md="4">
            <v-card color="white" height="150">
              <v-system-bar color="primary lighten-1" dark>
                <v-icon>fa-user-circle</v-icon>Cuenta
                <v-spacer />
              </v-system-bar>
              <v-card-text>
                <own-roles v-model="user.roleId" :rules="rules.required" />
                <v-switch
                  v-model="user.isActive"
                  class="ma-0"
                  :label="user.isActive ? 'Cuenta activa' : 'Cuenta inactiva'"
                />
              </v-card-text>
            </v-card>

            <v-card
              :disabled="elementIndex === -1 || element.deleted || !user.emailVerified"
              color="white"
              height="175"
              class="mt-5"
            >
              <v-system-bar color="primary lighten-1" dark>
                <v-icon>fa-key</v-icon>Cambiar contraseña
                <v-spacer />
              </v-system-bar>
              <v-card-text>
                <own-password-field
                  v-model="password"
                  :error="passError"
                  outlined
                  dense
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="changePassword()" color="primary lighten-1" text>
                  <v-icon left>fa-save</v-icon>Cambiar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="7" md="8">
            <v-card color="white">
              <v-system-bar color="primary lighten-1" dark>
                <v-icon>fa-id-card</v-icon>
                <span v-if="elementIndex === -1">Crear nuevo perfil</span>
                <span v-else>Editar información personal</span>
              </v-system-bar>

              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4" style="display: flex; justify-content: center">
                    <own-image-uploader
                      :src="element.image || require('@/assets/user.svg')"
                      @onUpload="updateImage"
                      :disabled="elementIndex === -1"
                    />
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-text-field
                      v-model="element.firstName"
                      :rules="rules.required"
                      autocomplete="off"
                      label="Nombres"
                      outlined
                      dense
                    />
                    <v-text-field
                      v-model="element.lastName"
                      :rules="rules.required"
                      autocomplete="off"
                      label="Apellidos"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="element.dni"
                      :rules="rules.dni"
                      v-mask="'#########-#'"
                      autocomplete="off"
                      label="Cédula"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="element.passport"
                      autocomplete="off"
                      label="Pasaporte"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="element.telephone"
                      v-mask="['# ### ###', '### ### ###']"
                      :rules="rules.telephone"
                      autocomplete="off"
                      label="Teléfono fijo"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="element.mobile"
                      v-mask="['### ### ####']"
                      :rules="rules.mobile"
                      autocomplete="off"
                      label="Teléfono móvil"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="element.email"
                      :rules="rules.email"
                      autocomplete="off"
                      label="Correo electrónico"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="element.address"
                      :rules="rules.required"
                      autocomplete="off"
                      label="Dirección"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </own-panel>
</template>
<script lang="ts">
//@ts-ignore
import Controller from './UserController'
export default Controller
</script>
