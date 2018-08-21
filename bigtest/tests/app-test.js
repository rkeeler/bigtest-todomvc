import { expect } from "chai";
import { beforeEach, describe, it } from "@bigtest/mocha";
import { setupApplicationForTesting } from "../helpers/setup-app";
import { when } from "@bigtest/convergence";

import AppInteractor from "../interactors/app.js";

describe("TodoMVC BigTest example", () => {
  let TodoApp = new AppInteractor();

  beforeEach(async () => {
    await setupApplicationForTesting();
    await when(() => !TodoApp.isLoading);
  });

  it("renders the application", () => {
    expect(TodoApp.titleText).to.equal("Todos");
  });

  describe("creating a new todo", () => {
    beforeEach(async () => {
      await TodoApp.newTodo("My Todo").submitTodo();
    });

    it("creates the todo", () => {
      expect(TodoApp.todoList(4).todoText).to.equal("My Todo");
    });
  });

  describe("editing a todo", () => {
    beforeEach(async () => {
      await TodoApp.todoList(0)
        .only()
        .doubleClick()
        .fillInput("Edited Todo")
        .pressEnter();
    });

    it("properly edits the right todo", () => {
      expect(TodoApp.todoList(0).todoText).to.equal("Edited Todo");
    });
  });

  describe("deleting a todo", () => {
    beforeEach(async () => {
      await TodoApp.todoList(0).delete();
    });

    it("properly edits the right todo", () => {
      expect(TodoApp.todoList().length).to.equal(3);
    });
  });

  describe("completing a todo", () => {
    beforeEach(async () => {
      await TodoApp.todoList(1).toggle();
    });

    it("properly completes the right todo", () => {
      expect(TodoApp.todoList(1).isCompleted).to.equal(true);
    });

    describe("filtering the todo list to active", () => {
      beforeEach(async () => {
        await TodoApp.clickActiveFilter();
      });

      it("filters the list down to three todos", () => {
        expect(TodoApp.todoList().length).to.equal(3);
      });

      it("sets the correct filter to active", () => {
        expect(TodoApp.activeFilter).to.equal("Active");
      });

      it("displays the correct number in the footer", () => {
        expect(TodoApp.todoCountText).to.equal("3 items");
      });
    });

    describe("filtering the todo list completed", () => {
      beforeEach(async () => {
        await TodoApp.clickCompleteFilter();
      });

      it("filters the list down to three todos", () => {
        expect(TodoApp.todoList().length).to.equal(1);
      });

      it("sets the correct filter to active", () => {
        expect(TodoApp.activeFilter).to.equal("Completed");
      });

      it("displays the correct number in the footer", () => {
        expect(TodoApp.todoCountText).to.equal("3 items");
      });
    });

    describe("clicking clear completed", () => {
      beforeEach(async () => {
        await TodoApp.clickClearCompleted();
      });

      it("slims the list to three", () => {
        expect(TodoApp.todoList().length).to.equal(3);
      });

      it("it has no completed todos left", () => {
        expect(TodoApp.todoList(0).isCompleted).to.equal(false);
        expect(TodoApp.todoList(1).isCompleted).to.equal(false);
        expect(TodoApp.todoList(2).isCompleted).to.equal(false);
      });
    });
  });
});
