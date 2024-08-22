import { AlgorithmVisualizer } from "./components/AlgorithmVisualizer";
import { Header } from "./components/Header";
import { Controls } from "./components/Controls";
import { useStore } from "./store";
import { MobileSettings } from "./components/MobileSettings";
import { MobileAlgorithmSelector } from "./components/MobileAlgorithmSelector";
import { useMediaQuery } from "usehooks-ts";
import { useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Separator } from "./components/ui/separator";
import { MobileHeader } from "./components/MobileHeader";

function App() {
  const { setIsMobile, setSize } = useStore();

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsMobile(isMobile);
    if (isMobile) {
      setSize(20);
    }
  }, [isMobile]);

  return (
    <div className="flex h-dvh bg-background text-foreground">
      <Sidebar />
      <main className="lg:container lg:max-w-7xl flex flex-col gap-4 lg:gap-10 p-8 lg:p-10 h-full w-full">
        <MobileHeader />
        <div className="hidden md:flex flex-col gap-10">
          <Header />
          <Separator />
        </div>
        <MobileSettings />
        <AlgorithmVisualizer />
        <MobileAlgorithmSelector />
        <Controls />
      </main>
    </div>
  );
}

export default App;
