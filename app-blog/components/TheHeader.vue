<template lang="pug">
  div
    el-menu(mode="horizontal" :router="true")
      el-menu-item(index="1" style="pointer-events:none") Nuxt Diary App
      el-menu-item(index="2" :route="{path: '/posts/'}") 投稿
      el-menu-item(index="3" :route="{path: '/login/'}" style="float: right") ログイン
      el-menu-item(index="4" :route="{path: '/posts/new'}" style="float: right") 新規投稿
</template>
