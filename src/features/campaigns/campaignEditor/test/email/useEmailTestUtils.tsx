import { RootState } from 'app/rootReducer'
import { newsletterEditorActions } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import React, { useCallback, useEffect, useMemo } from 'react'
import { Newsletter } from 'models/newsletter'
import { ProfileStatus } from 'api/swagger/admin'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnConfigParams, FilterMode, useTableUtils } from 'hooks/useTableUtils'
import { Profile } from 'models/profile'
import { useTranslation } from 'react-i18next'
import { ProfileStatusDisplay } from 'features/profiles/profileList/ProfileStatusDisplay'
import { Link } from 'react-router-dom'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { getCampaignTesters } from '../../campaignEditorSlice'
import Button from 'antd/lib/button'

interface EmailTestUtils {
  template: Newsletter | undefined
  currentTemplateVersionId: number | undefined
  emailTesterCount: number
  emailTesterTableProps: any
  emailTesterHeaderOptions: JSX.Element
  sendTestHeaderOptions: JSX.Element
}

export const useEmailTestUtils = (): EmailTestUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { campaignTesterListParams, campaignTesters } = useSelector(
    (state: RootState) => state.campaignEditor
  )

  const { template, currentTemplateVersionId } = useSelector(
    (state: RootState) => state.newsletterEditor
  )

  const handleGetTemplate = useCallback(
    (templateId: number | undefined): void => {
      if (templateId && !isNaN(+templateId)) {
        dispatch(newsletterEditorActions.getNewsletterTemplate(+templateId))
      }
    },
    [dispatch]
  )

  const handleUnassignTester = useCallback((profileId: number): void => {
    console.log(`profile with ${profileId}' id has been removed from the campaign as a tester`)
  }, [])

  useEffect(() => {
    handleGetTemplate(template?.id)
  }, [handleGetTemplate, template])

  const emailTesterColumnsParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('profiles.field.status'),
        filterMode: FilterMode.ENUM,
        sort: true,
        key: 'status',
        filters: [
          { value: ProfileStatus.Active, text: t('profiles.status.active') },
          { value: ProfileStatus.InActive, text: t('profiles.status.inactive') },
          { value: ProfileStatus.Declined, text: t('profiles.status.declined') },
          {
            value: ProfileStatus.WaitingForApproval,
            text: t('profiles.status.waiting-for-approval')
          }
        ],
        cannotBeHidden: true,
        ellipsis: false,
        render(status: ProfileStatus) {
          return <ProfileStatusDisplay status={status} />
        }
      },
      {
        title: t('profiles.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH,
        cannotBeHidden: true,
        ellipsis: false,
        disableSearchHighlight: true,
        render: (value: string, profile: Profile): React.ReactNode => {
          return <Link to={`/profiles/${profile.id}`}>{profile.name}</Link>
        }
      },
      {
        title: t('profiles.field.job-role'),
        key: 'jobRoleName',
        sort: true,
        filterMode: FilterMode.SEARCH,
        ellipsis: false,
        cannotBeHidden: true,
        disableSearchHighlight: true,
        render: (value: string, profile: Profile): React.ReactNode => {
          return (
            <Link to={`/organization/job-roles/${profile.jobRoleId}`}>{profile.jobRoleName}</Link>
          )
        }
      }
    ],
    [t]
  )

  const actionColumnParams = useMemo<Partial<ColumnConfigParams> | undefined>(
    () => ({
      fixed: 'right',
      width: '50px',
      render(record: Profile) {
        return <CrudButtons onUnassign={() => handleUnassignTester(record.id)} />
      }
    }),
    [handleUnassignTester]
  )

  const emailTesterTableUtils = useTableUtils<Profile>({
    listParamsState: campaignTesterListParams,
    getDataAction: () => getCampaignTesters,
    columnParams: emailTesterColumnsParams,
    actionColumnParams: actionColumnParams
  })

  const emailTestersColumnsUtils = useColumnOrderUtils(
    emailTesterTableUtils.columnsConfig,
    ColumnStorageName.CAMPAIGN_EMAIL_TESTERS
  )

  const emailTestersSource = useMemo(() => emailTesterTableUtils.addKeyProp(campaignTesters), [
    emailTesterTableUtils,
    campaignTesters
  ])

  const emailTesterTableProps = {
    columns: emailTestersColumnsUtils.currentColumns,
    dataSource: emailTestersSource,
    pagination: emailTesterTableUtils.paginationConfig,
    onChange: emailTesterTableUtils.handleTableChange
  }
  const emailTesterHeaderOptions = useMemo(
    () => (
      <>
        <Button
          type="primary"
          onClick={() => {
            console.log('TODO email tester assign modal open')
          }}
        >
          {t('campaign-create.test.email.set-testers')}
        </Button>
      </>
    ),
    [t]
  )
  const sendTestHeaderOptions = useMemo(
    () => (
      <>
        <Button
          type="primary"
          onClick={() => {
            console.log('TODO trigger send email')
          }}
        >
          {t('campaign-create.test.email.send-email')}
        </Button>
      </>
    ),
    [t]
  )
  return {
    template,
    currentTemplateVersionId,
    emailTesterTableProps,
    emailTesterCount: campaignTesters?.length ?? 0,
    emailTesterHeaderOptions,
    sendTestHeaderOptions
  }
}
