import React, { useCallback, useReducer, useRef } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const reducer = (state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];

      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  };

  const [todos, dispatch] = useReducer(reducer, []);

  const todoRef = useRef<HTMLInputElement>(null);

  const addToTodo = useCallback(() => {
    if (todoRef.current) {
      dispatch({
        type: "ADD",
        text: todoRef.current.value,
      });
      todoRef.current.value = " ";
    }
  }, []);

  return (
    <div className="App">
      <h3>hello react ts</h3>
      <div>
        <input type="text" ref={todoRef} />
        <button onClick={addToTodo} type="submit">
          ADD
        </button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
