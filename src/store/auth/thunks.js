import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers'
import { clearNotesOnLogout } from '../journal/journalSlice'
import { checkingCredentials, login, logout } from './'

export const startCheckingCredentials = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await loginWithEmailPassword({ email, password })
    if (!result.ok) return dispatch(logout(result))
    return dispatch(login(result))
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await signInWithGoogle()
    if (!result.ok) return dispatch(logout(result))
    return dispatch(login(result))
  }
}

export const startCreatingUserWithEmailPassowrd = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await registerUserWithEmailPassword({ email, password, displayName })
    if (!result.ok) return dispatch(logout(result))
    return dispatch(login(result))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()

    dispatch(clearNotesOnLogout())
    dispatch(logout())
  }
}
