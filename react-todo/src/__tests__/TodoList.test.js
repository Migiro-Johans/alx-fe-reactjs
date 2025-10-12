import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
    expect(screen.getByText(/Build Todo App/i)).toBeInTheDocument();
    expect(screen.getByText(/Write Tests/i)).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByLabelText("todo-input");
    const form = screen.getByRole("form", { name: /add-todo-form/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.submit(form);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("toggles a todo on click", () => {
    render(<TodoList />);
    const item = screen.getByText("Learn React");
    expect(item.closest("li")).not.toHaveStyle({ textDecoration: "line-through" });

    fireEvent.click(item);
    expect(item.closest("li")).toHaveStyle({ textDecoration: "line-through" });

    fireEvent.click(item);
    expect(item.closest("li")).not.toHaveStyle({ textDecoration: "line-through" });
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const delBtn = screen.getByRole("button", { name: /delete-Build Todo App/i });
    fireEvent.click(delBtn);
    expect(screen.queryByText("Build Todo App")).not.toBeInTheDocument();
  });
});
