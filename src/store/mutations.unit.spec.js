import mutations from '@/store/mutations.js'

describe('SET_USER_SELECTED', () => {
  it('should add a user to the state', () => {
    const user = { id: 1, name: 'Junivan', email: 'junivan@teste.com.br' }
    const state = {
      userSelected: ''
    }

    mutations.SET_USER_SELECTED(state, user)

    expect(state).toEqual({
      userSelected: { id: 1, name: 'Junivan', email: 'junivan@teste.com.br' }
    })
  })
})
