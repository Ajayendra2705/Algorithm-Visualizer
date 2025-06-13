import React, { useState } from "react";
import Controls from "./components/Controls";
import SortingVisualizer from "./components/SortingVisualizer";
import SearchingVisualizer from "./components/SearchingVisualizer";

export default function App() {
  const [mode, setMode] = useState("sorting");
  const [algorithm, setAlgorithm] = useState("bubble");
  const [speed, setSpeed] = useState(300);
  const [arraySize, setArraySize] = useState(30);
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const backgroundColor = darkMode ? "#1e1e2f" : "#f2f4f8";
  const textColor = darkMode ? "#f9f9f9" : "#111827";

  return (
    <div style={{ minHeight: "100vh", background: backgroundColor, color: textColor }}>
      <h1 style={{ textAlign: "center", marginTop: "1.5rem" }}>Algorithm Visualizer</h1>
      <div className="visualizer-panel">
        <Controls
          mode={mode}
          setMode={setMode}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          speed={speed}
          setSpeed={setSpeed}
          arraySize={arraySize}
          setArraySize={setArraySize}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showStats={showStats}
          setShowStats={setShowStats}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
        />
        {mode === "sorting" ? (
          <SortingVisualizer
            algorithm={algorithm}
            speed={speed}
            arraySize={arraySize}
            showStats={showStats}
            autoPlay={autoPlay}
            darkMode={darkMode}
          />
        ) : (
          <SearchingVisualizer speed={speed} arraySize={arraySize} />
        )}
      </div>
    </div>
  );
}
