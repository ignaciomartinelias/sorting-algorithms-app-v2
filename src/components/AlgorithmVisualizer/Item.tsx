import { cn } from "@/utils/cn";
import { useStore } from "@/store";
import { motion, Reorder } from "framer-motion";
import { memo } from "react";
import { MAX_ITEM } from "@/utils/generateItems";

type Props = {
  item: number;
  isActive: boolean;
  isDone: boolean;
  isTemp: boolean;
  itemMaxHeight: number;
};

const calculateItemHeight = (item: number, itemMaxHeight: number) => {
  return ((item / MAX_ITEM) * itemMaxHeight) / 2;
};

export const Item = memo(
  ({ item, isActive, isDone, isTemp, itemMaxHeight }: Props) => {
    const { speedRef, displayMode, size } = useStore();

    // Calculate animation duration, normalized between 0.05 and 2 seconds
    const animationDuration = Math.max(
      0.05,
      0.05 + ((2000 - speedRef.current) / 1980) * 1.95
    );

    const itemStyles = {
      height:
        displayMode === "bars"
          ? calculateItemHeight(item, itemMaxHeight)
          : "auto",
    };

    const animationState = isDone ? "done" : isActive ? "active" : "inactive";

    return (
      <Reorder.Item
        drag={false}
        value={item}
        className={cn(
          "rounded-sm md:rounded grid place-items-center bg-foreground origin-center w-full",
          {
            "bg-primary": isDone,
            "bg-tertiary": isTemp,
            "bg-secondary": isActive,
            "aspect-square": displayMode === "numbers",
          }
        )}
        style={itemStyles}
        variants={{
          active: {
            y: displayMode === "bars" ? -itemMaxHeight / 2 : -itemMaxHeight / 8,
          },
          done: { y: 0 },
          inactive: { y: 0 },
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
              "md:text-base": size === 10,
            })}
          >
            {item}
          </motion.span>
        )}
      </Reorder.Item>
    );
  }
);
