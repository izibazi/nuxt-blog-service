<template lang="pug">
  section.container.posts-page
    el-card(style="flex: 1")
      div.clearfix(slot="header")
        el-input(type="text" placeholder="title" v-model="formData.title")
      div
        el-input(type="textarea" placeholder="body" v-model="formData.body" rows="15")
      div.actions
        el-button(type="primary" @click="post" round :disabled="!postable")
          span.el-icon-upload2
          span Post
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Cookies from 'universal-cookie'
import { postStore, authStore } from '~/utils/store-accessor'

class PostInput {
  title: string = ''
  body: string = ''
  userId: string = ''
}

@Component({})
export default class PostNewPage extends Vue {
  formData: PostInput = new PostInput()

  async post() {
    this.formData.userId = authStore.user?.id
    if (!this.formData.userId) {
      this.logout()
      return
    }
    const post = await postStore.post(this.formData).catch((error) => {
      this.$notify.error(error.message)
      if (error.message === 'not found user') {
        this.logout()
      }
    })

    if (post) {
      this.$notify.success(`${post.title} posted`)
      this.$router.push('/posts')
    }
  }

  logout() {
    const cookie = new Cookies()
    cookie.remove('user')
    this.$router.push('/')
  }

  get postable(): boolean {
    return (
      this.formData.title.trim().length > 0 &&
      this.formData.body.trim().length > 0
    )
  }
}
</script>

<style lang="scss">
.actions {
  margin: 20px;
  float: right;
}
</style>
