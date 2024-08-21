import { motion } from "framer-motion";
import { AlgorithmSelector } from "./AlgorithmSelector";

import { Settings } from "./Settings";

export const Sidebar = () => (
  <motion.aside className="hidden lg:flex w-[400px] p-8 flex-col justify-between border-accent/50 transition border-r-2 hover:border-accent">
    <div className="flex flex-col h-full gap-16">
      <AlgorithmSelector />
      <Settings />
    </div>
  </motion.aside>
);
