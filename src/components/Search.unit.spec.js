import { mount } from '@vue/test-utils'
import Search from '@/components/Search'

const mountBuild = () => {
  const wrapper = mount(Search)
  const input = wrapper.find('input[type="search"]')
  const form = wrapper.find('form')

  return {
    wrapper,
    input,
    form
  }
}

describe('Search - unit', () => {
  it('should mount the component', () => {
    const { wrapper } = mountBuild()
    expect(wrapper.vm).toBeDefined()
  })

  it('should emit search event when form is submitted', async () => {
    const { wrapper, input, form } = mountBuild()
    const term = 'Júnior'
    await input.setValue(term)
    await form.trigger('submit')

    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term }])
  })

  it('Should emit search event when search input is cleared when esc button is pressed', async () => {
    const { wrapper, input } = mountBuild()
    const term = 'Júnior'
    await input.setValue(term)
    await input.trigger('keydown.esc')

    expect(wrapper.vm.term).toBe('')
    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term: '' }])
  })

  it('Should emit search event when search input is cleared without pressing the esc key', async () => {
    const { wrapper, input } = mountBuild()
    const term = 'Júnior'
    await input.setValue(term)
    await input.setValue('')

    expect(wrapper.vm.term).toBe('')
    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term: '' }])
  })
})
