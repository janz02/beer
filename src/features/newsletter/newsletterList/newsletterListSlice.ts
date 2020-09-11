import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { NewsletterPreview } from 'models/newsletter'
import { couponApi } from 'api'
import { history } from 'router/router'
import moment from 'moment'
import { Segment } from 'models/segment'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'

interface NewsletterListState {
  listState: FeatureState
  createState: FeatureState
  deleteState: FeatureState
  templateList: NewsletterPreview[]
  listParams: ListRequestParams
  segments: Segment[]
}

const initialState: NewsletterListState = {
  listState: FeatureState.Initial,
  createState: FeatureState.Initial,
  deleteState: FeatureState.Initial,
  templateList: [],
  listParams: {
    pageSize: 10
  },
  segments: []
}

const newsletterListSlice = createSlice({
  name: 'newsLetterList',
  initialState,
  reducers: {
    resetNewsletterList: () => initialState,
    setListState: (state, action: PayloadAction<FeatureState>) => {
      state.listState = action.payload
    },
    setCreateState: (state, action: PayloadAction<FeatureState>) => {
      state.createState = action.payload
    },
    setDeleteState: (state, action: PayloadAction<FeatureState>) => {
      state.deleteState = action.payload
    },
    getListSuccess(
      state,
      action: PayloadAction<{ templates: NewsletterPreview[]; listParams: ListRequestParams }>
    ) {
      state.templateList = action.payload.templates
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const {
  setCreateState,
  setDeleteState,
  setListState,
  getListSuccess,
  resetNewsletterList
} = newsletterListSlice.actions

const getNewsletterTemplates = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().newsletterList.listParams, params)
    const { result, ...pagination } = await couponApi.emailTemplates.getEmailTemplates(
      revisedParams
    )
    const templates = result?.map(t => ({ ...t, modifiedAt: moment(t.modifiedAt) }))
    dispatch(
      getListSuccess({
        templates: templates as NewsletterPreview[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const deleteNewsletterTemplate = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setDeleteState(FeatureState.Loading))
    await couponApi.emailTemplates.deleteEmailTemplate({ id })
    dispatch(setDeleteState(FeatureState.Success))
    const newPage = recalculatePaginationAfterDeletion(getState().newsletterList.listParams)
    dispatch(getNewsletterTemplates({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setDeleteState(FeatureState.Error))
  }
}

const createNewsletterTemplate = (name: string): AppThunk => async dispatch => {
  try {
    dispatch(setCreateState(FeatureState.Loading))
    const id = await couponApi.emailTemplates.createEmailTemplate({
      createEmailTemplateDto: {
        name,
        content: `<div style="height: 10%; text-align: center; padding: 1rem">${name}</div>`
      }
    })
    dispatch(setCreateState(FeatureState.Success))
    history.push(`newsletter/${id.id}`)
    return true
  } catch (err) {
    dispatch(setCreateState(FeatureState.Error))
    return false
  }
}

export const newsletterListReducer = newsletterListSlice.reducer

export const newsletterListActions = {
  resetNewsletterList,
  getNewsletterTemplates,
  createNewsletterTemplate,
  deleteNewsletterTemplate
}
