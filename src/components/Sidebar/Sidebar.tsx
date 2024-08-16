import { Separator } from "@radix-ui/react-separator";
import { AlgorithmSelector } from "./AlgorithmSelector";
import { SizeSelector } from "./SizeSelector";
import { DisplayModeSelector } from "./DisplayModeSelector";
import { SpeedSlider } from "./SpeedSlider";
import { Logo } from "../Logo";

export const Sidebar = () => (
  <aside className="border-r w-64 p-6 flex flex-col relative">
    <Logo />
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
