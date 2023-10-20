import { Fragment, useState, memo } from "react";

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

const App = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState(new Set());

  let handleItemClick = (item) => {
    if (selectedItems.has(item)) {
      const updatedSelectedItems = new Set(selectedItems);
      updatedSelectedItems.delete(item);
      setSelectedItems(updatedSelectedItems);
    } else {
      const updatedSelectedItems = new Set(selectedItems);
      updatedSelectedItems.add(item);
      setSelectedItems(updatedSelectedItems);
    }
  };

  return (
    <Fragment>
      <div>
        <span>{Array.from(selectedItems).join(", ")}</span>
      </div>
      <ul className="List">
        {items.map((item) => (
          <MemoizedListItem
            key={item.name}
            item={item}
            isSelected={selectedItems.has(item.name)}
            handleItemClick={handleItemClick}
          />
        ))}
      </ul>
    </Fragment>
  );
};

const ListItem = ({ item, isSelected, handleItemClick }) => (
  <li
    onClick={() => handleItemClick(item.name)}
    className={`List__item List__item--${item.color} ${
      isSelected && "selected"
    }`}
  >
    {item.name}
  </li>
);

const MemoizedListItem = memo(ListItem);

export default App;
