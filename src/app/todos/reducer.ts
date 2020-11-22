import * as A from '@effect-ts/core/Classic/Array'
import * as O from '@effect-ts/core/Classic/Option'
import * as R from '@effect-ts/core/Classic/Record'
import { pipe } from '@effect-ts/core/Function'

import { Action } from './actions'
import { Todo, TodoStatuses, TodoStatus } from './model'
import { State } from './state'

export const initialState = State.of.InitState({})

export const reducer = Action.createReducer(initialState)({
  AddTodo: (a) => State.transform({
    InitState: () => State.of.TodosState({
      nextId: 1,
      byId: {
        [0]: {
          title: a.payload.title,
          id: 0,
          status: TodoStatuses.notStarted
        }
      },
      allIds: [0],
    }),
    TodosState: (s) => State.of.TodosState({
      nextId: s.nextId + 1,
      byId: R.insertAt(
        String(s.nextId),
        {
          title: a.payload.title,
          id: s.nextId,
          status: TodoStatuses.notStarted as TodoStatus
        }
      )(s.byId),
      allIds: A.snoc(s.nextId)(s.allIds)
    }),
  }),
  DeleteTodo: (a) => State.transform({
    TodosState: (s) => State.of.TodosState({
      nextId: s.nextId,
      byId: pipe(
        s.byId,
        R.deleteAt(String(a.payload.id))
      ),
      allIds: pipe(
        s.allIds,
        A.filter((id) => id !== a.payload.id)
      )
    }),
  }),
  SetTodoStatus: (a) => State.transform({
    TodosState: (s) => State.of.TodosState({
      nextId: s.nextId,
      byId: pipe(
        s.byId,
        R.modifyAt(
          String(a.payload.id),
          (todo) => ({
            ...todo,
            status: a.payload.status as TodoStatus
          }),
        ),
        O.getOrElse(() => s.byId),
      ),
      allIds: s.allIds,
    }),
  }),
})
