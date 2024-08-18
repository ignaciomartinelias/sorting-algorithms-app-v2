import { useStore } from "@/store";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import { cn } from "@/utils/cn";

export const AlgorithmVisualizer = () => {
  const {
    items,
    setItems,
    activeItems,
    doneItems,
    tempItems,
    arrayId,
    displayMode,
  } = useStore();

  return (
    <div className="border border-accent/50 p-10 rounded flex items-center justify-center mt-auto">
      <Reorder.Group
        axis="x"
        values={items}
        onReorder={setItems}
        className={cn(
          "max-w-5xl flex items-end justify-center gap-4 min-h-96",
          {
            "items-center": displayMode === "numbers",
          }
        )}
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
    </div>
  );
};
