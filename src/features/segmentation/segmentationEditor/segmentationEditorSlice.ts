import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'
import { history } from 'router/router'
import i18n from 'app/i18n'
import { message } from 'antd'
import { api } from 'api'
import {
  NKMRTDApplicationModelsSegmentationQueryBuilderField,
  NKMRTDCampaignEditorSegmentationsCommandsCreateSegmentationCreateSegmentationCommand,
  NKMRTDCampaignEditorSegmentationsCommandsUpdateSegmentationUpdateSegmentationCommand
} from 'api/swagger/campaign-editor'
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

interface SegmentationEditorLoadedData {
  segmentation?: CampaignSegmentation
  categories?: SegmentationCategory[]
  segmentationQuery?: SegmentationQuery
  fields?: NKMRTDApplicationModelsSegmentationQueryBuilderField[]
}

interface SegmentationEditorState extends SegmentationEditorLoadedData {
  error: boolean
  loading: boolean
  saving: boolean
  queryBuilder: QueryBuilderState
}

const initialState: SegmentationEditorState = {
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
    getSegmentationSuccess(state, action: PayloadAction<SegmentationEditorLoadedData>) {
      Object.assign(state, action.payload)
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

export const getSegmentation = (id?: number): AppThunk => async dispatch => {
  try {
    dispatch(getSegmentationRequest())

    let segmentation
    let segmentationQuery

    if (id) {
      segmentation = await api.campaignEditor.segmentations.getSegmentation({ id })
      segmentationQuery = await api.campaignEditor.segmentationQueries.getSegmentationQuery({
        segmentationId: id
      })
    }

    const { fields } = await api.campaignEditor.segmentationQueries.getConfigSegmentationQuery()
    const {
      items: categories
    } = await api.campaignEditor.segmentationCategories.getSegmentationCategories({})

    dispatch(
      getSegmentationSuccess({
        segmentation: segmentation as CampaignSegmentation | undefined,
        categories: categories as SegmentationCategory[],
        segmentationQuery: segmentationQuery as SegmentationQuery | undefined,
        fields: fields as NKMRTDApplicationModelsSegmentationQueryBuilderField[]
      })
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
        id: data.id!.toString(),
        nKMRTDCampaignEditorSegmentationsCommandsUpdateSegmentationUpdateSegmentationCommand: {
          ...segmentationQuery,
          ...segmentation,
          ...data,
          queryId: segmentationQuery?.id
        } as NKMRTDCampaignEditorSegmentationsCommandsUpdateSegmentationUpdateSegmentationCommand
      })

      dispatch(getSegmentation(segmentation.id))
    } else {
      await api.campaignEditor.segmentations.createSegmentation({
        nKMRTDCampaignEditorSegmentationsCommandsCreateSegmentationCreateSegmentationCommand: {
          ...segmentationQuery,
          ...segmentation,
          ...data
        } as NKMRTDCampaignEditorSegmentationsCommandsCreateSegmentationCreateSegmentationCommand
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
        nKMRTDCampaignEditorSegmentationQueriesQueriesQuerySegmentationQueriesQuerySegmentationQueriesQuery: query
      })
      dispatch(setRuleResults(result as SegmentationRuleResponse[]))
      callback()
    }
  } catch (err) {}
}
