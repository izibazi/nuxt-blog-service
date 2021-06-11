<template lang="pug">
  div
    el-menu(mode="horizontal" :router="true")
      el-menu-item(index="1" style="pointer-events:none") Nuxt Diary App
      el-menu-item(index="2" :route="{path: '/posts/'}") 投稿
      el-menu-item(index="3" key="user" v-if="user" :route="{path: `/users/${user.id}`}"  style="float: right") {{ user.id }}
      el-menu-item(index="3" key="user" v-else :route="{path: '/'}" style="float: right") ログイン
      el-menu-item(index="4" :route="{path: '/posts/new'}" style="float: right") 新規投稿
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { authStore } from '~/utils/store-accessor'
import { User } from '~/domain/user'

@Component({})
export default class TheHeader extends Vue {
  get user(): User | null {
    return authStore.user
  }
}
</script>
