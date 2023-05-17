import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

type globalTypes = {
  logo: string
  brandName: string
  copyRight: string
  themeColor: string
  backgroundColor: string
}

const initialState: globalTypes = {
  logo: '',
  brandName: 'Career Edge',
  copyRight: 'Career Edge',
  themeColor: '#422D87',
  backgroundColor: '#F9F7F4',
}

// 013220

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
})

export const globalDetails = (state: RootState) => state.globals

export default globalSlice.reducer
