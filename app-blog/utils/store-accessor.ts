/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import auth from '~/store/auth'

let authStore: auth | undefined
// アプリケーションに必要なStoreを初期化する
function initializeStore(store: Store<any>): void {
  authStore = getModule(auth, store)
}

export { initializeStore, authStore }
