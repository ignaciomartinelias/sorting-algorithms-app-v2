import { cn } from "@/utils/cn";
import { useStore } from "@/store";
import { motion, Reorder } from "framer-motion";
import { memo } from "react";

type Props = {
  item: number;
  isActive: boolean;
  isDone: boolean;
  isTemp: boolean;
  itemWidth: number;
  itemMaxHeight: number;
};

const calculateItemHeight = (item: number, itemMaxHeight: number) => {
  const maxItemValue = 50;

  return ((item / maxItemValue) * itemMaxHeight) / 2;
};

export const Item = memo(
  ({ item, isActive, isDone, isTemp, itemWidth, itemMaxHeight }: Props) => {
    const { speedRef, displayMode, size } = useStore();

    // Calculate animation duration, normalized between 0.05 and 2 seconds
    const animationDuration = Math.max(
      0.05,
      0.05 + ((2000 - speedRef.current) / 1980) * 1.95
    );

    // Determine styles based on display mode and item state
    const itemStyles = {
      width: itemWidth,
      height:
        displayMode === "bars"
          ? calculateItemHeight(item, itemMaxHeight)
          : itemWidth,
    };

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
        className={cn(
          "rounded grid place-items-center bg-foreground origin-center",
          {
            "bg-secondary": isActive,
            "bg-primary": isDone,
            "bg-tertiary": isTemp,
          }
        )}
        style={itemStyles}
        variants={{
          active: {
            y: displayMode === "bars" ? -itemMaxHeight / 2 : -itemWidth,
          },
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
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("text-xs text-background font-semibold", {
              "text-white": isDone || isActive,
              "text-base": size === 10,
            })}
          >
            {item}
          </motion.span>
        )}
      </Reorder.Item>
    );
  }
);
