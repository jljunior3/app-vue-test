import { mount } from '@vue/test-utils'
import { makeServer } from '@/miragejs/server'
import UserProfile from './UserProfile.vue'

describe('UserProfile - unit', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should match snapshot', () => {
    const wrapper = mount(UserProfile, {
      propsData: {
        user: server.create('user', {
          name: 'Júnior',
          email: 'teste@teste.com.br'
        })
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should mount the component', async () => {
    const wrapper = mount(UserProfile, {
      propsData: {
        user: server.create('user', {
          name: 'Júnior',
          email: 'teste@teste.com.br'
        })
      }
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.text()).toContain('Júnior')
    expect(wrapper.text()).toContain('teste@teste.com.br')
  })
})
