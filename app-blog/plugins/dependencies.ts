import { Context } from '@nuxt/types'

export interface Dependencies {
  environment: string
}

export default (_: Context, inject: any) => {
  const environment = process.env.environment || 'development'
  const deps: Dependencies = {
    environment,
  }
  inject('deps', deps)
}
