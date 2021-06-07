import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import { IPost } from '~/domain/post'
import { $axios } from '~/utils/api'

@Module({ stateFactory: true, name: 'postStore', namespaced: true })
export default class PostStore extends VuexModule {
  posts: IPost[] = []

  @Mutation
  setPosts(posts: IPost[]) {
    this.posts = posts
  }

  @Mutation
  addPost(post: IPost) {
    this.posts.push(post)
  }

  @Action({ rawError: true, commit: 'addPost' })
  public async post(payload: { title: string; body: string; userId: string }) {
    const user = await $axios.$get(`/users/${payload.userId}.json`)
    console.log(user.id)
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
