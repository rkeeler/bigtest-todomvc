import {
  interactor,
  text,
  clickable,
  property,
  fillable,
  triggerable,
  isPresent
} from "@bigtest/interactor";

@interactor
class TodoItem {
  todoText = text("label");
  toggle = clickable(".toggle");
  delete = clickable(".destroy");
  toggleIsPresent = isPresent(".toggle");
  deleteIsPresent = isPresent(".destroy");
  isCompleted = property(".toggle", "checked");
  doubleClick = triggerable("label", "dblclick");
  fillInput = fillable(".edit");
  blurInput = triggerable(".edit", "blur");

  pressEscape = triggerable(".edit", "keydown", {
    keyCode: 27
  });

  pressEnter = triggerable(".edit", "keydown", {
    keyCode: 13
  });
}

export default TodoItem;
