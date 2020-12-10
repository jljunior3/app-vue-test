import { mount } from '@vue/test-utils'
import UserSelected from '@/components/UserSelected'

describe('UserSelected', () => {
  it('should mount the component', async () => {
    const wrapper = mount(UserSelected, {
      mocks: {
        $store: {
          state: {
            userSelected: ''
          }
        }
      }
    })
    expect(wrapper.vm).toBeDefined()
  })

  it('should render a message when userselected is different from empty', () => {
    const wrapper = mount(UserSelected, {
      mocks: {
        $store: {
          state: {
            userSelected: { id: 1, name: 'Carlos' }
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Usuário selecionado: Carlos')
  })
})
