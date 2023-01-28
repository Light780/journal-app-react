import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials, login, logout } from '../../../src/store/auth'
import { clearNotesOnLogout } from '../../../src/store/journal'
import { startCheckingCredentials, startCreatingUserWithEmailPassowrd, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks'
import { demoUser } from '../../fixtures/authFixtures'

jest.mock('../../../src/firebase/providers')

describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('debe de invocar el checkingAuthentication', async () => {
    await startCheckingCredentials()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser }
    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Un error en google' }

    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData))
  })

  test('startCreatingUserWithEmailPassowrd debe de llamar el checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: demoUser.password, displayName: demoUser.displayName }

    await registerUserWithEmailPassword.mockResolvedValue(loginData)

    await startCreatingUserWithEmailPassowrd(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startCreatingUserWithEmailPassowrd debe de llamar el checkingCredentials y login - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Ya existe usuario registrado con ese email' }
    const formData = { email: demoUser.email, password: demoUser.password, displayName: demoUser.displayName }

    await registerUserWithEmailPassword.mockResolvedValue(loginData)

    await startCreatingUserWithEmailPassowrd(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData))
  })

  test('startLoginWithEmailPassword debe de llamar el checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: demoUser.password }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startLoginWithEmailPassword debe de llamar el checkingCredentials y login - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Error de credenciales' }
    const formData = { email: demoUser.email, password: demoUser.password }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData))
  })

  test('startLogout debed e llamar logoutFirebase, clearNotes y logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesOnLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
