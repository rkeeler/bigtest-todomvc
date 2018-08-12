import { expect } from "chai";
import { beforeEach, describe, it } from "@bigtest/mocha";
import { setupApplicationForTesting } from "../helpers/setup-app";

import AppInteractor from "../interactors/app.js";

describe("TodoMVC BigTest example", () => {
  let TodoApp = new AppInteractor();

  beforeEach(async () => {
    await setupApplicationForTesting();
  });

  it("has two initial todos", () => {
    expect(TodoApp.todoCount).to.equal(2);
  });

  it("has the all filter selected first", () => {
    expect(TodoApp.activeFilter).to.equal("All");
  });

  describe("entering a todo", () => {
    beforeEach(async () => {
      await TodoApp.fillTodo("My new todo").submitTodo();
    });

    it("increases the todo list count", () => {
      expect(TodoApp.todoCount).to.equal(3);
    });

    describe("deleting the newly entered todo", () => {
      beforeEach(async () => {
        await TodoApp.todoList(2).delete();
      });

      it("reduces the todo count", () => {
        expect(TodoApp.todoCount).to.equal(2);
      });

      it("deletes the right todo", () => {
        expect(TodoApp.todoList(0).todoText).to.equal(
          "Import app in `bigtest/helpers/setup-app.js`"
        );
        expect(TodoApp.todoList(1).todoText).to.equal(
          "Update bundler entry in test mode"
        );
      });
    });
  });

  describe("completing a todo", () => {
    beforeEach(async () => {
      await TodoApp.todoList(0).toggle();
    });

    it("toggles to completed", () => {
      expect(TodoApp.todoList(0).isCompleted).to.equal(true);
    });
  });

  describe("clicking the completed filter", () => {
    beforeEach(async () => {
      await TodoApp.clickFilter("Complete");
    });

    it("filters to one todo", () => {
      expect(TodoApp.todoCount).to.equal(1);
    });

    it("has the right todo displayed", () => {
      expect(TodoApp.todoList(0).todoText).to.equal(
        "Update bundler entry in test mode"
      );
    });
  });

  describe("clicking the active filter", () => {
    beforeEach(async () => {
      await TodoApp.clickFilter("Active");
    });

    it("filters to one todo", () => {
      expect(TodoApp.todoCount).to.equal(1);
    });

    it("has the right todo displayed", () => {
      expect(TodoApp.todoList(0).todoText).to.equal(
        "Import app in `bigtest/helpers/setup-app.js`"
      );
    });

    describe("clicking the all filter", () => {
      beforeEach(async () => {
        await TodoApp.clickFilter("All");
      });

      it("filters to one todo", () => {
        expect(TodoApp.todoCount).to.equal(2);
      });
    });
  });
});
