import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import { Post } from '~/domain/post'
import { $axios } from '~/utils/api'

@Module({ stateFactory: true, name: 'postStore', namespaced: true })
export default class PostStore extends VuexModule {
  posts: Post[] = []

  get post() {
    return (id: string): Post | undefined => {
      return this.posts.find((i) => i.id === id)
    }
  }

  @Mutation
  setPosts(posts: Post[]) {
    this.posts = posts
  }

  @Mutation
  addPost(post: Post) {
    this.posts.push(post)
  }

  @Action({ rawError: true, commit: 'setPosts' })
  public async fetch() {
    const data = await $axios.$get('/posts.json')
    const posts = Object.entries(data)
      .reverse()
      .map(([id, content]) => {
        return { id, ...(content as object) }
      })
    return posts
  }

  @Action({ rawError: true, commit: 'addPost' })
  public async fetchPost(postId: string) {
    if (this.post(postId)) return

    const data = await $axios.$get(`/posts/${postId}.json`)
    return { id: postId, ...data }
  }

  @Action({ rawError: true, commit: 'addPost' })
  public async create(payload: {
    title: string
    body: string
    userId: string
  }) {
    const user = await $axios.$get(`/users/${payload.userId}.json`)
    if (user == null || user.id == null) {
      throw new Error('not found user')
    }
    const result = await $axios.$post('/posts.json', payload)
    const createdAt = new Date().getTime()
    const post = { id: result.name, ...payload, createdAt }
    const putData = {
      id: result.name,
      body: payload.body,
      title: payload.title,
      createdAt,
    }
    await $axios.$put(`/users/${user.id}/posts.json`, [
      ...(user.posts || []),
      putData,
    ])
    return post
  }
}
