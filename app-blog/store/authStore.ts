import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { User } from '~/domain/user'
import { IUserRepository } from '~/domain/iUserRepository'

@Module({ stateFactory: true, name: 'authStore', namespaced: true })
export default class AuthStore extends VuexModule {
  userRepository!: IUserRepository
  user: User | null = null

  get isLoggedIn(): boolean {
    return this.user != null
  }

  @Mutation
  setUser(user: User): void {
    this.user = user
  }

  @Action({ commit: 'setUser', rawError: true })
  public async login(id: string) {
    if (id == null || id.length === 0)
      throw new Error('Can not login.id is empty!')
    const data = await this.userRepository.login(id)
    if (!data?.id) throw new Error('invalid user')
    return data
  }

  @Action({ commit: 'setUser', rawError: true })
  public async register(id: string) {
    if (id == null || id.length === 0)
      throw new Error('Can not register.id is empty!')
    await this.userRepository.create(id)
    const data = await this.userRepository.login(id)
    if (!data?.id) throw new Error('invalid user')
    return data
  }
}
