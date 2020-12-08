import { mount } from '@vue/test-utils'
import UserProfile from '@/components/UserProfile'
import Search from '@/components/Search'

import App from '@/App'

describe('App', () => {
  it('should mount the component', async () => {
    const wrapper = mount(App)
    expect(wrapper.vm).toBeDefined()
  })

  it('should have a child UserProfile', () => {
    const wrapper = mount(App)
    const userProfile = wrapper.findComponent(UserProfile)

    expect(userProfile.exists()).toBe(true)
  })

  it('should have a child UserSearch', () => {
    const wrapper = mount(App)
    const search = wrapper.findComponent(Search)

    expect(search.exists()).toBe(true)
  })
})
