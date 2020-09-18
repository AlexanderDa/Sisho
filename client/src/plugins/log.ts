import Vue from 'vue'

let globalLog = new Vue({
  data: {
    $log: false,
    $logData: {},
    $logConfig: {}
  }
})

Vue.mixin({
  methods: {
    $launchLog: (logData: object, logConfig: object) => {
      globalLog.$data.$log = true
      globalLog.$data.$logData = logData
      globalLog.$data.$logConfig = logConfig
    },
    $closeLog: () => {
      globalLog.$data.$log = false
    }
  },
  computed: {
    $log: {
      get: function (): boolean {
        return globalLog.$data.$log
      },
      set: function (value: boolean) {
        globalLog.$data.$log = value
      }
    },

    $logConfig: {
      get: function (): object {
        return globalLog.$data.$logConfig
      },
      set: function (value: object) {
        globalLog.$data.$logConfig = value
      }
    },
    $logData: {
      get: function (): object {
        return globalLog.$data.$logData
      },
      set: function (value: object) {
        globalLog.$data.$logData = value
      }
    }
  }
})
