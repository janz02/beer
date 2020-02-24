// import { createSlice } from '@reduxjs/toolkit'

import { AppThunk } from 'app/store'
import { NewsletterData } from 'models/newsletter'
import { createSlice } from '@reduxjs/toolkit'

interface NewsletterEditorState {
  error: string
  template?: NewsletterData
}

const initialState: NewsletterEditorState = {
  error: '',
  template: {
    id: 1,
    name: 'example template',
    html: '<div> ...................... example template </div> ',
    version: {
      id: 10,
      version: 10
    },
    versions: [
      {
        id: 10,
        version: 10
      },
      {
        id: 9,
        version: 9
      }
    ]
  }
}

const newsletterEditorSlice = createSlice({
  name: 'newsletterEditor',
  initialState,
  reducers: {}
})

// const {} = newsletterEditorSlice.actions

export default newsletterEditorSlice.reducer

export const getNewsletterTemplate = (id: string | undefined): AppThunk => async (
  dispatch,
  getState
) => {
  // TODO: integration
  console.log('get one', id)
}

export const saveNewsletterTemplate = (id: number): AppThunk => async (dispatch, getState) => {
  // TODO: integration
  console.log('save one', id)
}
