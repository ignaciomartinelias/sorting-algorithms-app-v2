import { Sidebar } from "./components/Sidebar";

import { Controls } from "./components/Controls";
import { AlgorithmVisualizer } from "./components/AlgorithmVisualizer";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 p-6 items-center justify-center gap-20">
        <Header />
        <AlgorithmVisualizer />
        <Controls />
      </main>
    </div>
  );
}

export default App;
