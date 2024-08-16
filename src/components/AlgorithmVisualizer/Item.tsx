import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { Reorder } from "framer-motion";
import { memo } from "react";

type Props = {
  item: number;
  isActive: boolean;
  isDone: boolean;
  isTemp: boolean;
};

export const Item = memo(({ item, isActive, isDone, isTemp }: Props) => {
  const { speedRef, displayMode } = useStore();

  // Normalize speed to a suitable animation duration (e.g., map 20-2000 to 0.05-2 seconds)
  const normalizedSpeed = 0.05 + ((2000 - speedRef.current) / 1980) * 1.95;
  const animationDuration = Math.max(0.05, normalizedSpeed); // Ensure a minimum duration of 0.05

  return (
    <Reorder.Item
      drag={false}
      value={item}
      className={cn("rounded-sm grid place-items-center bg-foreground", {
        "bg-secondary": isActive,
        "bg-primary": isDone,
        "bg-tertiary": isTemp,
      })}
      style={
        displayMode === "bars"
          ? { width: 80, height: item * 4 }
          : {
              width: 40,
              height: 40,
              display: "grid",
              placeItems: "center",
            }
      }
      variants={{
        active: { y: displayMode === "bars" ? -200 : -80 },
        inactive: { y: 0 },
        done: {
          y: 0,
        },
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 150,
        mass: 1,
        bounce: 0.3,
        duration: animationDuration,
      }}
      animate={isDone ? "done" : isActive && !isTemp ? "active" : "inactive"}
    >
      {displayMode === "numbers" && (
        <span
          className={cn("text-xs text-background font-semibold", {
            "text-white": isDone || isActive,
          })}
        >
          {item}
        </span>
      )}
    </Reorder.Item>
  );
});
