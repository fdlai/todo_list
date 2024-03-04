import { useEffect, useState } from "react";
import "./Main.css";
import { v4 } from "uuid";

function Main() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  ); //{id: asdf, text: exercise, checked: false}
  const [values, setValues] = useState({ todo: "" });
  const [filterState, setFilterState] = useState(
    localStorage.getItem("filterState") || "all"
  );

  const filteredItems = getFilteredItems();

  useEffect(() => {
    storeItems();
  }, [items]);

  useEffect(() => {
    localStorage.setItem("filterState", filterState);
  }, [filterState]);

  function getFilteredItems() {
    if (filterState === "all") {
      return items;
    } else if (filterState === "active") {
      return items.filter((item) => {
        return item.checked === false;
      });
    } else if (filterState === "completed") {
      return items.filter((item) => {
        return item.checked === true;
      });
    }
  }

  function storeItems() {
    localStorage.setItem("items", JSON.stringify(items));
  }

  function handleAddItemButtonClick(e) {
    e.preventDefault();
    if (!values.todo) {
      return;
    }
    const newItem = { id: v4(), text: values.todo, checked: false };
    setItems((prev) => {
      return [...prev, newItem];
    });
    setValues((prev) => {
      return { ...prev, todo: "" };
    });
  }

  function handleAddItemInputChange(e) {
    setValues((prev) => {
      return { ...prev, todo: e.target.value };
    });
  }

  function handleClickCheckbox({ event, id }) {
    const updatedItems = items.map((item) => {
      if (id === item.id) {
        return { ...item, checked: event.target.checked };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  function deleteItem(id) {
    const updatedItems = items.filter((item) => {
      return id !== item.id;
    });
    setItems(updatedItems);
  }

  function handleFilterChange(e) {
    setFilterState(e.target.value);
  }

  function getListItemTextClass(isCompleted) {
    if (isCompleted) {
      return "list__text_complete";
    } else {
      return "";
    }
  }

  return (
    <div className="todos">
      <div className="todos__header-bar">
        <div className="todos__dropdown-container">
          <h2 className="todos__subtitle">View:</h2>
          <select
            name=""
            id=""
            className="todos__select todos__input"
            onChange={handleFilterChange}
            value={filterState}
          >
            <option value="all" className="todos__option">
              All
            </option>
            <option value="active" className="todos__option">
              Active
            </option>
            <option value="completed" className="todos__option">
              Completed
            </option>
          </select>
        </div>
        <div className="todos__add-items-container">
          <h2 className="todos__subtitle">Add Items:</h2>
          <form className="todos__inputAndButtonContainer">
            <input
              type="text"
              className="todos__input"
              onChange={handleAddItemInputChange}
              value={values.todo}
            />
            <button
              type="submit"
              className="todos__add-item-button"
              onClick={handleAddItemButtonClick}
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
      <ul className="list">
        {filteredItems.map((item) => {
          return (
            <li key={item.id} className="list__item">
              <input
                type="checkbox"
                className="list__checkbox"
                onChange={(e) => handleClickCheckbox({ event: e, id: item.id })}
                checked={item.checked}
              />
              <p className={`list__text ${getListItemTextClass(item.checked)}`}>
                {item.text}
              </p>
              <button
                className="list__delete-button"
                onClick={() => deleteItem(item.id)}
              >
                -Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Main;
