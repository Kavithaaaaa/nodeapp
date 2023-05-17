import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit'
import tenantSlice from './clientSlice'
import menuSlice from './menuSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import globalSlice from './globalSlice'
const rootReducer = combineReducers({
  tenants: tenantSlice
})


export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
export const store = configureStore({
  reducer: {
    tenants: tenantSlice,
    menus: menuSlice,
    globals: globalSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, activeTanents: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
