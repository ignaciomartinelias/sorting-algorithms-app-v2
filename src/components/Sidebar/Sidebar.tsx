import { Separator } from "@radix-ui/react-separator";
import { AlgorithmSelector } from "./AlgorithmSelector";
import { SizeSelector } from "./SizeSelector";
import { DisplayModeSelector } from "./DisplayModeSelector";
import { SpeedSlider } from "./SpeedSlider";

export const Sidebar = () => (
  <aside className="border-r w-64 p-6 flex flex-col gap-6">
    <div className="grid gap-4">
      <AlgorithmSelector />
      <Separator className="my-2" />
      <SizeSelector />
      <Separator className="my-2" />
      <DisplayModeSelector />
      <Separator className="my-2" />
      <SpeedSlider />
    </div>
  </aside>
);
