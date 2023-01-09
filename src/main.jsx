import React from 'react'
import ReactDOM from 'react-dom/client'
import { JournalApp } from './JournalApp'
import './styles.css'
import { AppTheme } from './theme/AppTheme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppTheme>
      <JournalApp />
    </AppTheme>
  </React.StrictMode>
)
