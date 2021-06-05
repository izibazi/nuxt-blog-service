import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IUser } from '~/domain/user'
import { $axios } from '~/utils/api'

@Module({ stateFactory: true, name: 'auth' })
export default class auth extends VuexModule {
  user: IUser | null = null

  get isLoggedIn(): boolean {
    return this.user != null
  }

  @Mutation
  setUser(user: IUser): void {
    this.user = user
  }

  @Action({ rawError: true })
  public async login(id: string) {
    const data = await $axios.$get(`/users/${id}.json`)
    if (!data.id) throw new Error('invalid user')
    this.setUser(data)
  }

  @Action
  public async register(id: string) {
    await $axios.$patch('/users.json', { id })
    await this.login(id)
  }
}
