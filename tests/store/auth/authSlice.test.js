import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { authenticatedState, checkingState, demoUser, initialState, notAuthenticatedState } from '../../fixtures/authFixtures'

describe('Pruebas en authSlice', () => {
  test('debe de regresar el estado inicial y llamarse "auth"', () => {
    expect(authSlice.name).toBe('auth')
    const state = authSlice.reducer(initialState, {})
    expect(state).toEqual(initialState)
  })

  test('debe de realizar la autenticacion', () => {
    const state = authSlice.reducer(initialState, login(demoUser))
    expect(state).toEqual(authenticatedState)
  })

  test('debe de realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, logout(notAuthenticatedState))
    expect(state).toEqual(notAuthenticatedState)
  })

  test('debe de realizar el logout y mostrar un mensaje de error', () => {
    const errorMessage = 'Credenciales incorrectas'
    const state = authSlice.reducer(authenticatedState, logout({
      ...notAuthenticatedState,
      errorMessage
    }))
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage
    })
  })

  test('debe de cambiar el estado en checking', () => {
    const state = authSlice.reducer(initialState, checkingCredentials(checkingState))
    expect(state).toEqual(checkingState)
  })
})
