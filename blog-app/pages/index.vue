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
          el-button(type="primary") {{ buttonText }}

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData() {
    return {
      isCreateMode: false,
      formData: {
        id: '',
      },
    }
  },

  computed: {
    buttonText() {
      return this.$data.isCreateMode ? '作成' : '更新'
    },
  },
})
</script>

<style lang="scss">
.form-content {
  margin: 16px 0;
}
</style>
