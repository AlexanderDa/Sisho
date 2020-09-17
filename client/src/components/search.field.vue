<template>
  <v-text-field
    :class="rounded !== false ? 'sf-rounded' : ''"
    @input="v => v !== '' || clear()"
    @keyup.enter="input()"
    @click:clear="clear()"
    v-model="internalValue"
    autocomplete="off"
    label="Buscar ..."
    class="search-field"
    type="search"
    :value="value"
    clearable
    dense
    solo
  >
    <template v-slot:prepend> </template>

    <template v-slot:append>
      <v-btn @click="input()" color="secondary" small icon>
        <v-icon small>fa-search</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Emit } from 'vue-property-decorator'

@Component({})
export default class SearchComponent extends Vue {
  @Prop() value!: string
  @Prop({ default: false }) rounded!: boolean

  private internalValue: string | null = ''

  beforeMount(): void {
    this.internalValue = this.value
  }

  private clear(): void {
    this.internalValue = null
    this.input()
  }

  @Emit('input')
  input(): string | null {
    return this.internalValue
  }
}
</script>

<style lang="sass">
.sf-rounded
    border-radius: 30px

.search-field .v-text-field__details
    display: none
</style>
