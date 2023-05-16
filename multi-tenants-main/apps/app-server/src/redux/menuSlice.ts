import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import data from '@/temp-json/menus.json'

type Menu = {
  id: number
  name: string
  url: string
  subMenu?: any
}

interface menuProps {
  menus: Array<Menu>
}

const initialState: menuProps = {
  menus: data.menus,
}

export const menuSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    addMenu: (state, action: PayloadAction<Menu>) => {
      const note = action.payload
      state.menus.push(note)
    },
    removeMenu: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const newMenu = state.menus.filter((menu) => menu.id !== Number(id))
      state.menus = newMenu
    },
  },
})

export const { addMenu, removeMenu } = menuSlice.actions

// selectors
export const selectMenus = (state: RootState) => state.menus

export default menuSlice.reducer
