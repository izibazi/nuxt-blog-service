/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import FirebaseUserRepository from '~/infrastructure/firebaseUserRepository'
import Auth from '~/store/auth'

let authStore: Auth
// アプリケーションに必要なStoreを初期化する
function initializeStore(store: Store<any>): void {
  authStore = getModule(Auth, store)
  // TODO: Use DIContainer
  authStore.userRepository = new FirebaseUserRepository()
}

export { initializeStore, authStore }
