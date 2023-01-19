export const fileUpload = async (file) => {
  if (!file) throw new Error('No tenemos ningun archivo a subir')

  const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL

  const formData = new FormData()
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const res = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) throw new Error('No se pudo subir imagen')

    const cloudResponse = await res.json()
    return cloudResponse.secure_url
  } catch (error) {
    throw new Error(error.message)
  }
}
