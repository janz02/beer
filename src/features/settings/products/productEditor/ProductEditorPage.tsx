import React, { useEffect, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { ProductEditorForm } from './ProductEditorForm'
import { history } from 'router/router'
import { getProduct, saveProduct, resetProductEditor, deleteProduct } from './productEditorSlice'
import { useParams } from 'react-router-dom'
import { Product } from 'models/product'
import { Roles } from 'api/swagger/coupon'
import { GenericPopup, PopupState } from 'components/popups/GenericPopup'

import {
  EditorModeOptions,
  EditorModeOptionsProps,
  EditorMode
} from 'components/buttons/EditorModeOptions'

import { SiteFeatureConfig } from 'features/sites/siteList/siteListSlice'
import { SiteList } from 'features/sites/siteList/SiteList'

export const productsEditorRoles = [Roles.Administrator, Roles.CampaignManager]

export const ProductEditorPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { product, loading } = useSelector((state: RootState) => state.productEditor)

  const [mode, setMode] = useState(id ? EditorMode.VIEW : EditorMode.NEW)
  const [productToDelete, setProductToDelete] = useState<PopupState<Product>>()

  useEffect(() => {
    id && dispatch(getProduct(+id))

    return () => {
      dispatch(resetProductEditor())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id) {
      setMode(EditorMode.VIEW)
    }
  }, [id, product])

  const handleSave = (values: Product): void => {
    dispatch(saveProduct(values))
  }

  const optionProps: EditorModeOptionsProps = {
    mode,
    editPermission: productsEditorRoles,
    handleDelete: () => {
      setProductToDelete({
        data: product,
        popupVisible: true
      })
    },
    handleEdit: () => setMode(EditorMode.EDIT),
    handleEscapeEdit: () => setMode(EditorMode.VIEW)
  }

  const options = (
    <>
      <EditorModeOptions {...optionProps} />
    </>
  )

  return (
    <>
      <ProductEditorForm
        options={options}
        mode={mode}
        handleSave={handleSave}
        loading={loading}
        product={{ ...product }}
        title={t('product.editor.title')}
        handleBack={() => history.push('/settings')}
      />
      <GenericPopup
        type="delete"
        id={productToDelete?.data?.id!}
        visible={!!productToDelete?.popupVisible}
        onCancel={() => setProductToDelete({ ...productToDelete, popupVisible: false })}
        onOkAction={deleteProduct?.(productToDelete?.data?.id!)}
        afterClose={() => setProductToDelete(null)}
      >
        <p>{productToDelete?.data?.name}</p>
      </GenericPopup>
    </>
  )
}
