// @ts-ignore
import { IUser } from '~/domain/user.ts'

interface IPost {
  title: string
  createdAt: string
  user: IUser
}

export { IPost }
