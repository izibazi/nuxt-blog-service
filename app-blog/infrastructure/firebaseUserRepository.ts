import { IUserRepository } from '~/domain/iUserRepository'
import { User } from '~/domain/user'
import { $axios } from '~/utils/api'

export default class FirebaseUserRepository implements IUserRepository {
  create(id: string): Promise<User> {
    const payload: any = {}
    payload[id] = { id }
    return $axios.$patch(`users.json`, payload)
  }

  login(id: string): Promise<User> {
    return $axios.$get(`/users/${id}.json`)
  }
}
