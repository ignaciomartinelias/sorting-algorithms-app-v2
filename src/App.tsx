import { Sidebar } from "./components/Sidebar";
import { Animation } from "./components/Animation";
import { Controls } from "./components/Controls";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 p-6 items-center justify-center gap-20">
        <Animation />
        <Controls />
      </main>
    </div>
  );
}

export default App;
