import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { Reorder } from "framer-motion";

export const Animation = () => {
  const { items, setItems, activeItems, doneItems, tempItems } = useStore();

  return (
    <Reorder.Group
      axis="x"
      values={items}
      onReorder={setItems}
      className="max-w-4xl flex items-baseline gap-4 min-h-56"
    >
      {items.map((number) => (
        <Reorder.Item
          drag={false}
          key={number}
          value={number}
          className={cn("rounded-sm grid place-items-center  bg-foreground", {
            "bg-secondary": activeItems.includes(number),
            "bg-primary": doneItems.includes(number),
            "bg-tertiary": tempItems.includes(number),
          })}
          style={{ width: 80, height: number * 4 }}
          variants={{
            active: { y: -200 },
            inactive: { y: 0 },
            done: {
              y: 0,
            },
          }}
          animate={
            doneItems.includes(number)
              ? "done"
              : activeItems.includes(number) && !tempItems.includes(number)
              ? "active"
              : "inactive"
          }
        />
      ))}
    </Reorder.Group>
  );
};
