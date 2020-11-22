import React, { FC, useState } from 'react'

type Props = {
  onSubmit: (title: string) => void
}

export const AddTodoForm: FC<Props> = (props) => {

  const [title, setTitle] = useState('')

  return (
    <div className='add-todo-form'>
      <input
        type='text'
        name='todo-title'
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <br />
      <br />
      <button
        type='submit'
        disabled={title.length < 1}
        onClick={() => props.onSubmit(title)}
      >
        Add
      </button>
    </div>
  )

}
