# nuxt-blog-service

Nuxt.jsビギナーズガイドのCHAPTER04の学習

# ゴール

- yarn create nuxt-appで環境を作る。
- TypeScriptを使う。
- nuxt-property-decoratorを使う。
- vuex-module-decoratorを使う。
- 軽量DDDを取り入れる。
- Dependency Injectionパターンを使う。
- レイヤードアーキテクチャーを意識する。
- インフラ層でドメイン層のリポジトリを実装する。
- ユースケース層をVue ComponentにInjectする。
- ドメイン層で、ValueObjectやEntityを実装し、ルール・制約を表現する。
- ドメイン層で、必要なリポジトリのInterfaceを定義することで、依存関係の逆転を利用する。
- インフラ層/UI層 ---> ユースケース(アプリケーション)層 ---> ドメイン層の依存関係を保持する。
- Jestを使ったテスト駆動を最終的に取り入れる。
- テストの方針を明確に定義する。
- UIテストも取り入れたい。
- 公開サーバのデプロイの自動化を行う。

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
