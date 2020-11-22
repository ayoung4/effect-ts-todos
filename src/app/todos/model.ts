import * as M from '@effect-ts/morphic'

const Id_ = M.make((F) =>
  F.interface({
    id: F.number()
  }, { name: 'Id' })
)

export interface Id extends M.AType<typeof Id_> { }
export interface IdRaw extends M.EType<typeof Id_> { }
export const Id = M.opaque<IdRaw, Id>()(Id_)

const Title_ = M.make((F) =>
  F.interface({
    title: F.string(),
  }, { name: 'Title' })
)

export interface Title extends M.AType<typeof Title_> { }
export interface TitleRaw extends M.EType<typeof Title_> { }
export const Title = M.opaque<TitleRaw, Title>()(Title_)

const notStarted = 'not started' as 'not started'
const inProgress = 'in progress' as 'in progress'
const complete = 'complete' as 'complete'

export type TodoStatus =
  typeof notStarted
  | typeof inProgress
  | typeof complete

export const TodoStatuses = {
  notStarted,
  inProgress,
  complete,
}

const Status_ = M.make((F) =>
  F.interface({
    status: F.oneOfLiterals([
      notStarted,
      inProgress,
      complete,
    ])
  }, { name: 'Status' })
)

export interface Status extends M.AType<typeof Status_> { }
export interface StatusRaw extends M.EType<typeof Status_> { }
export const Status = M.opaque<StatusRaw, Status>()(Status_)

const Todo_ = M.make((F) =>
  F.intersection(
    Id(F),
    Status(F),
    Title(F),
  )({ name: 'Todo' })
)

export interface Todo extends M.AType<typeof Todo_> { }
export interface TodoRaw extends M.EType<typeof Todo_> { }
export const Todo = M.opaque<TodoRaw, Todo>()(Todo_)
