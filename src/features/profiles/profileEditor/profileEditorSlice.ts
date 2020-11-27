import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import i18n from 'app/i18n'
import { message } from 'antd'
import { api } from 'api'
import { Profile } from 'models/profile'
import { Company } from 'models/company'
import { Group } from 'models/group'
import { JobRole } from 'models/jobRole'
import moment from 'moment'
import { FrontendFileValue } from 'components/upload/fileUploadHelper'

interface ProfileEditorLoadedData {
  profile?: Profile
  companies: Company[]
  groups: Group[]
  jobRoles: JobRole[]
}

interface ProfileEditorState extends ProfileEditorLoadedData {
  error: boolean
  loading: boolean
  saving: boolean
}

const initialState: ProfileEditorState = {
  companies: [],
  groups: [],
  jobRoles: [],
  error: false,
  loading: false,
  saving: false
}

const profileEditorSlice = createSlice({
  name: 'profileEditor',
  initialState,
  reducers: {
    resetProfileEditor: () => initialState,
    getProfileRequest(state) {
      state.loading = true
    },
    getProfileSuccess(state, action: PayloadAction<ProfileEditorLoadedData>) {
      Object.assign(state, action.payload)
      state.loading = false
      state.error = false
    },
    getProfileFail(state) {
      state.error = true
    },
    saveProfileRequest(state) {
      state.saving = true
    },
    saveProfileSuccess(state) {
      state.saving = false
      state.error = false
    },
    saveProfileFail(state) {
      state.saving = false
      state.error = true
    }
  }
})

const {
  getProfileSuccess,
  getProfileFail,
  getProfileRequest,
  saveProfileSuccess,
  saveProfileFail,
  saveProfileRequest
} = profileEditorSlice.actions

export const { resetProfileEditor } = profileEditorSlice.actions

export const profileEditorReducer = profileEditorSlice.reducer

export const getProfile = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getProfileRequest())

    const [profile, companies, groups, jobRoles] = await Promise.all([
      api.admin.profiles.getProfile({ id }),
      api.admin.companies.getCompanies({ pageSize: -1 }),
      api.admin.groups.getOrganizationGroups({ pageSize: -1 }),
      api.admin.jobRoles.getJobRoles({ pageSize: -1 })
    ])

    dispatch(
      getProfileSuccess({
        profile: {
          ...profile,
          birthDay: moment(profile.birthDay),
          createdDate: moment(profile.createdDate)
        } as Profile,
        companies: (companies.result?.map(x => ({ ...x, createdDate: moment(x.createdDate) })) ||
          []) as Company[],
        groups: (groups.result?.map(x => ({ ...x, createdDate: moment(x.createdDate) })) ||
          []) as Group[],
        jobRoles: (jobRoles.result?.map(x => ({ ...x, createdDate: moment(x.createdDate) })) ||
          []) as JobRole[]
      })
    )
  } catch (err) {
    dispatch(getProfileFail())
  }
}

export interface ProfileForm {
  name: string
  email: string
  birthDay: moment.Moment
  companyId: number
  groupIds: number[]
  jobRoleId: number
  phoneNumberWithoutCountry: string
  profilePictureDetails?: FrontendFileValue
}

export const saveProfile = (data: ProfileForm): AppThunk => async (dispatch, getState) => {
  try {
    const profile = getState().profileEditor.profile!
    dispatch(saveProfileRequest())

    await api.admin.profiles.updateProfile({
      id: profile.id,
      profileDto: {
        ...profile,
        name: data.name,
        email: data.email,
        birthDay: data.birthDay.utc(true).toDate(),
        companyId: data.companyId,
        groups: data.groupIds,
        jobRoleId: data.jobRoleId,
        phoneNumber: data.phoneNumberWithoutCountry
          ? '+36' + data.phoneNumberWithoutCountry
          : undefined,
        profilePictureId: data.profilePictureDetails?.id
      }
    })

    dispatch(saveProfileSuccess())
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    console.log(err)
    dispatch(saveProfileFail())
  }
}

export const profileEditorActions = {
  reset: resetProfileEditor
}
