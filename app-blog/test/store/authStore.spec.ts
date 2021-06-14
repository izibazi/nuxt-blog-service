import { createStore } from '~~/.nuxt/store'
import { initializeStore, authStore } from '~/utils/store-accessor'
import { $axios } from '~/utils/api'

jest.mock('~/utils/api', () => ({
  $axios: {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    patch: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
  },
}))

describe('authStore', () => {
  beforeEach(() => {
    initializeStore(createStore())
  })

  describe('user', () => {
    test('デフォルトはnull', () => {
      expect(authStore.user).toBeNull()
    })
  })

  describe('register', () => {
    test('空文字の場合はエラーを返す', async () => {
      await authStore.register('').catch((error) => {
        expect(error.message).toEqual('Can not register.id is empty!')
      })
    })
    test('スペースのみの時もエラーを返す', async () => {
      await authStore.register('   ').catch((error) => {
        expect(error.message).toEqual('Can not register.id is empty!')
      })
    })
    test('成功した場合は、userプロパティが更新される', async () => {
      const id = 'test'
      jest.spyOn($axios, 'get').mockResolvedValueOnce({ data: { id } })
      jest.spyOn($axios, 'patch').mockResolvedValueOnce({ data: { id } })
      await authStore.register(id)
      expect(authStore.user?.id).toEqual(id)
    })
  })

  describe('addLike', () => {
    test('正しく追加される', async () => {
      authStore.setUser({ id: 'test', likes: [] })
      jest.spyOn($axios, 'put').mockResolvedValueOnce({
        data: {
          id: 'test',
          likes: [{ postId: '1', userId: 'test', likedAt: 111 }],
        },
      })
      await authStore.addLike({ postId: '1' })
      expect(authStore.user?.likes.length).toBe(1)
    })
  })
})
