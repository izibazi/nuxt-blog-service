import { IUser } from '~/domain/user'

interface IUserRepository {
  create(id: string): Promise<IUser>
  login(id: string): Promise<IUser>
}

export { IUserRepository }
