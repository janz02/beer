import { useMemo, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useParams } from 'hooks/react-router-dom-hooks'
import { SystemParam } from 'models/systemParam'
import { systemParamsActions } from '../systemParamsSlice'

interface SystemParamsEditorUtilsProps {
  handleExit: () => void
  afterClose: () => void
}
interface SystemParamsEditorUtils {
  loading: boolean
  initialValues: SystemParam | undefined | null
  getSystemParam: () => void
  afterCloseExtended: () => void
  handleSave: (values: SystemParam) => Promise<void>
}
export const useSystemParamsEditorUtils = (
  props: SystemParamsEditorUtilsProps
): SystemParamsEditorUtils => {
  const { handleExit, afterClose } = props
  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch()
  const { systemParamsList, editorState } = useSelector((state: RootState) => state.systemParams)

  const loading = useMemo(() => editorState === FeatureState.Loading, [editorState])
  const [initialValues, setInitialValues] = useState<SystemParam | undefined | null>(null)

  const getSystemParam = useCallback(() => {
    const mappedId = id ? +id : null
    const foundParam = systemParamsList.find(p => p.id === mappedId)
    setInitialValues(foundParam)
  }, [id, systemParamsList])

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(systemParamsActions.resetSystemParamsEditor())
  }

  const handleSave = async (updatedParam: SystemParam): Promise<void> => {
    console.log(updatedParam)
    dispatch(
      systemParamsActions.updateSystemParam(updatedParam, () => {
        handleExit()
      })
    )
  }

  return {
    loading,
    initialValues,
    getSystemParam,
    handleSave,
    afterCloseExtended
  }
}
