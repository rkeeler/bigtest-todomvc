import classnames from "classnames";
import { map, create, Store } from "microstates";
import React, { PureComponent } from "react";

import TodoMVC from "../models/TodoMVC";
import TodoTextInput from "./TodoTextInput";

const pluralize = (word, count) => (count === 1 ? word : `${word}s`);

export default class TodoMVC_Component extends PureComponent {
  onUpdate = store => {
    this.setState({ store });
    this.props.onChange(store.state);
  };

  state = {
    store: Store(create(TodoMVC, this.props.value), this.onUpdate)
  };

  handleInsertNewTodo = (...args) => this.state.store.insertNewTodo(...args);

  handleInputChange = (...args) => this.state.store.newTodo.set(...args);

  render() {
    let { store } = this.state;

    return (
      <div className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <TodoTextInput
            text={store.newTodo.state}
            classes="new-todo"
            onSave={this.handleInsertNewTodo}
            onBlur={this.handleInsertNewTodo}
            onInputChange={this.handleInputChange}
            placeholder="What needs to be done?"
          />
        </header>
        <section className="main">
          {store.hasTodos && (
            <span>
              <input
                className="toggle-all"
                type="checkbox"
                checked={store.isAllComplete}
              />
              <label onClick={store.toggleAll} />
            </span>
          )}
          <ul className="todo-list">
            {map(store.filtered, todo => (
              <li
                className={classnames({
                  completed: todo.completed.state,
                  editing: todo.editing.state
                })}
                key={todo.id.state}
              >
                {todo.editing.state ? (
                  <TodoTextInput
                    text={todo.text.state}
                    classes="edit"
                    onSave={todo.stopEditing}
                    onBlur={todo.stopEditing}
                    onInputChange={todo.text.set}
                  />
                ) : (
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.completed.state}
                      onChange={todo.completed.toggle}
                    />
                    <label onDoubleClick={todo.startEditing}>
                      {todo.text.state}
                    </label>
                    <button
                      className="destroy"
                      onClick={() =>
                        store.todos.filter(item => todo.state !== item.state)
                      }
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
          {store.hasTodos && (
            <footer className="footer">
              <span className="todo-count">
                <strong>{store.active.length || "No"}</strong>{" "}
                {pluralize("item", store.active.length)}
              </span>
              <ul className="filters">
                {store.filters.map(filter => (
                  <li key={filter.key}>
                    <button
                      className={classnames({ selected: filter.selected })}
                      style={{ cursor: "pointer" }}
                      onClick={filter.select}
                    >
                      {filter.label}
                    </button>
                  </li>
                ))}
              </ul>
              {store.hasCompleted && (
                <button
                  className="clear-completed"
                  onClick={store.clearCompleted}
                >
                  Clear completed
                </button>
              )}
            </footer>
          )}
        </section>
      </div>
    );
  }
}
