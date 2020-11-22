import { configureStore, Store } from '@reduxjs/toolkit'

import {
  Action as TodoAction,
  State as TodoState,
  reducer,
} from './todos'

export type AppAction = TodoAction

export const AppAction = TodoAction

export type AppState = TodoState

export const AppState = TodoState

export type AppStore = Store<AppState>

export const createStore = (preloadedState: AppState): AppStore =>
  configureStore({
    reducer,
    preloadedState,
  })
