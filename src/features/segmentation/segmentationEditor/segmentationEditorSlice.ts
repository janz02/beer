import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'
import { history } from 'router/router'
import i18n from 'app/i18n'
import { message } from 'antd'
import { api } from 'api'
import { QueryBuilderField, SegmentationVm } from 'api/swagger/campaign-editor'
import { SegmentationCategory } from 'models/campaign/segmentationCategory'
import { SegmentationQuery } from 'models/campaign/segmentationQuery'
import { ImmutableTree, JsonGroup, Utils } from 'react-awesome-query-builder'
import {
  QueryBuilderRuleModel,
  SegmentationRuleResponse
} from './queryBuilder/useQueryBuilderUtils'
import { SegmentationRuleResult } from 'models/campaign/segmentationRuleResult'

const { loadTree, uuid } = Utils

export const GROUP = 'group'
const emptyInitValue = { id: uuid(), type: GROUP }

interface QueryBuilderState {
  query: object | undefined
  tree: ImmutableTree
  rules: QueryBuilderRuleModel[]
  actions: { [key: string]: Function }
  initialConditions: QueryBuilderRuleModel[]
  ruleResults: SegmentationRuleResult[]
}
interface SegmentationEditorState {
  segmentation: CampaignSegmentation
  categories?: SegmentationCategory[]
  segmentationQuery?: SegmentationQuery
  fields?: QueryBuilderField[]
  error: boolean
  loading: boolean
  saving: boolean
  queryBuilder: QueryBuilderState
}

const initialState: SegmentationEditorState = {
  segmentation: {},
  error: false,
  loading: false,
  saving: false,
  queryBuilder: {
    actions: {},
    rules: [],
    initialConditions: [],
    ruleResults: [],
    tree: loadTree(emptyInitValue as JsonGroup),
    query: undefined
  }
}

const segmentationEditorSlice = createSlice({
  name: 'segmentationEditor',
  initialState,
  reducers: {
    resetSegmentationEditor: () => initialState,
    getSegmentationRequest(state) {
      state.loading = true
    },
    getSegmentationSuccess(
      state,
      action: PayloadAction<
        [CampaignSegmentation, SegmentationCategory[], SegmentationQuery, QueryBuilderField[]]
      >
    ) {
      state.segmentation = action.payload[0]
      state.categories = action.payload[1]
      state.segmentationQuery = action.payload[2]
      state.fields = action.payload[3]
      state.loading = false
      state.error = false
    },
    getSegmentationFail(state) {
      state.error = true
    },
    saveSegmentationRequest(state) {
      state.saving = true
    },
    saveSegmentationSuccess(state) {
      state.saving = false
      state.error = false
    },
    saveSegmentationFail(state) {
      state.saving = false
      state.error = true
    },
    setTree(state, action: PayloadAction<ImmutableTree>) {
      state.queryBuilder.tree = action.payload
    },
    setRules(state, action: PayloadAction<QueryBuilderRuleModel[]>) {
      state.queryBuilder.rules = action.payload
    },
    setQuery(state, action: PayloadAction<object[]>) {
      state.queryBuilder.query = action.payload
    },
    setActions(state, action: PayloadAction<{ [key: string]: Function }>) {
      state.queryBuilder.actions = action.payload
    },
    setRuleResults(state, action: PayloadAction<SegmentationRuleResult[]>) {
      state.queryBuilder.ruleResults = action.payload
    },
    setInitialConditions(state, action: PayloadAction<QueryBuilderRuleModel[]>) {
      state.queryBuilder.initialConditions = action.payload
    }
  }
})

const {
  getSegmentationSuccess,
  getSegmentationFail,
  getSegmentationRequest,
  saveSegmentationSuccess,
  saveSegmentationFail,
  saveSegmentationRequest
} = segmentationEditorSlice.actions

export const {
  resetSegmentationEditor,
  setTree,
  setRules,
  setQuery,
  setActions,
  setInitialConditions,
  setRuleResults
} = segmentationEditorSlice.actions

export const segmentationEditorReducer = segmentationEditorSlice.reducer

export const getSegmentation = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getSegmentationRequest())
    const segmentation = await api.campaignEditor.segmentations.getSegmentation({ id })
    const segmentationQuery = await api.campaignEditor.segmentationQueries.getSegmentationQuery({
      segmentationId: id
    })
    const { fields } = await api.campaignEditor.segmentationQueries.getConfig()

    const {
      items: categories
    } = await api.campaignEditor.segmentationCategories.getSegmentationCategories({})

    dispatch(
      getSegmentationSuccess([
        segmentation as CampaignSegmentation,
        categories as SegmentationCategory[],
        segmentationQuery as SegmentationQuery,
        fields as QueryBuilderField[]
      ])
    )
  } catch (err) {
    dispatch(getSegmentationFail())
  }
}

export const saveSegmentation = (data: CampaignSegmentation): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const { segmentation, segmentationQuery } = getState().segmentationEditor
    dispatch(saveSegmentationRequest())

    if (segmentation?.id) {
      await api.campaignEditor.segmentations.updateSegmentation({
        createUpdateSegmentationCommand: {
          ...segmentationQuery,
          ...segmentation,
          ...data,
          queryId: segmentationQuery?.id
        } as SegmentationVm
      })

      dispatch(getSegmentation(segmentation.id))
    } else {
      await api.campaignEditor.segmentations.createSegmentation({
        createUpdateSegmentationCommand: {
          ...segmentationQuery,
          ...segmentation,
          ...data
        } as SegmentationVm
      })

      history.push(`/segmentations`)
    }
    dispatch(saveSegmentationSuccess())
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    console.log(err)
    dispatch(saveSegmentationFail())
  }
}

export const refreshQueryResults = (callback: any): AppThunk => async (dispatch, getState) => {
  try {
    const { queryBuilder } = getState().segmentationEditor
    const { query } = queryBuilder

    if (query) {
      const result = await api.campaignEditor.segmentationQueries.querySegmentationQueries({
        queryBuilderQuery: query
      })
      dispatch(setRuleResults(result as SegmentationRuleResponse[]))
      callback()
    }
  } catch (err) {}
}
