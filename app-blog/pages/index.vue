<template lang="pug">
  section.container
    el-card(style="flex: 1")
      div.clearfix(slot="header")
        span ログイン
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

  isCreateMode!: string

  formData!: Object

  get buttonText(): string {
    return this.isCreateMode ? '新規登録' : 'ログイン'
  }

  click() {
    console.log(authStore)
  }
}
</script>

<style lang="scss">
.form-content {
  margin: 16px 0;
}
</style>
