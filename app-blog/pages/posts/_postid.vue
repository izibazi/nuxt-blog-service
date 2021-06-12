<template lang="pug">
  div.container.post-page
    el-card
      div(v-if="post")
        div(slot="header")
          h2 {{ post.title }}
          span by {{ post.userId }}
        div.body {{ post.body }}
        div(v-if="isLiked")
          el-button(@click="clickUnlike") Unlike
        div(v-else)
          el-button(@click="clickLike") Like
        nuxt-link(to="/posts") 投稿一覧へ
      div(v-else)
        | Not found {{ postId }}
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { postStore, authStore } from '~/utils/store-accessor'
import { Post } from '~/domain/post'

@Component({})
export default class PostPage extends Vue {
  async fetch(context: Context) {
    if (postStore.post(context.route.params.postid)) return
    await postStore.fetchPost(context.route.params.postid)
  }

  get postId(): string {
    return this.$route.params.postid
  }

  get post(): Post | undefined {
    return postStore.post(this.postId)
  }

  get isLiked(): boolean {
    return authStore.isLiked(this.postId)
  }

  async clickLike() {
    await authStore.addLike({ postId: this.postId })
  }

  async clickUnlike() {
    await authStore.removeLike({ postId: this.postId })
  }
}
</script>
