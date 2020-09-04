<template>
  <v-app id="sandbox">
    <v-navigation-drawer mini-variant permanent app>
      <template v-slot:prepend>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <img class="primary" src="/logo.svg" />
          </v-list-item-avatar>
        </v-list-item>
      </template>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="changeRoute(item)"
          link
          class="pt-1 pb-1"
        >
          <v-tooltip right open-delay="1000" color="secondary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" color="secondary">{{ item.icon }}</v-icon>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-menu
              offset-y
              origin="top bottom"
              :nudge-bottom="10"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  class="secondary"
                  style="cursor: pointer;"
                  v-bind="attrs"
                  v-on="on"
                  :src="
                    $store.state.session.profile.image || require('@/assets/user.svg')
                  "
                />
              </template>
              <v-card>
                <v-list class="primary" dark>
                  <v-list-item>
                    <v-list-item-avatar class="primary">
                      <v-img
                        :src="
                          $store.state.session.profile.image ||
                          require('@/assets/user.svg')
                        "
                        alt="avatar"
                      />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $store.state.session.profile.firstName }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{
                        $store.state.session.profile.email
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                  <v-list-item
                    v-for="item in optionItems"
                    :key="item.title"
                    @click="changeRoute(item)"
                  >
                    <v-list-item-action>
                      <v-icon size="17" color="secondary">{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-list-item-avatar>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-main>
      <router-view
        class="app-container"
        tag="v-container"
        fluid
        fill-height
      ></router-view>
    </v-main>
  </v-app>
</template>
<script lang="ts">
//@ts-ignore
import Controller from './AppLayoutController'
export default Controller
</script>
<style lang="sass">
html
  overflow: hidden
.app-container
  height: 100%
  overflow: hidden
</style>
