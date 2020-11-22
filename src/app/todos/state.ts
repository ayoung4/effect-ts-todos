import * as M from '@effect-ts/morphic'

import { Todo } from './model'

const InitState_ = M.make((F) =>
  F.interface({
    name: F.stringLiteral('InitState')
  }, { name: 'InitState' })
)

export interface InitState extends M.AType<typeof InitState_> { }
export interface InitStateRaw extends M.EType<typeof InitState_> { }
export const InitState = M.opaque<InitStateRaw, InitState>()(InitState_)

const TodosState_ = M.make((F) =>
  F.interface({
    name: F.stringLiteral('TodosState'),
    nextId: F.number(),
    byId: F.record(Todo(F)),
    allIds: F.array(F.number()),
  }, { name: 'TodosState' })
)

export interface TodosState extends M.AType<typeof TodosState_> { }
export interface TodosStateRaw extends M.EType<typeof TodosState_> { }
export const TodosState = M.opaque<TodosStateRaw, TodosState>()(TodosState_)

export const State = M.makeADT('name')({
  InitState,
  TodosState,
})

export type State = M.AType<typeof State>
