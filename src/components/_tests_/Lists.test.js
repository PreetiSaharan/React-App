import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";


//RENDERS INVENTORY LIST
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

  // Retrieve all "Edit List" links and click the correct one
  const editListLinks = screen.getAllByRole("link", { name: /Edit List/i });
  fireEvent.click(editListLinks[1]); // Click the second link (button in the card)
 
  // Wait for the page to load and check if the expected element is present
  await waitFor(() => screen.getByText("Add"));

  expect(screen.getByText("Add")).toBeInTheDocument();
});

//ADD ITEM TO LIST
test("adds item to list", async () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );

  const itemNameInput = screen.getByLabelText(/Item Name*/i); // Use getByLabelText instead of getByRole
  const quantityInput = screen.getByLabelText(/Quantity*/i );

  fireEvent.change(itemNameInput, { target: { value: "New Item" } });
  fireEvent.change(quantityInput, { target: { value: "10" } });

  const addButton = screen.getByRole("button", { name: /Add/i });
  fireEvent.click(addButton);

  // Verify the new item is added
  await waitFor(() => screen.getByText("New Item"));
});


//REMOVE ITEM FROM LIST
test("removes items from list", async () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );

  // Add a mock item
  const itemNameInput = screen.getByLabelText(/Item Name*/i); // Use getByLabelText instead of getByRole
  const quantityInput = screen.getByLabelText(/Quantity*/i );

  fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
  fireEvent.change(quantityInput, { target: { value: "3" } });

  const addButton = screen.getByRole("button", { name: /Add/i });
  fireEvent.click(addButton);

  // Find all elements with the text "❌" and select the first one
  const removeButtons = screen.getAllByText("❌");

  // Simulate clicking the first "Remove" button (for example, the first item in the list)
  fireEvent.click(removeButtons[1]);

  // Verify the item was removed
  await waitFor(() =>
    expect(screen.queryByText("Test Item")).toBeNull()
  );
});

//CLEAR LIST
test("clears list", async () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );

  // Add mock items
  fireEvent.change(screen.getByLabelText(/Item Name*/i), { target: { value: "Test Item1" } });
  fireEvent.change(screen.getByLabelText(/Quantity*/i ), { target: { value: "3" } });
  fireEvent.click(screen.getByRole("button", { name: /Add/i }));

  fireEvent.change(screen.getByLabelText(/Item Name*/i), { target: { value: "Test Item22" } });
  fireEvent.change(screen.getByLabelText(/Quantity*/i ), { target: { value: "6" } });
  fireEvent.click(screen.getByRole("button", { name: /Add/i }));
  

  // Simulate clicking the "Clear All" button
  fireEvent.click(screen.getByRole("button", { name: /Clear All/i }));

  // Assert no items are present in the list
  await waitFor(() =>
    expect(screen.queryAllByRole("row")).toHaveLength(2) // 2 row remains - 1st- header row & 2nd- No items message showing row
  );
});


