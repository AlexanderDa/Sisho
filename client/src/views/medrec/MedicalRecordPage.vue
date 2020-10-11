<template>
  <own-panel title="Fichas médicas" :scrollable="form">
    <template slot="drawer:header">
      <v-tabs v-model="tab">
        <v-tab>PACIENTE</v-tab>
        <v-tab>ANTECEDENTES</v-tab>
      </v-tabs>
    </template>
    <template slot="drawer">
      <v-tabs-items v-model="tab">
        <v-tab-item> <PatientInfo :patientId="patientId" /> </v-tab-item>
        <v-tab-item> <Antecedent :patientId="element.patientId" /> </v-tab-item>
      </v-tabs-items>
    </template>

    <template slot="actions">
      <template v-if="form">
        <own-btn
          @click="showLog(element)"
          v-if="elementIndex > -1"
          tooltip="Historial"
          icon
        >
          <v-icon> fa-history </v-icon>
        </own-btn>

        <own-btn @click="reset()" tooltip="Cerrar" icon>
          <v-icon>far fa-times-circle</v-icon>
        </own-btn>
      </template>
      <template v-else>
        <own-btn @click="form = true" tooltip="Nuevo" icon>
          <v-icon>fa-plus</v-icon>
        </own-btn>
      </template>
    </template>

    <template slot="content">
      <List :elements="elements" :show="!form" />
      <template v-show="form">
        <v-stepper v-model="step" vertical>
          <v-stepper-step :complete="step > 1" step="1">
            MOTIVO DE CONSULTA
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card color="grey lighten-4" class="particle">
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-textarea background-color="white" outlined label="Descripción" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-textarea
                      background-color="white"
                      outlined
                      label="Enfermedad o problema actual"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="step = 2"> Continue </v-btn>
                <v-btn @click="reset()" text> Cancel </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2"> SIGNOS VITALES </v-stepper-step>

          <v-stepper-content step="2">
            <v-card color="grey lighten-4" class="mb-12 particle" height="200px">
            </v-card>
            <v-btn color="primary" @click="step = 3"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3">
            Select an ad format and name ad unit
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card color="grey lighten-4" class="mb-12 particle" height="200px">
            </v-card>
            <v-btn color="primary" @click="step = 4"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step step="4"> View setup instructions </v-stepper-step>
          <v-stepper-content step="4">
            <v-card color="grey lighten-4" class="mb-12 particle" height="200px">
            </v-card>
            <v-btn color="primary" @click="step = 1"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper>
      </template>
    </template>
  </own-panel>
</template>

<script lang="ts">
//@ts-ignore
import Controller from './MedicalRecordController'
export default Controller
</script>
