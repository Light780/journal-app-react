import { fileUpload } from '../../src/helpers/fileUpload'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dvofr1kv3',
  api_key: '178876115212632',
  api_secret: 'q-cXHnvb_KPzjrfKH_AeLDKoc4A',
  secure: true
})

describe('Pruebas en fileUpload', () => {
  test('debe de subir el archivo correctamente a cloudinary', async () => {
    const imageUrl = 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg'
    const res = await fetch(imageUrl)
    const blob = await res.blob()
    const file = new File([blob], 'goku.jpg')
    const url = await fileUpload(file)
    expect(typeof url).toBe('string')
    const segments = url.split('/')
    const imageId = segments.pop().split('.')[0]
    await cloudinary.api.delete_resources(['journal/' + imageId])
  })

  test('debe de retornar null', async () => {
    const file = new File([], 'foto.jpg')
    const url = await fileUpload(file)
    expect(url).toBe(null)
  })
})
