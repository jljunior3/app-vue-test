import { mount } from '@vue/test-utils'
import Search from '@/components/Search'

describe('Search - unit', () => {
  it('should mount the component', () => {
    const wrapper = mount(Search)
    expect(wrapper.vm).toBeDefined()
  })

  it('should emit search event when form is submitted', async () => {
    const wrapper = mount(Search)
    const term = 'Júnior'
    await wrapper.find('input[type="search"]').setValue(term)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term }])
  })

  it('Should emit search event when search input is cleared when esc button is pressed', async () => {
    const wrapper = mount(Search)
    const term = 'Júnior'
    const input = wrapper.find('input[type="search"]')
    await input.setValue(term)
    await input.trigger('keydown.esc')

    expect(wrapper.vm.term).toBe('')
    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term: '' }])
  })

  it('Should emit search event when search input is cleared without pressing the esc key', async () => {
    const wrapper = mount(Search)
    const term = 'Júnior'
    const input = wrapper.find('input[type="search"]')
    await input.setValue(term)
    await input.setValue('')

    expect(wrapper.vm.term).toBe('')
    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term: '' }])
  })
})
