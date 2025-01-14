import React, { useRef, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FaUndoAlt } from "react-icons/fa"; // Refresh icon
import { useListContext } from "../context/useListContext";

const Lists = () => {
  const { list, setList } = useListContext(); // Use list and setList from context
  const itemInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const [deletedItemsList, setDeletedItemsList] = useState([]);
  const [viewDeletedItems, setViewDeletedItems] = useState(false);
  

  // Load the list from localStorage on component mount
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("inventoryList")) || [];
    const savedDeletedItems = JSON.parse(localStorage.getItem("deletedItemsList")) || [];
    
    // Check and set the list
    if (savedList.length) {
      setList(savedList);
    }
  
    // Check and set deleted items
    if (savedDeletedItems.length) {
      setDeletedItemsList(savedDeletedItems);
    }
  }, []); // Empty dependency array ensures this only runs once on mount
  
  // Save the list to localStorage whenever it changes
  useEffect(() => {
    if(list.length>0 || deletedItemsList.length>0){
      localStorage.setItem("inventoryList", JSON.stringify(list));
      localStorage.setItem("deletedItemsList", JSON.stringify(deletedItemsList));

    }
  }, [list, deletedItemsList]); // Runs whenever list or deletedItemsList changes

  // Toggle view mode
  const toggleViewMode = () => {
    setViewDeletedItems(!viewDeletedItems);
  };

  // Add new item
  const addItemFunc = (e) => {
    e.preventDefault();
    const newItemName = itemInputRef.current.value.trim();
    const newQuantity = quantityInputRef.current.value.trim();

    if (!newItemName || !newQuantity) {
      alert("Both Item Name and Quantity are required.");
      return;
    }

    const getNewId = () => {
      let counter = localStorage.getItem('idCounter') || 0;
      counter = Number(counter) + 1;
      localStorage.setItem('idCounter', counter);
      return counter;
    };

    const newItem = {
      id: getNewId(),
      name: newItemName,
      quantity: parseInt(newQuantity, 10),
    };

    setList([...list, newItem]); // Update the context's list
    itemInputRef.current.value = "";
    quantityInputRef.current.value = "";
  };

  // Delete item
  const deleteItemFunc = (id) => {
    const item = list.find(item => item.id === id);  // Find the item by id
    setList(list.filter(item => item.id !== id));  // Remove the item from list
    setDeletedItemsList([...deletedItemsList, item]);  // Add to deleted items
  };

  // Restore item
  const restoreItemFunc = (id) => {
    const item = deletedItemsList.find(item => item.id === id);  // Find the item by id
    setDeletedItemsList(deletedItemsList.filter(item => item.id !== id));  // Remove from deleted items
    setList([...list, item]);  // Add back to list
  };

  //clearAll Items
  const clearAllItems = () => {
    const updatedDeletedItemsList = [...deletedItemsList, ...list];
    
    setDeletedItemsList(updatedDeletedItemsList);
    setList([]);  // Clear the list
  
    // Update localStorage in a single update
    localStorage.setItem("inventoryList", JSON.stringify([]));
    localStorage.setItem("deletedItemsList", JSON.stringify(updatedDeletedItemsList));
  };

  // Render items (active or deleted)
  const renderItems = (items) => {
    if (items.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center text-muted">
            {viewDeletedItems ? "No deleted items" : "No items"}
          </td>
        </tr>
      );
    }
  
    return items.map((item) => {
      const isDeleted = deletedItemsList.some((deletedItem) => deletedItem.id === item.id);
      const rowClass = isDeleted ? "view-deleted" : "view-list";
  
      return (
        <tr key={item.id} className={rowClass}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>
            <input
              type="number"
              value={item.quantity}
              disabled
              className="form-control input-quantity"
            />
          </td>
          <td>
            {viewDeletedItems && isDeleted ? (
              <button onClick={() => restoreItemFunc(item.id)}>
                <FaUndoAlt />
              </button>
            ) : (
              <p
                data-testid="remove"
                onClick={() => deleteItemFunc(item.id)}
                style={{ cursor: "pointer" }}
              >
                ❌
              </p>
            )}
          </td>
        </tr>
      );
    });
  };
  

  // Combine the active items with deleted items for "View Deleted" mode and Sort
  const fullList = [...list, ...deletedItemsList].sort((a, b) => a.id - b.id);
  const combinedItems = viewDeletedItems ? fullList : list;


  return (
    <div>
      <h2 className="App-header mb-3">Edit List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          {/* Add Item Form */}
          <form onSubmit={addItemFunc}>
            <div className="d-flex justify-content-between align-items-center mx-3 mt-3 text-start">
              <div>
                <label htmlFor="itemName">Item Name*</label>
                <input
                  ref={itemInputRef}
                  id="itemName"
                  name="itemName"
                  type="text"
                  className="form-control input-itemName"
                />
              </div>
              <div>
                <label htmlFor="quantity" >Quantity*</label>
                <div className="d-flex flex-row">
                  <input
                    ref={quantityInputRef}
                    name="quantity"
                    id="quantity"
                    type="number"
                    className="form-control input-quantity"
                    min="1"
                  />
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Items Table */}
          <CardHeader className="ml-3 mr-3">Inventory List</CardHeader>
          <CardBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderItems(combinedItems, false)}
              </tbody>
            </Table>

            {/* View Toggle */}
            <div className="d-flex align-items-center mt-3">
              <label className="switch">
                <input type="checkbox" onChange={toggleViewMode} />
                <span className="slider round"></span>
              </label>
              <span className="px-2">View Deleted Items</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <NavLink to="/home" className="btn btn-primary">
                Back to Inventory
              </NavLink>
              <button onClick={clearAllItems} className="btn-clearAll">Clear All</button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export { Lists };
