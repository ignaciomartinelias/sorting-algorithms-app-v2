import { Sidebar } from "./components/Sidebar";

import { Controls } from "./components/Controls";
import { AlgorithmVisualizer } from "./components/AlgorithmVisualizer";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 p-6 items-center justify-center gap-20">
        <AlgorithmVisualizer />
        <Controls />
      </main>
    </div>
  );
}

export default App;
