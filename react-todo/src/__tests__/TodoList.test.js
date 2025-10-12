import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "./components/TodoList";

describe("TodoList", () => {
  test("renders initial demo todos", () => {
    render(<TodoList />);
    expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
    expect(screen.getByText(/Write Tests/i)).toBeInTheDocument();
    expect(screen.getByText(/Ship Feature/i)).toBeInTheDocument();
  });

  test("adds a new todo via form submit", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a todo/i);
    fireEvent.change(input, { target: { value: "New Item" } });
    fireEvent.submit(input.closest("form"));
    expect(screen.getByText("New Item")).toBeInTheDocument();
  });

  test("toggles a todo between completed and not completed", () => {
    render(<TodoList />);
    const item = screen.getByText("Learn React"); // initially not completed
    fireEvent.click(item);
    expect(item).toHaveStyle("text-decoration: line-through");
    fireEvent.click(item);
    expect(item).toHaveStyle("text-decoration: none");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const target = screen.getByText("Ship Feature");
    const li = target.closest("li");
    const delBtn = li.querySelector("button");
    fireEvent.click(delBtn);
    expect(screen.queryByText("Ship Feature")).not.toBeInTheDocument();
  });
});
