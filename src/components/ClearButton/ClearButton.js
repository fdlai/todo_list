import "./ClearButton.css";

function ClearButton({ onButtonClick, filterState, hasCompletedItems }) {
  function getClearButtonClass() {
    if (filterState === "completed" && hasCompletedItems) {
      return "clear-button_visible";
    } else {
      return "";
    }
  }

  return (
    <button
      className={`clear-button ${getClearButtonClass()}`}
      onClick={onButtonClick}
    >
      Clear All
    </button>
  );
}

export default ClearButton;
