import * as T from '@effect-ts/core/Effect'
import { pipe } from '@effect-ts/core/Function'
import React from 'react'
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import {
  Action as TodosAction,
  State as TodosState,
  TodoStatus,
  AddTodoForm,
  TodosTable,
} from './todos'
import { AppState, AppStore } from './store'

const App = () => {

  const state = useSelector((s: AppState) => s)
  const dispatch = useDispatch<Dispatch<TodosAction>>()

  const addTodo = (title: string) =>
    pipe(
      { payload: { title } },
      TodosAction.of.AddTodo,
      dispatch,
    )

  const deleteTodo = (id: number) =>
    pipe(
      { payload: { id } },
      TodosAction.of.DeleteTodo,
      dispatch,
    )

  const updateTodo = (status: TodoStatus) => (id: number) =>
    pipe(
      { payload: { id, status } },
      TodosAction.of.SetTodoStatus,
      dispatch,
    )

  const renderMain = TodosState.matchStrict({
    InitState: () => (
      <main>
        <div>
          <h2>You're in the init state</h2>
          <p>Once you add a todo, you won't be able to return to this state.</p>
        </div>
        <div>
          <h2>Add Your First Todo!</h2>
          <AddTodoForm onSubmit={addTodo} />
        </div>
      </main>
    ),
    TodosState: (s) => (
      <main>
        <div>
          <h2>Todos</h2>
          <TodosTable
            todos={Object.values(s.byId)}
            onBatchDelete={(ids) => ids.forEach(deleteTodo)}
            onBatchUpdate={(ids, status) => ids.forEach(updateTodo(status))}
          />
        </div>
        <div>
          <h2>Add Another Todo</h2>
          <AddTodoForm onSubmit={addTodo} />
        </div>
      </main>
    )
  })

  return (
    <div className='app'>
      <header>
        <h1>Welcome To The Todos App!</h1>
      </header>
      {renderMain(state)}
    </div>
  )

}

export const renderApp = (store: AppStore) =>
  T.effectTotal(
    () => ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    )
  )
