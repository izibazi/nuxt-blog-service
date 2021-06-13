import { Dependencies } from '~/plugins/dependencies'

declare module 'vue/types/vue' {
  interface Vue {
    $deps: Dependencies
  }
}

declare module '@nuxt/types' {
  interface Context {
    $deps: Dependencies
  }
}

declare module 'vuex/types' {
  /* eslint-disable no-unused-vars */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    readonly $deps: Dependencies
  }
}
