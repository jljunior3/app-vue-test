import { mount } from '@vue/test-utils'
import UserProfile from './UserProfile.vue'

describe('UserProfile Unit Test', () => {
  it('should mount the component', async () => {
    const wrapper = mount(UserProfile)
    expect(wrapper.vm).toBeDefined()
  })
})
