import { Sidebar } from "./components/Sidebar";

import { AlgorithmVisualizer } from "./components/AlgorithmVisualizer";
import { Header } from "./components/Header";
import { Controls } from "./components/Controls";

function App() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex flex-col flex-1 p-10 items-center gap-20">
        <div className="container flex flex-col gap-10 h-full">
          <Header />
          <AlgorithmVisualizer />
          <Controls />
        </div>
      </main>
    </div>
  );
}

export default App;
