import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { Button } from "reactstrap";

test("renders inventory list", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Inventory List")).toBeInTheDocument();
});


//NAVIGATES TO EDIT LIST
test("navigates to edit inventory list", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // Simulate clicking the "Edit List" link
  fireEvent.click(screen.getByRole("link", { name: "Edit List" }));
  // Wait for the page to load and check if the expected element is present
  await waitFor(() => screen.getByText("Inventory List"));

  expect(screen.getByText("Inventory List")).toBeInTheDocument();
});

/* //ADD ITEM TO LIST
test("adds item to list", async () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );

  // Simulate typing into an input field
  fireEvent.change(screen.getByPlaceholderText("Add"), {
    target: { value: "New Item" },
  });

  // Simulate clicking the "Add" button
  fireEvent.click(screen.getByText("Add"));

  // Assert the new item appears in the list
  await waitFor(() => expect(screen.getByText("New Item")).toBeInTheDocument());
});

//REMOVE ITEM FROM LIST
test("removes items from list", async () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );

  // Add a mock item
  fireEvent.change(screen.getByPlaceholderText("Add item"), {
    target: { value: "Test Item" },
  });
  fireEvent.click(screen.getByText("Add"));

  // Simulate clicking the "Remove" button
  fireEvent.click(screen.getByRole("button", { name: /remove/i }));

  // Verify the item was removed
  await waitFor(() =>
    expect(screen.queryByText("Test Item")).not.toBeInTheDocument()
  );
});

//ADD ITEM TO LIST
test("adds item to list", async () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );

  // Simulate typing into an input field
  // Get the input field by its label text
  const inputElement = screen.getByLabelText("Item Name*");

  // Simulate a change event
  fireEvent.change(inputElement, { target: { value: "New Item" } });

  // Simulate clicking the "Add" button
  fireEvent.click(screen.getByRole

  // Assert the new item appears in the list
  await waitFor(() => expect(screen.getByText("New Item")).toBeInTheDocument());
});

//CLEAR LIST
test("clears list", async () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );

  // Add mock items
  fireEvent.change(screen.getByPlaceholderText("Add item"), {
    target: { value: "Item 1" },
  });
  fireEvent.click(screen.getByText("Add"));

  fireEvent.change(screen.getByPlaceholderText("Add item"), {
    target: { value: "Item 2" },
  });
  fireEvent.click(screen.getByText("Add"));

  // Simulate clicking the "Clear All" button
  fireEvent.click(screen.getByRole("button", { name: /Add/i }));

  // Assert no items are present in the list
  await waitFor(() =>
    expect(screen.queryAllByRole("row")).toHaveLength(1) // Only the header row remains
  );
});


*/