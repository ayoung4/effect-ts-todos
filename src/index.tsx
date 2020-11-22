import * as T from '@effect-ts/core/Effect'
import * as S from '@effect-ts/core/Effect/Stream'
import * as Schedule from '@effect-ts/core/Effect/Schedule'
import { pipe } from '@effect-ts/core/Function'

import {
  AppState,
  AppStore,
  loadState,
  saveState,
  renderApp,
  createStore
} from './app';
import reportWebVitals from './reportWebVitals';

import './index.css';

const saveStatePeriodically = (store: AppStore) =>
  pipe(
    S.fromSchedule(Schedule.fixed(10000)),
    S.mapM(() =>
      pipe(
        store.getState(),
        saveState,
        T.chainError((reason) =>
          T.effectTotal(
            () => {
              console.log(`failed to save state: ${reason}`)
            }
          )
        ),
        T.andThen(
          T.effectTotal(
            () => {
              console.log(`saved state`)
            }
          )
        )
      )
    ),
    S.runDrain
  )

const main = pipe(
  loadState,
  T.tapError((reason) =>
    T.effectTotal(
      () => {
        console.log(`${reason}, couldn't load state`)
      }
    )
  ),
  T.catchAll(() =>
    T.succeed(
      AppState.of.InitState({})
    )
  ),
  T.map(createStore),
  T.chain((store) =>
    T.collectAll([
      renderApp(store),
      saveStatePeriodically(store)
    ])
  )
)

T.runPromise(main).catch(console.warn)

reportWebVitals();
