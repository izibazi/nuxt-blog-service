import Cookies from 'universal-cookie'
import { Context } from '@nuxt/types'
import { authStore } from '~/utils/store-accessor'

export default (context: Context) => {
  console.log(`authCookie is browser: ${process.browser}`)
  if (process.browser) {
    return
  }
  const cookie = new Cookies(context.req?.headers.cookie)
  const user = cookie.get('user')
  if (user && user.id) {
    const { id, likes } = user
    authStore.setUser({ id, likes })
  }
}
