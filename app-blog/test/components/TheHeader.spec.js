import { mount, RouterLinkStub } from '@vue/test-utils'
import TheHeader from '~/components/TheHeader.vue'
import { createStore } from '~~/.nuxt/store'
import { initializeStore } from '~/utils/store-accessor'

describe('TheHeader', () => {
  let wrapper
  beforeEach(() => {
    initializeStore(createStore())
    wrapper = null
    wrapper = mount(TheHeader, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
  })

  test('title', () => {
    expect(wrapper.findAll('.el-menu-item').at(0).props().route.path).toBe('/')
    expect(wrapper.find('h1').text()).toBe('Nuxt Diary App')
  })
  test('スナップショット', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
