import {
  interactor,
  text,
  clickable,
  property,
  fillable,
  triggerable
} from "@bigtest/interactor";

@interactor
class TodoItem {
  todoText = text("label");
  toggle = clickable(".toggle");
  delete = clickable(".destroy");
  isCompleted = property(".toggle", "checked");
  doubleClick = triggerable("label", "dblclick");
  fillInput = fillable(".edit");
  pressEnter = triggerable(".edit", "keydown", {
    keyCode: 13
  });
}

export default TodoItem;
