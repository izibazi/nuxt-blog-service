import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import cloneDeep from 'lodash.clonedeep'
import { User } from '~/domain/user'
import { Like } from '~/domain/like'
import { IUserRepository } from '~/domain/iUserRepository'
import { $axios } from '~/utils/api'

@Module({ stateFactory: true, name: 'authStore', namespaced: true })
export default class AuthStore extends VuexModule {
  userRepository!: IUserRepository

  user: User | null = null

  get isLoggedIn(): boolean {
    return this.user != null
  }

  get isLiked() {
    return (postId: string): boolean => {
      return (
        this.user?.likes.find((like) => like.postId === postId) !== undefined
      )
    }
  }

  @Mutation
  setUser(user: User): void {
    this.user = user ? Object.assign({ likes: [] }, user) : null
  }

  @Action({ commit: 'setUser', rawError: true })
  public async login(id: string) {
    if (id == null || id.length === 0)
      throw new Error('Can not login.id is empty!')
    const { data } = await this.userRepository.login(id)
    if (!data?.id) throw new Error('invalid user')
    return data
  }

  @Action({ commit: 'setUser', rawError: true })
  public async register(id: string) {
    id = id.trim()
    if (id.length === 0) throw new Error('Can not register.id is empty!')
    await this.userRepository.create(id)
    const { data } = await this.userRepository.login(id)
    if (!data?.id) throw new Error('invalid user')
    return data
  }

  @Action({ commit: 'setUser', rawError: true })
  public async addLike(payload: { postId: string }) {
    const clone = cloneDeep(this.user!)
    clone.likes.push({
      userId: clone.id,
      likedAt: new Date().getTime(),
      postId: payload.postId,
    })
    const { data } = await this.userRepository.edit(clone)
    return data
  }

  @Action({ commit: 'setUser', rawError: true })
  public async removeLike(payload: { postId: string }) {
    const clone = cloneDeep(this.user!)
    clone.likes = clone.likes.filter(
      (like: Like) => payload.postId !== like.postId
    )
    const { data } = await this.userRepository.edit(clone)
    return data
  }
}
