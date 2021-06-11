<template lang="pug">
  section.container
    el-card(style="flex: 1")
      div.clearfix(slot="header")
        span ログイン
      div.errors(v-if="errors.length > 0")
        ul
          li(v-for="error in errors" :key="error")
            span {{ error }}
      form
        div.form-content
          span ユーザーID
          el-input(placeholder="username" v-model="formData.id")
        div.form-content
          el-checkbox(v-model="isCreateMode") アカウントを作成する
        div.text-right
          el-button(type="primary" @click="click") {{ buttonText }}

</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'nuxt-property-decorator'
import Cookies from 'universal-cookie'
import { authStore } from '~/utils/store-accessor'
import { User } from '~/domain/user'

@Component({})
export default class IndexPage extends Vue {
  asyncData(context: Context) {
    if (authStore.isLoggedIn) {
      context.redirect('/posts')
      return
    }
    return {
      isCreateMode: false,
      formData: {
        id: '',
      },
    }
  }

  isCreateMode: boolean = false

  formData!: User

  errors: string[] = []

  get buttonText(): string {
    return this.isCreateMode ? '新規登録' : 'ログイン'
  }

  click() {
    if (this.isCreateMode) {
      this.register()
    } else {
      this.login()
    }
  }

  async register() {
    this.errors = []
    await authStore.register(this.formData.id).catch((error) => {
      this.error(error.message)
    })
    this.movePostPage()
  }

  async login() {
    this.errors = []
    await authStore.login(this.formData.id).catch((error) => {
      this.error(error.message)
    })
    this.movePostPage()
  }

  movePostPage() {
    console.log(authStore.user?.id)
    if (authStore.user?.id) {
      this.$notify.success('Thank you for use.')
      const cookie = new Cookies()
      cookie.set('user', { id: authStore.user.id, likes: authStore.user.likes })
      this.$router.push('/posts')
    }
  }

  error(message: string) {
    this.$notify.error(message)
    this.errors.push(message)
  }
}
</script>

<style lang="scss">
.form-content {
  margin: 16px 0;
}

.errors {
  padding: 10px;
  background: #eee;
  border: 1px solid #ccc;
}
</style>
