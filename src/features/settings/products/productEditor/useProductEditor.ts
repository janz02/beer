import { useMemo, useCallback } from 'react'
import { Product } from 'models/product'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { productEditorActions } from './productEditorSlice'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'

interface UseProductEditorProps {
  params: Pick<GenericModalFormEditorParams, 'id'>
  handleExit: () => void
  afterClose: () => void
}
interface UseProductEditorUtils {
  loading: boolean
  initialValues: Product
  handleGetProduct: () => void
  handleSave: (values: Product) => Promise<void>
  afterCloseExtended: () => void
}
export const useProductEditor = (props: UseProductEditorProps): UseProductEditorUtils => {
  const { params, handleExit, afterClose } = props
  const { id } = params

  const { getProduct, resetProductEditor, saveProduct } = productEditorActions
  const dispatch = useDispatch()

  const { product, editorState } = useSelector((state: RootState) => state.productEditor)
  const initialValues = useMemo((): Product => ({ name: product?.name }), [product])

  const loading = editorState === FeatureState.Loading

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(resetProductEditor())
  }

  const handleSave = async (values: Product): Promise<void> => {
    const newProduct: Product = { id, name: values.name }
    const saved: any = await dispatch(saveProduct(newProduct))
    saved && handleExit()
  }

  const handleGetProduct = useCallback(() => {
    id && dispatch(getProduct({ id }))
  }, [id, dispatch, getProduct])

  return {
    loading,
    initialValues,
    handleGetProduct,
    handleSave,
    afterCloseExtended
  }
}
