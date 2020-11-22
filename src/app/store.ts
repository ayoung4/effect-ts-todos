import { configureStore, Store } from '@reduxjs/toolkit'

import { reducer, State as TodoState } from './todos'

export type AppState = TodoState

export const AppState = TodoState

export type AppStore = Store<AppState>

export const createStore = (preloadedState: AppState): AppStore =>
  configureStore({
    reducer,
    preloadedState,
  })
