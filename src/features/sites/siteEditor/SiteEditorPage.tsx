import React, { FC, useEffect, useMemo, useState, useRef } from 'react'
import { SiteEditorForm } from './SiteEditorForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSiteEditorData,
  resetSiteEditor,
  saveSite,
  setAddNewApiKeyPopupVisible,
  createApiKey,
  closeApiKeyPopup,
  deleteApiKey
} from './siteEditorSlice'
import { RootState } from 'app/rootReducer'
import { Site } from 'models/site'
import { history } from 'router/router'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { Button, Modal, Form, Input, Popover } from 'antd'
import { useTranslation } from 'react-i18next'
import { SiteApiKey } from 'models/siteApiKey'
import { ColumnType } from 'antd/lib/table'
import { MomentDisplay } from 'components/MomentDisplay'
import { ApiKeyEditorForm } from './ApiKeyEditorForm'
import { CopyOutlined } from '@ant-design/icons'

import { CrudButtons } from 'components/buttons/CrudButtons'
import { GenericPopup } from 'components/popups/GenericPopup'
import { useTableUtils, ListRequestParams } from 'hooks/useTableUtils'

export const SiteEditorPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const inputToCopyRef = useRef(null)
  const {
    pagination,
    loadingSave,
    siteApiKeys,
    site,
    generatedApiKey,
    copyApiKeyPopupVisible,
    loadingApiKeyCreate,
    addNewApiKeyPopupVisible
  } = useSelector((state: RootState) => state.siteEditor)
  const [copyPopoverText, setCopyPopoverText] = useState(t('site.editor.copy-api-key'))
  const [apiKeyToDelete, setApiKeyToDelete] = useState<SiteApiKey | null>(null)
  const [apiKeyDeletePopupVisible, setApiKeyDeletePopupVisible] = useState(false)

  const siteId = id ? +id : undefined

  useEffect(() => {
    dispatch(resetSiteEditor())
  }, [dispatch])

  useEffect(() => {
    siteId && dispatch(getSiteEditorData(siteId))
  }, [dispatch, siteId])

  const onSave = (site: Site): void => {
    dispatch(saveSite({ ...site }, siteId))
  }

  const headerOptions = (
    <>
      {siteId && (
        <Button type="primary" onClick={() => dispatch(setAddNewApiKeyPopupVisible(true))}>
          {t('site.editor.add-new-api-key')}
        </Button>
      )}
    </>
  )

  const { paginationConfig, handleTableChange, sorterConfig } = useTableUtils({
    paginationState: pagination,
    getDataAction: (params: ListRequestParams) => getSiteEditorData(siteId!, params)
  })

  const columns: ColumnType<SiteApiKey>[] = useMemo(
    () => [
      {
        title: t('site.editor.api-key-name'),
        dataIndex: 'name',
        key: 'name',
        ...sorterConfig
      },
      {
        title: t('site.editor.expire-date'),
        dataIndex: 'expireDate',
        key: 'expireDate',
        render(value) {
          return <MomentDisplay date={value} />
        }
      },
      {
        key: 'actions',
        render(siteApiKey: SiteApiKey) {
          return (
            <CrudButtons
              onDelete={() => {
                setApiKeyToDelete(siteApiKey)
                setApiKeyDeletePopupVisible(true)
              }}
            />
          )
        }
      }
    ],
    [sorterConfig, t]
  )

  return (
    <ResponsivePage>
      <SiteEditorForm
        loading={loadingSave}
        onSave={onSave}
        onExit={() => {
          history.push('/sites/')
        }}
        site={site}
        id={siteId}
      />

      <ResponsiveCard
        style={{ height: '70vh' }}
        forTable
        innerTitle={t('site.editor.api-keys-title')}
        innerOptions={headerOptions}
        paddedTop
        paddedBottom
      >
        <ResponsiveTable
          hasHeaderOffset
          {...{
            columns: columns,
            dataSource: siteApiKeys,
            rowKey: (x): string => x.id?.toString() ?? '',
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>

      <Modal
        title={t('site.editor.add-new-api-key-title')}
        visible={addNewApiKeyPopupVisible}
        onCancel={() => {
          dispatch(setAddNewApiKeyPopupVisible(false))
        }}
        footer={null}
        destroyOnClose
      >
        <ApiKeyEditorForm
          loading={loadingApiKeyCreate}
          onSave={name => {
            dispatch(createApiKey(name))
          }}
          onCancel={() => {
            dispatch(setAddNewApiKeyPopupVisible(false))
          }}
        />
      </Modal>

      <Modal
        title={t('site.editor.copy-api-key-title')}
        visible={copyApiKeyPopupVisible}
        onCancel={() => {
          dispatch(closeApiKeyPopup())
        }}
        footer={null}
        destroyOnClose
      >
        <Form name="copy-api-key-form" layout="inline">
          <Form.Item>
            <Input defaultValue={generatedApiKey} readOnly ref={inputToCopyRef} />
          </Form.Item>
          <Form.Item>
            <Popover content={copyPopoverText} trigger="hover">
              <Button
                type="primary"
                onClick={() => {
                  const current = inputToCopyRef?.current as any
                  current.select()
                  document.execCommand('copy')
                  setCopyPopoverText(t('site.editor.copy-api-key-success'))
                }}
              >
                <CopyOutlined />
              </Button>
            </Popover>
          </Form.Item>
        </Form>
      </Modal>

      <GenericPopup
        type="delete"
        id={apiKeyToDelete?.id}
        visible={apiKeyDeletePopupVisible}
        onCancel={() => {
          setApiKeyToDelete(null)
          setApiKeyDeletePopupVisible(false)
        }}
        onOkAction={() => {
          apiKeyToDelete && apiKeyToDelete.id && dispatch(deleteApiKey(apiKeyToDelete.id))
          setApiKeyDeletePopupVisible(false)
        }}
        afterClose={() => {
          setApiKeyToDelete(null)
          setApiKeyDeletePopupVisible(false)
        }}
      >
        <h4>{apiKeyToDelete?.name}</h4>
      </GenericPopup>
    </ResponsivePage>
  )
}
