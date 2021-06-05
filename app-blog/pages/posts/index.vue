<template lang="pug">
  section.container.posts-page
    el-card
      div(slot="header" class="clearfix")
        span 投稿一覧
      el-table(:data="posts" style="width: 100%" class="table")
        el-table-column(prop="title" label="タイトル")
        el-table-column(prop="user.id" label="投稿者")
        el-table-column(prop="createdAt" label="投稿日時")
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { IPost } from '~/domain/post'

@Component({})
export default class PostsPage extends Vue {
  posts: IPost[] = [
    {
      title: 'seita',
      createdAt: '2021',
      user: {
        id: 'kanta',
      },
    },
  ]
}
</script>

<style lang="scss">
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
