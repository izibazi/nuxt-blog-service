import { Like } from '~/domain/like'
type User = {
  id: string
  likes: Like[]
}

export { User }
