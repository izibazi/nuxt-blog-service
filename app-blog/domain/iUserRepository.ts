import { AxiosResponse } from 'axios'
import { User } from '~/domain/user'
interface IUserRepository {
  create(id: string): Promise<AxiosResponse<User>>
  login(id: string): Promise<AxiosResponse<User>>
}

export { IUserRepository }
