# Getting Started with Create React App

## ------------------------------- SCRIPTS ------------------------------------
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
If face issues run below commands
# npm test -- --clearCache
# npm test -- --watchAll

### `npm run build`
Builds the app for production to the `build` folder-bundles React in production mode and optimizes the build for the best performance.

## ---------------------------- CONTEXT -------------------------------------------
### CONTEXT --> useListContext.js
The ListContext provides a centralized state management system for the inventory list using React's Context API. Here's a breakdown of its functionality:

#### Context Creation:
ListContext is created using   `createContext()`, which will hold and provide access to the inventory list across the component tree.

#### ListProvider Component:
The ListProvider component acts as a wrapper around the child components. It initializes the state for the list using the useState hook, and provides the list and setList functions to any components that are wrapped by this provider.
The value prop of the `ListContext.Provider` makes the list and setList accessible to all consuming components.

#### useListContext Hook:
The useListContext hook allows components to access the list and setList values provided by the ListProvider.
It uses `useContext(ListContext)` to consume the context, simplifying access to the shared state of the inventory list in any functional component that needs it.

KEY ASPECTS:
`Global State for List`: Centralizes the list management, allowing any component in the app to access or modify the inventory list without prop-drilling.
`Reusability`: Any component wrapped with ListProvider can consume the context, making it easy to use the list state across the app.
`State Sharing`: Provides both the current list (list) and a function to update it (setList), enabling dynamic updates to the inventory from any component.


## ---------------------------- COMPONENTS ----------------------------------------

### HOME PAGE (Home.js)
Contains the home page/ landing page - where dynamically the list of current items are shown
When click on the `Edit Item Button` - redirects to the Edit page

The Home component renders a table displaying the inventory list from the `useListContext` context. It maps over the list array to display the `item's id, name, and quantity` in the table rows. The component also includes a navigation button that redirects to the `"Edit List" page using NavLink`. This enables users to manage their inventory items by modifying or deleting them on the edit page.

### EDIT LIST (Lists.js)
Edit List Page Shows the complete list of Items 
`Edit List` - At the top of the page - Contains input fields for Item name & Quantity to `ADD` new items to the list
`Remove (Red Cross) Icon` corresponding to each item is shown in the list - When clicked will deleted that item
`Clear All button` - at bottom right - when clicked remove all the items from the list
`View Deleted Items Toggle` - Bottom Left - when clicked - can see the deleted items along with our current items in the item list

The Lists component manages the inventory list by allowing users to add, delete, and restore items. The component leverages the useListContext hook to access and update the inventory list stored in the app’s global state. The main functionality is as follows:

Loading Data from localStorage: On initial load, the component retrieves the inventoryList and deletedItemsList from localStorage and populates the state accordingly, ensuring data persistence between page refreshes.

#### Add Item: 
The component includes a form to add new items to the inventory list. Upon submission, the item is assigned a unique ID (based on a counter stored in localStorage), and the item is added to the global list.

#### Delete Item: 
Each item in the list can be deleted, which moves the item from the active inventory list to the deleted items list. The item is visually marked and stored for potential restoration.

#### Restore Item: 
In the "View Deleted Items" mode, users can restore deleted items back to the active list. The item is moved from the deleted items list back to the inventory list.

#### Clear All Items: 
A button clears all items from the inventory list and adds them to the deleted items list, ensuring that items are preserved and not lost.

#### Persistence: 
Both the inventoryList and deletedItemsList are stored in localStorage whenever they change, ensuring that the data persists across page refreshes. The component also handles rendering the active and deleted items based on the "View Deleted Items" toggle.

## ------------------------------- TESTS (/components/_tests_/Lists.test.js) -------
### 1. Renders Inventory List
TEST NAME: renders inventory list
PURPOSE: Verifies that the "Inventory List" heading is rendered on the page when the app is loaded.
IMPLEMENTATION: The test renders the App component wrapped in a MemoryRouter and checks if the text "Inventory List" is displayed in the document.

### 2. Navigates to Edit List
TEST NAME: navigates to edit inventory list
PURPOSE: Checks if clicking on the "Edit List" link correctly navigates to the edit page and displays an expected element.
IMPLEMENTATION: The test clicks on the "Edit List" link and waits for an element with the text "Add" to be displayed on the next page, confirming the page navigation.

### 3. Adds Item to List
TEST NAME: adds item to list
PURPOSE: Tests the functionality of adding a new item to the inventory list.
IMPLEMENTATION: The test simulates filling out the "Item Name" and "Quantity" fields, clicking the "Add" button, and then confirms the new item appears in the list by checking for the item name in the document.

### 4. Removes Item from List
TEST NAME: removes items from list
PURPOSE: Verifies that an item can be removed from the inventory list by clicking the "❌" remove button.
IMPLEMENTATION: The test adds an item, then finds and clicks the "❌" remove button for the added item. It then confirms that the item is removed by checking that the item name is no longer in the document.

### 5. Clears List
TEST NAME: clears list
PURPOSE: Verifies that all items can be cleared from the list using the "Clear All" button.
IMPLEMENTATION: The test adds two items to the list, then clicks the "Clear All" button and asserts that the list is empty, verifying that only the header and "No items" message row remain.


## ------------------------------- CSS -----------------------------------------------
### CSS (App.css)

#### General Styles:
.App
.App-logo
.App-header
.App-link
table

#### Button & Link Styles:
.btn-primary

#### Switch Styles (for View Deleted Items Toggle)
`.switch`
`.slider`
`.slider:before` 
`input:checked + .slider`: Changes the background color of the slider when the switch is checked.
`input:checked + .slider:before`: Moves the circular button inside the slider when the switch is checked.

#### Additional Styles:
`.cursor-pointer`
`.view-deleted`-Applies a gray color to deleted items, indicating they are no longer active.
`.recover-icon`
`.input-quantity`, `.input-itemName`
`.btn-clearAll`