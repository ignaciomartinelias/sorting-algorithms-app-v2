import { AlgorithmSelector } from "./AlgorithmSelector";

import { Settings } from "./Settings";

export const Sidebar = () => (
  <aside className="hidden lg:flex min-w-[360px] p-8 flex-col justify-between border-accent/50 transition border-r-2 hover:border-accent">
    <div className="flex flex-col h-full gap-8">
      <AlgorithmSelector />
      <Settings />
    </div>
  </aside>
);
