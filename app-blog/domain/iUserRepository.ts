import { User } from '~/domain/user'

interface IUserRepository {
  create(id: string): Promise<User>
  login(id: string): Promise<User>
}

export { IUserRepository }
