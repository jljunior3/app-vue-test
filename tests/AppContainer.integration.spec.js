import { mount } from '@vue/test-utils'
import App from '@/App'

describe('App', () => {
  it('should mount the component', async () => {
    const wrapper = mount(App)
    expect(wrapper.vm).toBeDefined()
  })
})
