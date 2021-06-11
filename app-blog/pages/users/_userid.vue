<template lang="pug">
  div.user-page
    el-card
      div(v-if="user")
        h2 {{ user.id }}
        el-table(:data="user.posts")
          el-table-column(label="title" prop="title" width="100")
          el-table-column(label="created" width="100")
            template(slot-scope="data")
              div {{ new Date(data.row.createdAt)}}
          el-table-column(label="body" prop="body")
        el-button(@click="back") ユーザー一覧へ
      div(v-else)
        | Not found {{ userId }}


</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { userStore } from '~/utils/store-accessor'
import { User } from '~/domain/user'

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
    return userStore.user(this.userId)
  }

  back() {
    this.$router.push('/users/')
  }
}
</script>
