import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import { User } from '~/domain/user'
import { $axios } from '~/utils/api'

@Module({ stateFactory: true, namespaced: true, name: 'userStore' })
export default class UserStore extends VuexModule {
  users: User[] = []

  get user() {
    return (id: string): User | undefined => {
      return this.users.find((user) => user.id === id)
    }
  }

  @Mutation
  addUser(user: User) {
    this.users.push(user)
  }

  @Mutation
  setUsers(users: User[]) {
    this.users = users
  }

  @Action({ rawError: true, commit: 'addUser' })
  public async fetchUser(id: string) {
    if (this.user(id)) return
    const data = await $axios.$get(`/users/${id}.json`)
    return data
  }

  @Action({ rawError: true, commit: 'setUsers' })
  public async fetchUsers() {
    const data = await $axios.$get(`/users.json`)
    const users = Object.entries(data).map(([_, user]) => {
      return user
    })
    return users
  }
}
