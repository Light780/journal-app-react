import { Provider } from 'react-redux'
import { LoginPage } from '../../../src/auth/pages/LoginPage'
import { fireEvent, render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../../src/store/auth/authSlice'
import { MemoryRouter } from 'react-router-dom'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
})

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => () => mockStartLoginEmailPassword({ email, password })
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))

describe('Pruebas en <LoginPage />', () => {
  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar el componente correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getAllByText('Login')).toBeTruthy()
  })

  test('boton de Google debe de llamar startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const googleBtn = screen.getByLabelText('google-btn')
    fireEvent.click(googleBtn)
    expect(mockStartGoogleSignIn).toHaveBeenCalled()
  })

  test('submit debe de llamar startLoginEmailPassword con valores especificos', () => {
    const email = 'bruno@gmail.com'
    const password = '123456'

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const emailField = screen.getByRole('textbox', { name: 'Correo' })
    fireEvent.change(emailField, { target: { name: 'email', value: email } })

    const passwordField = screen.getByRole('textbox', { type: 'password' })
    fireEvent.change(passwordField, { target: { name: 'password', value: password } })

    const form = screen.getByLabelText('form')
    fireEvent.submit(form)

    expect(mockStartLoginEmailPassword).toHaveBeenCalledWith({ email, password })
  })
})
