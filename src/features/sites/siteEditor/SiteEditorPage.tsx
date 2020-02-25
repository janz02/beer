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
import { ColumnType, TablePaginationConfig } from 'antd/lib/table'
import { MomentDisplay } from 'components/MomentDisplay'
import { ApiKeyEditorForm } from './ApiKeyEditorForm'
import { CopyOutlined } from '@ant-design/icons'
import { basePaginationConfig, projectPage } from 'models/pagination'
import { useIsMobile } from 'hooks'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { GenericPopup } from 'components/popups/GenericPopup'

export const SiteEditorPage: FC = () => {
  const { id } = useParams()
  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [copyPopoverText, setCopyPopoverText] = useState(t('site.editor.copy-api-key'))
  const [apiKeyToDelete, setApiKeyToDelete] = useState<SiteApiKey | null>(null)
  const [apiKeyDeletePopupVisible, setApiKeyDeletePopupVisible] = useState(false)
  const siteEditorState = useSelector((state: RootState) => state.siteEditor)
  const inputToCopyRef = useRef(null)

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

  const headerOptions = (): JSX.Element => (
    <>
      {siteId && (
        <Button type="primary" onClick={() => dispatch(setAddNewApiKeyPopupVisible(true))}>
          {t('site.editor.add-new-api-key')}
        </Button>
      )}
    </>
  )

  const columns: ColumnType<SiteApiKey>[] = useMemo(
    () => [
      {
        title: t('site.editor.api-key-name'),
        dataIndex: 'name',
        key: 'name'
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
    [t]
  )

  const paginationConfig = useMemo((): TablePaginationConfig | false => {
    const baseConfig = basePaginationConfig(
      isMobile,
      !!siteEditorState.error,
      siteEditorState.pagination
    )
    return baseConfig.total
      ? {
          ...baseConfig,
          onShowSizeChange: (current, size) => {
            siteId &&
              dispatch(
                getSiteEditorData(siteId, {
                  page: projectPage(size, siteEditorState.pagination),
                  pageSize: size
                })
              )
          },
          onChange: page => {
            siteId && dispatch(getSiteEditorData(siteId, { page }))
          }
        }
      : false
  }, [dispatch, siteId, isMobile, siteEditorState.error, siteEditorState.pagination])

  return (
    <ResponsivePage>
      <SiteEditorForm
        loading={siteEditorState.loadingSave}
        onSave={onSave}
        onExit={() => {
          history.push('/sites/')
        }}
        site={siteEditorState.site}
        id={siteId}
      />

      <ResponsiveCard>
        <ResponsiveTable
          headerTitle={t('site.editor.api-keys-title')}
          headerOptions={headerOptions}
          tableProps={{
            columns: columns,
            dataSource: siteEditorState.siteApiKeys,
            rowKey: (x): string => x.id?.toString() ?? '',
            pagination: paginationConfig
          }}
          error={siteEditorState.error}
        />
      </ResponsiveCard>

      <Modal
        title={t('site.editor.add-new-api-key-title')}
        visible={siteEditorState.addNewApiKeyPopupVisible}
        onCancel={() => {
          dispatch(setAddNewApiKeyPopupVisible(false))
        }}
        footer={null}
        destroyOnClose
      >
        <ApiKeyEditorForm
          loading={siteEditorState.loadingApiKeyCreate}
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
        visible={siteEditorState.copyApiKeyPopupVisible}
        onCancel={() => {
          dispatch(closeApiKeyPopup())
        }}
        footer={null}
        destroyOnClose
      >
        <Form name="copy-api-key-form" layout="inline">
          <Form.Item>
            <Input defaultValue={siteEditorState.generatedApiKey} readOnly ref={inputToCopyRef} />
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
