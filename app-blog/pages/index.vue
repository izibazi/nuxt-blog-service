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
import { Vue, Component } from 'nuxt-property-decorator'
import { authStore } from '~/utils/store-accessor'
import { IUser } from '~/domain/user'

@Component({})
export default class IndexPage extends Vue {
  asyncData() {
    return {
      isCreateMode: false,
      formData: {
        id: '',
      },
    }
  }

  isCreateMode: boolean = false

  formData!: IUser

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
      this.errors.push(error.message)
    })
    this.movePostPage()
  }

  async login() {
    this.errors = []
    await authStore.login(this.formData.id).catch((error) => {
      this.errors.push(error.message)
    })
    this.movePostPage()
  }

  movePostPage() {
    console.log(authStore.user?.id)
    if (authStore.user?.id) {
      this.formData.id = authStore.user.id
      this.$router.push('/posts')
    }
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
