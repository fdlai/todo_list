import { useEffect, useState } from "react";
import "./Main.css";
import { v4 } from "uuid";
import ClearButton from "../ClearButton/ClearButton";

function Main() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  ); //{id: asdf, text: exercise, checked: false}
  const [values, setValues] = useState({ todo: "" });
  const [filterState, setFilterState] = useState(
    localStorage.getItem("filterState") || "all"
  );

  const hasCompletedItems = items.some((item) => item.checked);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("filterState", filterState);
  }, [filterState]);

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

  function handleDragStart(e, index) {
    e.dataTransfer.setData("text/plain", index);
  }

  function handleDrop(e, newIndex) {
    const oldIndex = e.dataTransfer.getData("text/plain");
    let newItems = [...items];
    const item = newItems.splice(oldIndex, 1)[0];
    newItems.splice(newIndex, 0, item);
    setItems(newItems);
  }

  function handleClearButtonClick() {
    const updatedItems = items.filter((item) => {
      return item.checked === false;
    });
    setItems(updatedItems);
    setFilterState("all");
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
        {items.map((item, index) => {
          if (filterState === "active" && item.checked === true) {
            return null;
          }
          if (filterState === "completed" && item.checked === false) {
            return null;
          }
          return (
            <li
              key={item.id}
              className={`list__item`}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
            >
              <input
                type="checkbox"
                className="list__checkbox"
                onChange={(e) => handleClickCheckbox({ event: e, id: item.id })}
                checked={item.checked}
              />
              <p className={`list__text ${getListItemTextClass(item.checked)}`}>
                {item.text}
              </p>
              <div className="list__line"></div>
              <button
                className="list__delete-button"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <ClearButton
        onButtonClick={handleClearButtonClick}
        filterState={filterState}
        hasCompletedItems={hasCompletedItems}
      />
    </div>
  );
}

export default Main;
