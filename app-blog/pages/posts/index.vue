<template lang="pug">
  section.container.posts-page
    el-card
      div(slot="header" class="clearfix")
        span 投稿一覧
      el-table(:data="posts" style="width: 100%" class="table" @row-click="clickPost")
        el-table-column(prop="id" label="id")
        el-table-column(prop="title" label="タイトル")
        el-table-column(label="本文")
          template(slot-scope="props")
            p {{ props.row.body.substr(0, 10) }}...
        el-table-column(prop="createdAt" label="投稿日時")
        el-table-column(prop="userId" label="投稿者")
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'nuxt-property-decorator'
import { Post } from '~/domain/post'
import { postStore } from '~/utils/store-accessor'

@Component({})
export default class PostsPage extends Vue {
  async asyncData(_: Context) {
    await postStore.fetch()
  }

  get posts(): Post[] {
    return postStore.posts
  }

  clickPost(post: Post) {
    this.$router.push(`/posts/${post.id}`)
  }
}
</script>

<style lang="scss">
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
