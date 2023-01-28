export const initialState = {
  status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const checkingState = {
  status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authenticatedState = {
  status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
  uid: 'ABC123',
  email: 'demo@gmail.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.jpg',
  errorMessage: null
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const demoUser = {
  uid: 'ABC123',
  email: 'demo@gmail.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.jpg'
}
