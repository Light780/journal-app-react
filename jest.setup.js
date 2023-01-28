import 'whatwg-fetch'
import 'setImmediate'

require('dotenv').config({
  path: '.env.test'
})

jest.mock('./src/helpers/getEnviroments', () => ({
  getEnviroments: () => ({ ...process.env })
}))
