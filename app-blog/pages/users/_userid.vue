<template lang="pug">
  div.user-page
    el-card
      div(v-if="user")
        h2 {{ user.id }}

        h3 Posts
        el-table(:data="user.posts")
          el-table-column(label="title" prop="title" width="100")
          el-table-column(label="created" width="100")
            template(slot-scope="data")
              div {{ new Date(data.row.createdAt)}}
          el-table-column(label="body" prop="body")
        h3 Likes
        el-table(:data="user.likes")
          el-table-column(label="link")
            template(slot-scope="data")
              el-button(@click="clickLikedPost(data.row)") {{ data.row.postId }}
        el-button(@click="back") ユーザー一覧へ
      div(v-else)
        | Not found {{ userId }}


</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { authStore, userStore } from '~/utils/store-accessor'
import { User } from '~/domain/user'
import { Like } from '~/domain/like'

@Component({})
export default class UserPage extends Vue {
  async fetch(context: Context) {
    const id = context.route.params.userid
    if (userStore.user(id)) return
    await userStore.fetchUser(id)
  }

  get userId(): string {
    return this.$route.params.userid
  }

  get user(): User | undefined {
    return this.userId === authStore.user?.id
      ? authStore.user
      : userStore.user(this.userId)
  }

  back() {
    this.$router.push('/users/')
  }

  clickLikedPost(like: Like) {
    this.$router.push(`/posts/${like.postId}`)
  }
}
</script>
