import { useMemo, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useParams } from 'hooks/react-router-dom-hooks'
import { SystemParam } from 'models/systemParam'
import { systemParamsActions } from './systemParamsSlice'

interface HookProps {
  handleExit: () => void
  afterClose: () => void
}
interface HookUtils {
  loading: boolean
  initialValues: SystemParam | undefined | null
  getSystemParamById: () => void
  afterCloseExtended: () => void
  handleSave: (values: SystemParam) => Promise<void>
}
export const useSystemParamsEditor = (props: HookProps): HookUtils => {
  const { handleExit, afterClose } = props
  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch()
  const { systemParamsList, editorState } = useSelector((state: RootState) => state.systemParams)

  const loading = useMemo(() => editorState === FeatureState.Loading, [editorState])
  const [initialValues, setInitialValues] = useState<SystemParam | undefined | null>(null)

  const getSystemParamById = useCallback(() => {
    const mappedId = id ? +id : null
    const foundParam = systemParamsList.find(p => p.id === mappedId)
    setInitialValues(foundParam)

    console.log(mappedId, systemParamsList, foundParam)
  }, [id, systemParamsList])

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(systemParamsActions.resetSystemParamsEditor())
  }

  const handleSave = async (updatedParam: SystemParam): Promise<void> => {
    dispatch(
      systemParamsActions.updateSystemParam(updatedParam, () => {
        handleExit()
        // dispatch(systemParamsActions.getSystemParams())
      })
    )
  }

  return {
    loading,
    initialValues,
    getSystemParamById,
    handleSave,
    afterCloseExtended
  }
}
