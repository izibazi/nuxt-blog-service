import { Store } from 'vuex'
import { initializeStore } from '~/utils/store-accessor'
const initalizer = (store: Store<any>) => initializeStore(store)
export const plugins = [initalizer]
export * from '~/utils/store-accessor'
