import React, { FC, useEffect, useMemo, useState, useRef } from 'react'
import { SiteEditorForm } from './SiteEditorForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSite, resetSiteEditor, saveSite, getSiteApiKeys } from './siteEditorSlice'
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

  const [addNewPopupVisible, setAddNewPopupVisible] = useState(false)
  const [copyPopupVisible, setCopyPopupVisible] = useState(false)
  const [copyPopoverText, setCopyPopoverText] = useState(t('site.editor.copy-api-key'))
  const [generatedApiKey, setGeneratedApiKey] = useState('')
  const site = useSelector((state: RootState) => state.siteEditor.site)
  const loading = useSelector((state: RootState) => state.siteEditor.loadingSave)
  const siteApiKeys = useSelector((state: RootState) => state.siteEditor.siteApiKeys)
  const error = useSelector((state: RootState) => state.siteEditor.error)
  const inputToCopyRef = useRef(null)

  useEffect(
    () => () => {
      dispatch(resetSiteEditor())
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(getSiteApiKeys())
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
    <Button type="primary" onClick={() => setAddNewPopupVisible(true)}>
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
        loading={loading}
        onSave={onSave}
        onExit={() => {
          history.push('/sites/')
        }}
        site={site}
        id={+id!}
      />

      <ResponsiveCard>
        <ResponsiveTable
          headerTitle={t('site.editor.api-keys-title')}
          headerOptions={headerOptions}
          tableProps={{
            columns: columns,
            dataSource: siteApiKeys,
            rowKey: (x): string => x.id?.toString() ?? ''
          }}
          error={error}
        />
      </ResponsiveCard>

      <Modal
        title={t('site.editor.add-new-api-key-title')}
        visible={addNewPopupVisible}
        onCancel={() => {
          setAddNewPopupVisible(false)
        }}
        footer={null}
        destroyOnClose
      >
        <ApiKeyEditorForm
          loading={loading}
          onSave={siteApiKey => {
            // TODO: integrate.
            console.log(siteApiKey)
            setAddNewPopupVisible(false)
            setGeneratedApiKey('wfwesvsdggawegwegwq')
            setCopyPopupVisible(true)
          }}
          onCancel={() => {
            setAddNewPopupVisible(false)
          }}
        />
      </Modal>

      <Modal
        title={t('site.editor.copy-api-key-title')}
        visible={copyPopupVisible}
        onCancel={() => {
          setCopyPopupVisible(false)
          setGeneratedApiKey('')
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
    </ResponsivePage>
  )
}
