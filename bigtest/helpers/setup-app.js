import { setupAppForTesting } from "@bigtest/react";

// Import your applications root.
// This is typically what you pass to `ReactDOM.render`
import TodoMVC from "../../src/components/TodoMVC";

const TODO_STATE = {
  todos: [
    {
      text: "Import app in `bigtest/helpers/setup-app.js`",
      id: 1,
      completed: false,
      editing: false
    },
    {
      text: "Update bundler entry in test mode",
      id: 2,
      completed: true,
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
