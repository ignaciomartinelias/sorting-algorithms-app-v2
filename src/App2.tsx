import { AlgorithmVisualizer } from "./components/AlgorithmVisualizer2";
import { Header } from "./components/Header2";
import { Controls } from "./components/Controls2";

import { useStore } from "./store";
import { sortingAlgorithms } from "./consts/sortingAlgorithms";
import { Button } from "./components/ui/button";
import { Settings } from "./components/Settings2";
import { Drawer, DrawerContent, DrawerTrigger } from "./components/ui/drawer";
import { AlgorithmSelector } from "./components/AlgorithmSelector2";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "usehooks-ts";
import { useEffect } from "react";

function App() {
  const { activeAlgorithm, isPlaying, setIsMobile, setSize } = useStore();
  const { title, shortDescription } = sortingAlgorithms[activeAlgorithm];
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsMobile(isMobile);
    if (isMobile) {
      setSize(20);
    }
  }, [isMobile]);

  return (
    <main className="flex flex-col gap-4 p-8 h-dvh bg-background text-foreground">
      <div className="flex flex-col gap-2 bg-accent p-4 rounded">
        <h2 className="text-xl font-semibold relative">{title}</h2>
        <p>{shortDescription}</p>

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              className="ml-auto bg-background hover:bg-background/90 hover:text-foreground"
              size="sm"
            >
              Learn more
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-background border-none border-accent/50">
            <Header />
          </DrawerContent>
        </Drawer>
      </div>

      <Settings />
      <AlgorithmVisualizer />
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className="bg-accent border-2 border-accent hover:bg-accent text-base text-foreground hover:text-foreground h-auto px-4 py-2 w-full"
            disabled={isPlaying}
          >
            {title}
            <ChevronDownIcon className="h-6 w-6 ml-auto" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-background border-none border-accent/50">
          <AlgorithmSelector />
        </DrawerContent>
      </Drawer>
      <Controls />
    </main>
  );
}

export default App;
