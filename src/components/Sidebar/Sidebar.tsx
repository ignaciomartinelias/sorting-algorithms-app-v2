import { motion } from "framer-motion";
import { AlgorithmSelector } from "./AlgorithmSelector";

import { Settings } from "./Settings";

export const Sidebar = () => (
  <motion.aside className="w-96 p-10 flex flex-col justify-between border-accent/50 transition border-r-2 hover:border-accent">
    <div className="flex flex-col h-full gap-20">
      <AlgorithmSelector />
      <Settings />
    </div>
  </motion.aside>
);
