import * as M from '@effect-ts/morphic'

import { Id, Status, Title } from './model'

const AddTodo_ = M.make((F) =>
  F.interface({
    type: F.stringLiteral('AddTodo'),
    payload: Title(F),
  }, { name: 'AddTodo' })
)

export interface AddTodo extends M.AType<typeof AddTodo_> { }
export interface AddTodoRaw extends M.EType<typeof AddTodo_> { }
export const AddTodo = M.opaque<AddTodoRaw, AddTodo>()(AddTodo_)

const SetTodoStatus_ = M.make((F) =>
  F.interface({
    type: F.stringLiteral('SetTodoStatus'),
    payload: F.intersection(
      Id(F),
      Status(F),
    )(),
  }, { name: 'SetTodoStatus' })
);

export interface SetTodoStatus extends M.AType<typeof SetTodoStatus_> { }
export interface SetTodoStatusRaw extends M.EType<typeof SetTodoStatus_> { }
export const SetTodoStatus = M.opaque<SetTodoStatusRaw, SetTodoStatus>()(SetTodoStatus_)

const DeleteTodo_ = M.make((F) =>
  F.interface({
    type: F.stringLiteral('DeleteTodo'),
    payload: Id(F),
  }, { name: 'DeleteTodo' })
);

export interface DeleteTodo extends M.AType<typeof DeleteTodo_> { }
export interface DeleteTodoRaw extends M.EType<typeof DeleteTodo_> { }
export const DeleteTodo = M.opaque<DeleteTodoRaw, DeleteTodo>()(DeleteTodo_)

export const Action = M.makeADT('type')({
  AddTodo,
  SetTodoStatus,
  DeleteTodo,
})

export type Action = M.AType<typeof Action>
