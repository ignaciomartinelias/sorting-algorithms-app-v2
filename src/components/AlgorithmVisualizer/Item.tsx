import { cn } from "@/utils/cn";
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

  // Calculate animation duration, normalized between 0.05 and 2 seconds
  const animationDuration = Math.max(
    0.05,
    0.05 + ((2000 - speedRef.current) / 1980) * 1.95
  );

  // Determine styles based on display mode and item state
  const itemStyles = displayMode === "bars" ? { height: item * 4 } : {};

  // Determine animation state based on item state
  const animationState = isDone
    ? "done"
    : isActive && !isTemp
    ? "active"
    : "inactive";

  return (
    <Reorder.Item
      drag={false}
      value={item}
      className={cn("rounded grid place-items-center bg-foreground", {
        "bg-secondary": isActive,
        "bg-primary": isDone,
        "bg-tertiary": isTemp,
        "w-40": displayMode === "bars",
        "w-8 h-8": displayMode === "numbers",
      })}
      style={itemStyles}
      variants={{
        active: { y: displayMode === "bars" ? -200 : -48 },
        inactive: { y: 0 },
        done: { y: 0 },
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 150,
        mass: 1,
        bounce: 0.3,
        duration: animationDuration,
      }}
      animate={animationState}
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
