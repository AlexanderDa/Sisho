<template>
  <own-scroll-sheet title="Pacientes" :fluid="!form">
    <template slot="actions">
      <v-btn @click="showLog(element)" v-if="form && elementIndex > -1" icon>
        <v-icon> fa-history </v-icon>
      </v-btn>

      <v-btn v-if="form" icon> <v-icon>fa-notes-medical</v-icon> </v-btn>

      <v-btn
        v-if="form"
        :disabled="!isValidForm || element.deleted"
        @click="submit()"
        icon
      >
        <v-icon>fa-save</v-icon>
      </v-btn>
      <v-btn v-else @click="form = true" icon> <v-icon>fa-plus</v-icon> </v-btn>
      <v-btn v-if="form" @click="reset()" icon
        ><v-icon>far fa-times-circle</v-icon></v-btn
      >
    </template>

    <v-row v-if="form">
      <v-col cols="12" sm="5" md="4">
        <v-card :disabled="elementIndex === -1" color="white" height="200">
          <v-system-bar color="primary lighten-1" dark>
            <v-icon>fa-user-circle</v-icon>Imagen de perfil
            <v-spacer />
          </v-system-bar>
          <v-card-text style="display: flex; justify-content: center">
            <own-image-uploader
              :src="element.image || require('@/assets/user.svg')"
              @onUpload="updateImage"
              :size="150"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="7" md="8">
        <v-card color="white">
          <v-form ref="form" v-model="isValidForm" lazy-validation>
            <v-system-bar color="primary lighten-1" dark>
              <v-icon>fa-id-card</v-icon>
              <span v-if="elementIndex === -1">Registrar nuevo paciente</span>
              <span v-else>Editar información del paciente</span>
            </v-system-bar>

            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="element.firstName"
                    :rules="rules.required"
                    autocomplete="off"
                    label="Nombres"
                    outlined
                    dense
                  />
                </v-col>
                <v-col cols="12" sm="6">
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

                <v-col cols="6">
                  <own-date-picker
                    v-model="element.birthday"
                    :rules="rules.required"
                    label="Fecha de nacimiento"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Edad"
                    :value="$calcAge(element.birthday)"
                    readonly
                    outlined
                    dense
                    suffix="Años"
                  />
                </v-col>
                <v-col cols="4">
                  <own-option-selector group="Sex" v-model="element.sex" />
                </v-col>
                <v-col cols="4">
                  <own-option-selector group="BloodType" v-model="element.blooType" />
                </v-col>
                <v-col cols="4">
                  <own-option-selector
                    group="CivilStatus"
                    v-model="element.civilStatus"
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
                  <v-text-field
                    v-model="element.address"
                    :rules="rules.required"
                    autocomplete="off"
                    label="Dirección"
                    outlined
                    dense
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="element.ocupation"
                    :rules="rules.required"
                    autocomplete="off"
                    label="Ocupación"
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-data-table
      height="calc(100vh - 200px)"
      class="elevation-1 mt-3"
      :headers="headers"
      :items="elements"
      v-else
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <own-search-field @input="findElements" :filter="true" />
          <v-spacer />
        </v-toolbar>
      </template>

      <template v-slot:item.birthday="{ item }">
        {{ $formatDateISO(item.birthday) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <div style="width: 100%; min-width: 120px">
          <v-icon small class="mr-4" @click="showLog(item)"> fa-history </v-icon>
          <v-icon small class="mr-4">fa-notes-medical</v-icon>
          <v-icon small class="mr-1" @click="toEditElement(item)"> fa-edit </v-icon>
          <own-btn-confirm @click:confirm="deleteElement(item)" small />
        </div>
      </template>
    </v-data-table>
  </own-scroll-sheet>
</template>
<script lang="ts">
//@ts-ignore
import Controller from './PatientController'
export default Controller
</script>
