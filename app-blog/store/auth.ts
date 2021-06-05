import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IUser } from '~/domain/user'
import { IUserRepository } from '~/domain/iUserRepository'

@Module({ stateFactory: true, name: 'auth', namespaced: true })
export default class Auth extends VuexModule {
  userRepository!: IUserRepository
  user: IUser | null = null

  get isLoggedIn(): boolean {
    return this.user != null
  }

  @Mutation
  setUser(user: IUser): void {
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
