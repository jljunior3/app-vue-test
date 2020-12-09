import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { makeServer } from '@/miragejs/server'
import axios from 'axios'
import App from '@/App'
import UserProfile from '@/components/UserProfile'
import Search from '@/components/Search'

jest.mock('axios', () => ({
  get: jest.fn()
}))

describe('App', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should mount the component', async () => {
    const wrapper = mount(App)
    expect(wrapper.vm).toBeDefined()
  })

  it('should have a child UserSearch', () => {
    const wrapper = mount(App)
    const search = wrapper.findComponent(Search)

    expect(search.exists()).toBe(true)
  })

  it('should call axios.get on component mount', () => {
    mount(App, {
      mocks: {
        $axios: axios
      }
    })

    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith('/api/users')
  })

  it('should have a child UserProfile', async () => {
    const users = server.createList('user', 10)
    axios.get.mockReturnValue(Promise.resolve({ data: { users } }))

    const wrapper = mount(App, {
      mocks: {
        $axios: axios
      }
    })
    await Vue.nextTick()
    const userProfile = wrapper.findAllComponents(UserProfile)

    expect(userProfile).toHaveLength(10)
  })

  it('should display the error message when promise rejects', async () => {
    axios.get.mockReturnValue(Promise.reject(new Error('')))

    const wrapper = mount(App, {
      mocks: {
        $axios: axios
      }
    })
    await Vue.nextTick()

    expect(wrapper.text()).toContain('Problemas ao carregar a lista!')
  })

  it('should filter the list of users when the event is triggered ', async () => {
    //arrange
    const users = [
      ...server.createList('user', 10),
      server.create('user', {
        name: 'Junivan',
        email: 'teste@teste.com.br'
      }),
      server.create('user', {
        name: 'Carlos Junivan',
        email: 'junivan@teste.com.br'
      })
    ]

    const term = 'Junivan'

    axios.get.mockReturnValue(Promise.resolve({ data: { users } }))

    const wrapper = mount(App, {
      mocks: {
        $axios: axios
      }
    })
    await Vue.nextTick()

    //act
    const search = wrapper.findComponent(Search)
    search.find('input[type="search"]').setValue(term)
    await search.find('form').trigger('submit')

    //assert
    const usersProfile = wrapper.findAllComponents(UserProfile)
    expect(wrapper.vm.searchTerm).toEqual(term)
    expect(usersProfile).toHaveLength(2)
  })

  it('should filter the list of users when a search is cleanned ', async () => {
    //arrange
    const users = [
      ...server.createList('user', 10),
      server.create('user', {
        name: 'Junivan',
        email: 'teste@teste.com.br'
      }),
      server.create('user', {
        name: 'Carlos Junivan',
        email: 'junivan@teste.com.br'
      })
    ]

    const term = 'Junivan'

    axios.get.mockReturnValue(Promise.resolve({ data: { users } }))

    const wrapper = mount(App, {
      mocks: {
        $axios: axios
      }
    })
    await Vue.nextTick()

    //act
    const search = wrapper.findComponent(Search)
    search.find('input[type="search"]').setValue(term)
    await search.find('form').trigger('submit')
    search.find('input[type="search"]').setValue('')
    await search.find('form').trigger('submit')

    //assert
    const usersProfile = wrapper.findAllComponents(UserProfile)
    expect(wrapper.vm.searchTerm).toEqual('')
    expect(usersProfile).toHaveLength(12)
  })

  it('should filter the user list even if the term is uppercase or lowercase', async () => {
    //arrange
    const users = [
      ...server.createList('user', 10),
      server.create('user', {
        name: 'Junivan',
        email: 'teste@teste.com.br'
      }),
      server.create('user', {
        name: 'Carlos JUNIVAN',
        email: 'junivan@teste.com.br'
      })
    ]

    const term = 'JUNIVAN'

    axios.get.mockReturnValue(Promise.resolve({ data: { users } }))

    const wrapper = mount(App, {
      mocks: {
        $axios: axios
      }
    })
    await Vue.nextTick()

    //act
    const search = wrapper.findComponent(Search)
    search.find('input[type="search"]').setValue(term)
    await search.find('form').trigger('submit')

    //assert
    const usersProfile = wrapper.findAllComponents(UserProfile)
    expect(wrapper.vm.searchTerm).toEqual(term)
    expect(usersProfile).toHaveLength(2)
  })

  it('should show a message when the search returns empty', async () => {
    //arrange
    const users = [...server.createList('user', 10)]

    const term = 'XPTO'

    axios.get.mockReturnValue(Promise.resolve({ data: { users } }))

    const wrapper = mount(App, {
      mocks: {
        $axios: axios
      }
    })
    await Vue.nextTick()

    //act
    const search = wrapper.findComponent(Search)
    search.find('input[type="search"]').setValue(term)
    await search.find('form').trigger('submit')

    //assert
    const usersProfile = wrapper.findAllComponents(UserProfile)
    expect(wrapper.vm.searchTerm).toEqual(term)
    expect(usersProfile).toHaveLength(0)
    expect(wrapper.text()).toContain('Nenhum usuário encontrado!')
  })
})
