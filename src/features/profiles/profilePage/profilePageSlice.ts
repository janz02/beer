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

interface ProfileLoadedData {
  profile?: Profile
  profilePictureUrl?: any
  companies: Company[]
  groups: Group[]
  jobRoles: JobRole[]
}

interface ProfilePageState extends ProfileLoadedData {
  hasError: boolean
  isLoading: boolean
  isSaving: boolean
  isEditMode: boolean
}

const initialState: ProfilePageState = {
  companies: [],
  groups: [],
  jobRoles: [],
  hasError: false,
  isLoading: true,
  isSaving: false,
  isEditMode: false,
  profilePictureUrl: null
}

const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    resetProfilePage: () => initialState,
    getProfileRequest(state) {
      state.isLoading = true
    },
    getProfileSuccess(state, action: PayloadAction<ProfileLoadedData>) {
      Object.assign(state, action.payload)
      state.hasError = false
    },
    getProfileFail(state) {
      state.hasError = true
      state.isLoading = false
    },
    getProfilePictureSuccess(state, action: PayloadAction<{ profilePictureUrl: any }>) {
      Object.assign(state, action.payload)
      state.isLoading = false
      state.hasError = false
    },
    getProfilePictureFail(state) {
      state.profilePictureUrl = null
      state.isLoading = false
    },
    saveProfileRequest(state) {
      state.isSaving = true
    },
    saveProfileSuccess(state) {
      state.isSaving = false
      state.hasError = false
    },
    saveProfileFail(state) {
      state.isSaving = false
      state.hasError = true
    },
    setEditMode(state, action: PayloadAction<{ isEditMode: boolean }>) {
      state.isEditMode = action.payload.isEditMode
    }
  }
})

const {
  getProfileSuccess,
  getProfileFail,
  getProfileRequest,
  saveProfileSuccess,
  saveProfileFail,
  saveProfileRequest,
  setEditMode,
  getProfilePictureSuccess,
  getProfilePictureFail
} = profilePageSlice.actions

export const { resetProfilePage } = profilePageSlice.actions

export const profilePageReducer = profilePageSlice.reducer

export const getProfilePicture = (id: any): AppThunk => async dispatch => {
  try {
    const profilePictureBlob = id ? await api.files.files.downloadFile({ id }) : null

    dispatch(
      getProfilePictureSuccess({
        profilePictureUrl: profilePictureBlob ? URL.createObjectURL(profilePictureBlob) : null
      })
    )
  } catch {
    dispatch(getProfilePictureFail())
  }
}

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

    dispatch(getProfilePicture(profile.profilePictureId))
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
    const profile = getState().profilePage.profile!
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
    dispatch(getProfile(profile.id))
    dispatch(setEditMode({ isEditMode: false }))
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    console.log(err)
    dispatch(saveProfileFail())
  }
}

export const profilePageActions = {
  reset: resetProfilePage,
  setEditMode: setEditMode
}
