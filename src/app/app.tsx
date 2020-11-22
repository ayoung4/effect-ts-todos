import * as T from '@effect-ts/core/Effect'
import { pipe } from '@effect-ts/core/Function'
import React from 'react'
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import {
  TodoStatus,
  AddTodoForm,
  TodosTable,
} from './todos'
import { AppState, AppStore, AppAction } from './store'

const App = () => {

  const state = useSelector((s: AppState) => s)
  const dispatch = useDispatch<Dispatch<AppAction>>()

  const addTodo = (title: string) =>
    pipe(
      { payload: { title } },
      AppAction.of.AddTodo,
      dispatch,
    )

  const deleteTodo = (id: number) =>
    pipe(
      { payload: { id } },
      AppAction.of.DeleteTodo,
      dispatch,
    )

  const updateTodo = (status: TodoStatus) => (id: number) =>
    pipe(
      { payload: { id, status } },
      AppAction.of.SetTodoStatus,
      dispatch,
    )

  const renderMain = AppState.matchStrict({
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
