import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSaving: false,
  messageSaved: '',
  messageDeleted: '',
  notes: [],
  active: null

}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
      state.messageSaved = ''
      state.messageDeleted = ''
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
      state.messageDeleted = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
      state.messageDeleted = ''
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false
    },
    clearNotesOnLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ''
      state.messageDeleted = ''
      state.notes = []
      state.active = null
    },
    updateNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note
      })
      state.messageSaved = `${action.payload.title} actualizada correctamente`
    },
    deleteNoteById: (state, action) => {
      state.messageDeleted = `${state.active.title} eliminada correctamente`
      state.active = null
      state.notes = state.notes.filter(note => note.id !== action.payload)
    }
  }
})

export const {
  addNewEmptyNote,
  clearNotesOnLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} = journalSlice.actions
