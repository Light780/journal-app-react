import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../store/journal'
import { useForm } from './useForm'

export const useJournal = () => {
  const dispatch = useDispatch()
  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
  const { body, title, date, onInputChange, formState } = useForm(note)
  const dateString = useMemo(() => new Date(date).toUTCString(), [date])
  const fileInputRef = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return

    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  return {
    body,
    title,
    dateString,
    isSaving,
    imageUrls: note.imageUrls,
    onInputChange,
    fileInputRef,
    onSaveNote,
    onFileInputChange,
    onDelete
  }
}
