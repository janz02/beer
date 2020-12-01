import { RootState } from 'app/rootReducer'
import { useSelector } from 'hooks/react-redux-hooks'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useFormUtils } from 'hooks/useFormUtils'
import { FeatureState } from 'models/featureState'
import { Group } from 'models/group'
import { groupEditorActions } from './groupEditorSlice'

export interface GroupEditorUtils {
  loading: boolean
  id?: number
  groupIsNew: boolean
  editing?: boolean
  group?: Group
  loadGroup: () => void
}

export const useGroupEditorUtils = (): GroupEditorUtils => {
  const { id } = useParams()
  const { group, editing, featureState } = useSelector((state: RootState) => state.groupEditor)
  const { getGroup } = groupEditorActions

  const loading = featureState === FeatureState.Loading
  const groupIsNew = !id

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue
  } = useFormUtils<Group>()

  const loadGroup = (): void => {
    getGroup(id)
  }

  return { group, loading, groupIsNew, editing, loadGroup }
}
