import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassowrd } from '../../store/auth'

const formData = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'El password debe tener más de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const {
    displayName, email, password, onInputChange, formState,
    displayNameValid, emailValid, passwordValid, isFormValid
  } = useForm(formData, formValidations)

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(startCreatingUserWithEmailPassowrd(formState))
  }

  return (
    <AuthLayout title='Crear cuenta'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre completo'
              type='text'
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              placeholder='Nombre completo'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
              placeholder='correo@google.com'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              name='password'
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              onChange={onInputChange}
              placeholder='contraseña'
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} display={errorMessage ? '' : 'none'} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                disabled={isCheckingAuthentication}
                variant='contained'
                fullWidth
              >Crear cuenta
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
