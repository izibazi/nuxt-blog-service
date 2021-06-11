<template lang="pug">
  div.users-page
    el-card
      div(v-if="users")
        el-table(:data="users")
          el-table-column(prop="id" label="ユーザー名")
          el-table-column(label="post数")
            template(slot-scope="scope") {{ scope.row.posts.length }}
          el-table-column(label="link")
            template(slot-scope="scope")
              el-button(@click="clickUser(scope.row)") 詳細
      div(v-else)
        | Not found users
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { userStore } from '~/store'
import { User } from '~/domain/user'

@Component({})
export default class UsersPage extends Vue {
  async fetch() {
    // if (userStore.users.length > 0) return
    await userStore.fetchUsers()
  }

  get users(): User[] {
    return userStore.users
  }

  clickUser(user: User) {
    this.$router.push(`/users/${user.id}`)
  }
}
</script>
