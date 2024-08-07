import { cn } from "@/lib/utils";
import { Reorder } from "framer-motion";

type Props = {
  numbers: number[];
  setNumbers: (numbers: number[]) => void;
  activeNumbers: number[];
  tempNumbers: number[];
  doneNumbers: number[];
};

export const Animation = ({
  numbers,
  setNumbers,
  activeNumbers,
  tempNumbers,
  doneNumbers,
}: Props) => {
  return (
    <Reorder.Group
      axis="x"
      values={numbers}
      onReorder={setNumbers}
      className="max-w-4xl flex items-baseline gap-4 min-h-56"
    >
      {numbers.map((number) => (
        <Reorder.Item
          drag={false}
          key={number}
          value={number}
          className={cn("rounded-sm grid place-items-center  bg-foreground", {
            "bg-secondary": activeNumbers.includes(number),
            "bg-primary": doneNumbers.includes(number),
            "bg-tertiary": tempNumbers.includes(number),
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
            doneNumbers.includes(number)
              ? "done"
              : activeNumbers.includes(number) && !tempNumbers.includes(number)
              ? "active"
              : "inactive"
          }
        />
      ))}
    </Reorder.Group>
  );
};
