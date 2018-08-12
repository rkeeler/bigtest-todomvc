import {
  interactor,
  text,
  fillable,
  collection,
  clickable,
  triggerable,
  property,
  count
} from "@bigtest/interactor";

@interactor
class TodoInteractor {
  titleText = text("h1");
  fillTodo = fillable(".new-todo");
  todoCount = count(".todo-list li");
  todoCountText = text(".todo-count");
  activeFilter = text(".filters .selected");
  clickToggleAll = clickable(".toggle-all");
  clickClearCompleted = clickable(".clear-completed");

  submitTodo = triggerable(".new-todo", "keydown", {
    keyCode: 13
  });

  todoList = collection(".todo-list li", {
    toggle: clickable(".toggle"),
    delete: clickable(".destroy"),
    todoText: text("label"),
    isCompleted: property(".toggle", "checked")
  });

  clickFilter(filter) {
    switch (filter) {
      case "All":
        return this.$(`.filters li:first-child button`).click();
      case "Active":
        return this.$(`.filters li:nth-child(2) button`).click();
      case "Complete":
        return this.$(`.filters li:last-child button`).click();
      default:
        return false;
    }
  }
}

export default TodoInteractor;