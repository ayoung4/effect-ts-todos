import * as T from '@effect-ts/core/Effect'
import { pipe } from '@effect-ts/core/Function'
import { strictDecoder } from '@effect-ts/morphic/StrictDecoder'
import { report } from '@effect-ts/morphic/Decoder'
import { encoder } from '@effect-ts/morphic/Encoder'

import { AppState } from './store';

class StatePersistenceError extends Error {
  _tag = 'StatePersistenceError'
}

const getItem = (key: string) =>
  T.effectPartial(
    () => new StatePersistenceError('failed to access local storage')
  )(
    () => window.localStorage.getItem(key) || ''
  )

const setItem = (key: string) => (data: string) =>
  T.effectPartial(
    () => new StatePersistenceError('failed to access local storage')
  )(
    () => window.localStorage.setItem(key, data)
  )

const parseJson = (data: string) =>
  T.effectPartial(
    () => new StatePersistenceError(`failed to parse json from ${data}`)
  )(
    () => JSON.parse(data)
  )

const stringifyJson = (data: object) =>
  T.effectPartial(
    () => new StatePersistenceError(`failed to stringify ${data}`)
  )(
    () => JSON.stringify(data)
  )

const decodeState = strictDecoder(AppState).decode
const encodeState = encoder(AppState).encode

export const loadState = pipe(
  getItem('preloadedState'),
  T.chain(parseJson),
  T.chain((data) =>
    pipe(
      data,
      decodeState,
      report,
      T.mapError((reasons) => new StatePersistenceError(reasons.join(',\n')))
    )
  ),
)

export const saveState = (state: AppState) =>
  pipe(
    state,
    encodeState,
    T.chain(stringifyJson),
    T.chain(setItem('preloadedState')),
  )
