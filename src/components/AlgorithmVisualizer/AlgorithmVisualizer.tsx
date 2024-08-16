import { useStore } from "@/store";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

export const AlgorithmVisualizer = () => {
  const { items, setItems, activeItems, doneItems, tempItems, arrayId } =
    useStore();

  return (
    <Reorder.Group
      axis="x"
      values={items}
      onReorder={setItems}
      className="max-w-5xl flex items-end gap-4 min-h-64"
    >
      {items.map((item) => (
        <Item
          key={`${arrayId}-${item}`}
          item={item}
          isActive={activeItems.includes(item)}
          isDone={doneItems.includes(item)}
          isTemp={tempItems.includes(item)}
        />
      ))}
    </Reorder.Group>
  );
};
