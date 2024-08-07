import { useRef, useState } from "react";

import { Sidebar } from "./components/Sidebar";
import { Animation } from "./components/Animation";
import { Controls } from "./components/Controls";

const generateUniqueRandomNumbers = (
  count: number,
  min: number,
  max: number
): Array<number> => {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    const randomNum = Math.round(Math.random() * (max - min) + min);
    numbers.add(randomNum);
  }
  return Array.from(numbers);
};

function sleep(delay?: number) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay)
  );
}

const MIN = 5;
const MAX = 50;

type Algorithm = "selection" | "bubble" | "quick" | "merge";

const algorithms: Algorithm[] = ["selection", "bubble", "quick", "merge"];

function App() {
  const speedRef = useRef(200);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAlgorithm, setActiveAlgorithm] =
    useState<Algorithm>("selection");
  const [size, setSize] = useState(30);
  const [numbers, setNumbers] = useState(
    generateUniqueRandomNumbers(size, MIN, MAX)
  );
  const [activeNumbers, setActiveNumbers] = useState<number[]>([]);
  const [tempNumbers, setTempNumbers] = useState<number[]>([]);
  const [doneNumbers, setDoneNumbers] = useState<number[]>([]);

  const selectionSort = async () => {
    const result = [...numbers];

    const findMinIndex = async (
      arr: number[],
      start: number
    ): Promise<number> => {
      let minIndex = start;
      for (let i = start + 1; i < arr.length; i++) {
        setActiveNumbers([arr[i], arr[minIndex]]);
        await sleep(speedRef.current);
        if (arr[i] < arr[minIndex]) {
          minIndex = i;
        }
      }
      return minIndex;
    };

    for (let i = 0; i < result.length - 1; i++) {
      const minIndex = await findMinIndex(result, i);
      if (minIndex !== i) {
        [result[i], result[minIndex]] = [result[minIndex], result[i]];
      }
      setNumbers([...result]);
      setDoneNumbers((prev) => [...prev, result[i]]);
    }

    setDoneNumbers((prev) => [...prev, result[result.length - 1]]);
    setActiveNumbers([]);
  };

  const bubbleSort = async () => {
    const result = [...numbers];

    const swap = (arr: number[], i: number, j: number) => {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    const bubble = async (arr: number[]) => {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          setActiveNumbers([arr[j], arr[j + 1]]);
          await sleep(speedRef.current);
          if (arr[j] > arr[j + 1]) {
            swap(arr, j, j + 1);
            setNumbers([...arr]);
          }
        }
        setDoneNumbers((prev) => [...prev, arr[arr.length - 1 - i]]);
      }
    };

    await bubble(result);

    setDoneNumbers([...result]);
    setActiveNumbers([]);
  };

  const quickSort = async (
    arr: number[],
    left = 0,
    right = arr.length - 1
  ): Promise<void> => {
    if (left < right) {
      const partitionIndex = await partition(arr, left, right);
      await quickSort(arr, left, partitionIndex - 1);
      await quickSort(arr, partitionIndex + 1, right);
    } else if (left === right) {
      // Single element partition
      markAsDone(arr[left]);
    }

    // If sorting is complete, mark all elements as done
    if (left === 0 && right === arr.length - 1) {
      setDoneNumbers([...arr]);
      setActiveNumbers([]);
    }
  };

  const partition = async (
    arr: number[],
    left: number,
    right: number
  ): Promise<number> => {
    const pivotValue = arr[right];
    let pivotIndex = left;

    for (let i = left; i < right; i++) {
      setActiveNumbers([arr[i], pivotValue]);
      await sleep(speedRef.current);

      if (arr[i] < pivotValue) {
        swap(arr, i, pivotIndex);
        pivotIndex++;
        setTempNumbers([...arr.slice(left, pivotIndex)]);
        setNumbers([...arr]);
      }
    }

    swap(arr, pivotIndex, right);
    setNumbers([...arr]);
    setTempNumbers([]);
    markAsDone(arr[pivotIndex]);

    return pivotIndex;
  };

  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const markAsDone = (num: number) => {
    setDoneNumbers((prev) => [...prev, num]);
  };

  const handleSizeChange = (value: number) => {
    if (value !== size) {
      setSize(value);
      setNumbers(generateUniqueRandomNumbers(value, MIN, MAX));
    }
  };

  const handleSpeedChange = (value: number[]) => {
    const newSpeed = value[0];
    if (newSpeed !== speedRef.current) {
      speedRef.current = newSpeed; // Ensure speedRef is updated
    }
  };

  const handleResetAnimation = () => {
    setNumbers(generateUniqueRandomNumbers(size, MIN, MAX));
    setActiveNumbers([]);
    setTempNumbers([]);
    setDoneNumbers([]);
  };

  const handlePlayAnimation = async () => {
    setIsPlaying(true);
    if (activeAlgorithm === "selection") {
      await selectionSort();
    } else if (activeAlgorithm === "bubble") {
      await bubbleSort();
    } else if (activeAlgorithm === "quick") {
      await quickSort([...numbers]);
    }
  };

  const handleStopAnimation = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        activeAlgorithm={activeAlgorithm}
        algorithms={algorithms}
        setActiveAlgorithm={setActiveAlgorithm}
        isPlaying={isPlaying}
        handleSizeChange={handleSizeChange}
        handleSpeedChange={handleSpeedChange}
      />
      <main className="flex flex-col flex-1 p-6 items-center justify-center gap-20">
        <Animation
          numbers={numbers}
          setNumbers={setNumbers}
          activeNumbers={activeNumbers}
          tempNumbers={tempNumbers}
          doneNumbers={doneNumbers}
        />
        <Controls
          isPlaying={isPlaying}
          handleResetAnimation={handleResetAnimation}
          handlePlayAnimation={handlePlayAnimation}
          handleStopAnimation={handleStopAnimation}
        />
      </main>
    </div>
  );
}

export default App;
