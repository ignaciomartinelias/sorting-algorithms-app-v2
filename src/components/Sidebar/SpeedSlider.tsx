import { useStore } from "@/store";
import { Slider } from "../ui/slider";

export const SpeedSlider = () => {
  const { speedRef } = useStore();

  const handleSpeedChange = (value: number[]) => {
    speedRef.current = 2010 - value[0];
  };

  return (
    <div className="grid gap-4">
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
