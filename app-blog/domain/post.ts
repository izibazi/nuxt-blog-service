import { Like } from '~/domain/like'
type Post = {
  id: string
  title: string
  body: string
  createdAt: number
  userId: string
  likes: Like[]
}

export { Post }
