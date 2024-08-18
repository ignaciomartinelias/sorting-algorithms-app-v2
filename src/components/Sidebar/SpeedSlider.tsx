import { useStore } from "@/store";
import { Slider } from "../ui/slider";

export const SpeedSlider = () => {
  const { speedRef } = useStore();

  const handleSpeedChange = (value: number[]) => {
    speedRef.current = 2000 - value[0];
  };

  return (
    <div className="flex gap-4 text-foreground w-full">
      <h3 className="font-semibold">Speed</h3>
      <Slider
        defaultValue={[1500]}
        min={1000}
        max={2000}
        step={1}
        onValueChange={handleSpeedChange}
      />
    </div>
  );
};
