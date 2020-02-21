import React, { FC, useEffect, useMemo, useState, useRef } from 'react'
import { SiteEditorForm } from './SiteEditorForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSite,
  resetSiteEditor,
  saveSite,
  listApiKey,
  setAddNewApiKeyPopupVisible,
  createApiKey,
  closeApiKeyPopup
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

export const SiteEditorPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [copyPopoverText, setCopyPopoverText] = useState(t('site.editor.copy-api-key'))
  const siteEditorState = useSelector((state: RootState) => state.siteEditor)
  const inputToCopyRef = useRef(null)

  useEffect(
    () => () => {
      dispatch(resetSiteEditor())
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(listApiKey())
  }, [dispatch])

  useEffect(() => {
    if (id && !isNaN(+id)) {
      dispatch(getSite(+id))
    }
  }, [dispatch, id])

  const onSave = (site: Site): void => {
    dispatch(saveSite({ ...site }, +id!))
  }

  const headerOptions = (): JSX.Element => (
    <Button type="primary" onClick={() => dispatch(setAddNewApiKeyPopupVisible(true))}>
      {t('site.editor.add-new-api-key')}
    </Button>
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
      }
    ],
    [t]
  )

  return (
    <ResponsivePage>
      <SiteEditorForm
        loading={siteEditorState.loadingSave}
        onSave={onSave}
        onExit={() => {
          history.push('/sites/')
        }}
        site={siteEditorState.site}
        id={+id!}
      />

      <ResponsiveCard>
        <ResponsiveTable
          headerTitle={t('site.editor.api-keys-title')}
          headerOptions={headerOptions}
          tableProps={{
            columns: columns,
            dataSource: siteEditorState.siteApiKeys,
            rowKey: (x): string => x.id?.toString() ?? ''
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
    </ResponsivePage>
  )
}
