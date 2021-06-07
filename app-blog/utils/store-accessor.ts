/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import FirebaseUserRepository from '~/infrastructure/firebaseUserRepository'
import AuthStore from '~/store/authStore'
import PostStore from '~/store/postStore'

let authStore: AuthStore
let postStore: PostStore
// アプリケーションに必要なStoreを初期化する
function initializeStore(store: Store<any>): void {
  authStore = getModule(AuthStore, store)
  // TODO: Use DIContainer
  authStore.userRepository = new FirebaseUserRepository()
  postStore = getModule(PostStore, store)
}

export { initializeStore, authStore, postStore }
