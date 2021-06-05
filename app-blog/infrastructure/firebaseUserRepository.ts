import { IUserRepository } from '~/domain/iUserRepository'
import { IUser } from '~/domain/user'
import { $axios } from '~/utils/api'

export default class FirebaseUserRepository implements IUserRepository {
  create(id: string): Promise<IUser> {
    const payload: any = {}
    payload[id] = { id }
    return $axios.$patch(`users.json`, payload)
  }

  login(id: string): Promise<IUser> {
    return $axios.$get(`/users/${id}.json`)
  }
}
