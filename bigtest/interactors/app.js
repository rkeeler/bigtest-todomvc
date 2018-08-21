import {
  interactor,
  text,
  clickable,
  fillable,
  triggerable,
  collection,
  isPresent
} from "@bigtest/interactor";
import TodoItem from "./todo-item";

@interactor
class TodoMVC {
  titleText = text("h1");
  newTodo = fillable(".new-todo");
  isLoading = isPresent(".loading");
  todoCountText = text(".todo-count");
  activeFilter = text(".filters .selected");
  completeAllTodos = clickable(".toggle-all");
  todoList = collection(".todo-list li", TodoItem);
  clickClearCompleted = clickable(".clear-completed");
  clickAllFilter = clickable(".filters li:first-child button");
  clickActiveFilter = clickable(".filters li:nth-child(2) button");
  clickCompleteFilter = clickable(".filters li:last-child button");

  submitTodo = triggerable(".new-todo", "keydown", {
    keyCode: 13
  });
}

export default TodoMVC;
