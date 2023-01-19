import { StarOutline } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export const NothingSelectedView = () => {
  const { messageDeleted } = useSelector(state => state.journal)
  useEffect(() => {
    if (messageDeleted.length > 0) {
      Swal.fire('Nota eliminada', messageDeleted, 'success')
    }
  }, [messageDeleted])
  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: 'calc(100vh - 112px)', backgroundColor: 'primary.main', borderRadius: 3 }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid>

      <Grid item xs={12}>
        <Typography color='white' variant='h5'>Selecciona o crea una nota</Typography>
      </Grid>
    </Grid>
  )
}
