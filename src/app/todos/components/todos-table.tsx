import React, { FC, useState } from 'react'

import { Todo, TodoStatuses, TodoStatus } from '../model'

type Props = {
  todos: Todo[]
  onBatchDelete: (ids: number[]) => void
  onBatchUpdate: (ids: number[], status: TodoStatus) => void
}

export const TodosTable: FC<Props> = (props) => {

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [selectedStatus, setSelectedStatus] = useState<TodoStatus>(
    TodoStatuses.notStarted
  )

  const deselectAll = () => setSelectedIds([])

  const deselectId = (id: number) => setSelectedIds(
    selectedIds.filter((sId) => sId !== id)
  )

  const selectId = (id: number) => setSelectedIds(
    selectedIds.concat([id])
  )

  return (
    <div className='todo-table'>
      <button
        disabled={selectedIds.length < 1}
        onClick={() => {
          props.onBatchDelete(selectedIds)
          deselectAll()
        }}
      >
        Delete Selected
      </button>
      <button
        disabled={selectedIds.length < 1}
        onClick={() => props.onBatchUpdate(selectedIds, selectedStatus)}
      >
        Set Selected to
      </button>
      <select
        value={selectedStatus}
        disabled={selectedIds.length < 1}
        onChange={(ev) => setSelectedStatus(ev.target.value as TodoStatus)}
      >
        {Object.values(TodoStatuses).map((status, i) => (
          <option
            key={i}
            value={status}
          >
            {status}
          </option>
        ))}
      </select>
      <br />
      <br />
      <table width={100}>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <input
                  type='checkbox'
                  onChange={(ev) => ev.target.checked
                    ? selectId(todo.id)
                    : deselectId(todo.id)
                  }
                />
              </td>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}
