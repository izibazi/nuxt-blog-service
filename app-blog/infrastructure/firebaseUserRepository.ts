import { AxiosResponse } from 'axios'
import { IUserRepository } from '~/domain/iUserRepository'
import { User } from '~/domain/user'
import { $axios } from '~/utils/api'

export default class FirebaseUserRepository implements IUserRepository {
  create(id: string): Promise<AxiosResponse<User>> {
    const payload: any = {}
    payload[id] = { id }
    return $axios.patch<User>(`users.json`, payload)
  }

  login(id: string): Promise<AxiosResponse<User>> {
    return $axios.get<User>(`/users/${id}.json`)
  }
}
