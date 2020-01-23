import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Site } from 'models/site'

interface SiteEditorState {
  site?: Site
  loadingData: boolean
  loadingSave: boolean
  error: string
}

const initialState: SiteEditorState = {
  loadingData: false,
  loadingSave: false,
  error: ''
}

const siteEditorSlice = createSlice({
  name: '@site-editor',
  initialState,
  reducers: {
    resetSiteEditor(state) {
      state.site = undefined
      state.loadingData = false
      state.loadingSave = false
      state.error = ''
    },
    getSiteRequest(state) {
      state.loadingData = true
    },
    getSiteSuccess(state, action: PayloadAction<{ site: Site }>) {
      state.site = action.payload.site
      state.loadingData = false
      state.error = ''
    },
    getSiteFail(state, action: PayloadAction<string>) {
      state.loadingData = false
      state.error = action.payload
    },

    saveSiteRequest(state) {
      state.loadingSave = true
    },
    saveSiteSuccess(state) {
      state.loadingSave = false
      state.error = ''
    },
    saveSiteFail(state, action: PayloadAction<string>) {
      state.loadingSave = false
      state.error = action.payload
    }
  }
})

const { getSiteRequest, getSiteSuccess, getSiteFail } = siteEditorSlice.actions
const { saveSiteRequest, saveSiteSuccess, saveSiteFail } = siteEditorSlice.actions
export const { resetSiteEditor } = siteEditorSlice.actions

export default siteEditorSlice.reducer

export const getSite = (id: number): AppThunk => async dispatch => {
  dispatch(getSiteRequest())
  try {
    const response = await api.sites.getSites({ id })
    dispatch(getSiteSuccess({ site: response }))
    return ''
  } catch (err) {
    dispatch(getSiteFail(err.toString()))
    return err.toString()
  }
}

export const saveSite = (site: Site, id: number): AppThunk => async dispatch => {
  dispatch(saveSiteRequest())
  try {
    // Todo: integrate correct partner Id
    const partners = await api.partner.listPartners({})
    const partnerId = partners.result?.[0]?.id

    if (partnerId) {
      if (id > 0) {
        await api.sites.updateSites({
          id,
          siteDto: {
            ...site,
            partnerId
          }
        })
        dispatch(getSite(id))
      } else {
        const newId = await api.sites.createSites({
          siteDto: {
            ...site,
            partnerId
          }
        })
        newId.id && dispatch(getSite(newId.id))
      }
      dispatch(saveSiteSuccess())
    } else {
      // TODO: see if is necesary after integration
      throw Error('No partner id')
    }
  } catch (err) {
    dispatch(saveSiteFail(err.toString()))
  }
}
