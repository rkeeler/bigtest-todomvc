import { setupAppForTesting } from "@bigtest/react";

// Import your applications root.
// This is typically what you pass to `ReactDOM.render`
import TodoMVC from "../../src/components/TodoMVC";

const TODO_STATE = {
  todos: [
    {
      text: "Install @bigtest/cli globally",
      id: 2,
      completed: false,
      editing: false
    },
    { text: "Install @bigtest/react", id: 3, completed: false, editing: false },
    { text: "Install @bigtest/mocha", id: 4, completed: false, editing: false },
    {
      text: "Install @bigtest/interactor",
      id: 5,
      completed: false,
      editing: false
    },
    {
      text: "Install @bigtest/launcher",
      id: 6,
      completed: false,
      editing: false
    },
    { text: "Run `bigtest init`", id: 7, completed: false, editing: false },
    {
      text: "Import App in bigtest/helpers/setup-app.js",
      id: 8,
      completed: false,
      editing: false
    },
    { text: "Setup bigtest/index.js", id: 9, completed: false, editing: false },
    {
      text: "Point bundler entry to bigtest/index.js",
      id: 10,
      completed: false,
      editing: false
    },
    {
      text: "Tell @bigtest/launcher how to serve your app",
      id: 11,
      completed: false,
      editing: false
    }
  ],
  newTodo: "",
  filter: ""
};

export async function setupApplicationForTesting() {
  await setupAppForTesting(TodoMVC, {
    mountId: "bigtesting-container",
    props: {
      value: TODO_STATE,
      onChange: () => {} // noop
    }
  });
}
