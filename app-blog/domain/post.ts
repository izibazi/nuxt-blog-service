import { IUser } from '~/domain/user'

interface IPost {
  title: string
  createdAt: string
  user: IUser
}

export { IPost }
