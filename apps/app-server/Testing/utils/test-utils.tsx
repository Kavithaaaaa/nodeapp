import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Store, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type {  RootState } from '../../src/redux/store'
// As a basic setup, import your same slice reducers
import userReducer from '../../src/redux/clientSlice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?:  RootState
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState ={},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: {  tenants: userReducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): any {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}