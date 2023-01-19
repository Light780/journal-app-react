import { DeleteOutlined, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useJournal } from '../../hooks'
import { ImageGallery } from '../components/ImageGallery'

export const NoteView = () => {
  const {
    body,
    dateString,
    fileInputRef,
    imageUrls,
    isSaving,
    onDelete,
    onFileInputChange,
    onInputChange,
    onSaveNote,
    title
  } = useJournal()
  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between' sx={{ mb: 1 }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>

      <Grid item>
        <input
          type='file'
          ref={fileInputRef}
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button disabled={isSaving} color='primary' sx={{ padding: 2 }} onClick={onSaveNote}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          name='title'
          value={title}
          onChange={onInputChange}
          variant='filled'
          fullWidth
          placeholder='Ingrese un titulo'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
        />

        <TextField
          type='text'
          name='body'
          value={body}
          onChange={onInputChange}
          variant='filled'
          multiline
          fullWidth
          placeholder='¿Qué sucedió en el día de hoy?'
          minRows={5}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color='error'
        >
          <DeleteOutlined />
          Borrar
        </Button>
      </Grid>

      <ImageGallery images={imageUrls} />

    </Grid>
  )
}
