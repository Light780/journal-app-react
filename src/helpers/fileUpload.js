import { getEnviroments } from './getEnviroments'

export const fileUpload = async (file) => {
  if (!file) return null

  const env = getEnviroments()
  const cloudUrl = env.VITE_CLOUDINARY_URL
  const formData = new FormData()
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const res = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) return null

    const cloudResponse = await res.json()
    return cloudResponse.secure_url
  } catch (error) {
    return null
  }
}
