import { useStore } from "@/store";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

export const AlgorithmVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemMaxHeight, setItemMaxHeight] = useState(0);

  const {
    items,
    setItems,
    activeItems,
    doneItems,
    tempItems,
    arrayId,
    displayMode,
    size,
  } = useStore();

  useEffect(() => {
    if (containerRef.current) {
      const clientHeight = containerRef.current.getBoundingClientRect().height;
      const gap = clientHeight > 300 ? 16 : 4;
      const itemWidth =
        (containerRef.current.getBoundingClientRect().width -
          gap * (size - 1)) /
        size;

      console.log({ clientHeight, gap, itemWidth });
      setItemWidth(itemWidth);
      setItemMaxHeight(containerRef.current.getBoundingClientRect().height);
    }
  }, [size]);

  return (
    <div className="border border-accent/50 p-4 rounded flex items-center justify-center mt-auto overflow-hidden">
      <Reorder.Group
        ref={containerRef}
        axis="x"
        values={items}
        onReorder={setItems}
        className={cn(
          "w-full flex items-end justify-center md:gap-4 h-60 md:h-96 gap-1",
          {
            "items-center": displayMode === "numbers",
          }
        )}
      >
        {items.map((item) => (
          <Item
            itemWidth={itemWidth}
            itemMaxHeight={itemMaxHeight}
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
