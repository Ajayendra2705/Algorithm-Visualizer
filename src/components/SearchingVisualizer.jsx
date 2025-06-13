import React, { useState, useRef, useEffect } from "react";
import "./SortingVisualizer.css"; // Reuse bar styles

const COLOR_MAP = {
  0: "#3498db", // default (blue)
  1: "#e74c3c", // current (red)
  2: "#2ecc71", // found (green)
  3: "#95a5a6"  // checked/not found (gray)
};

function getRandomArray(size = 20, min = 10, max = 200) {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export default function SearchingVisualizer({ speed = 300 }) {
  const [array, setArray] = useState(getRandomArray());
  const [colorKey, setColorKey] = useState(Array(array.length).fill(0));
  const [searchValue, setSearchValue] = useState("");
  const [algorithm, setAlgorithm] = useState("linear");
  const [step, setStep] = useState(0);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setColorKey(Array(array.length).fill(0));
    setStep(0);
    setFoundIndex(-1);
    setIsSearching(false);
    clearTimeout(timerRef.current);
  }, [array]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleNewArray = () => {
    setArray(getRandomArray());
  };

  const handleSearch = () => {
    setIsSearching(true);
    setStep(0);
    setFoundIndex(-1);
    if (algorithm === "linear") {
      linearSearch(0);
    } else {
      // For binary search, sort the array first
      const sorted = [...array].sort((a, b) => a - b);
      setArray(sorted);
      setTimeout(() => binarySearch(0, sorted.length - 1, 1, sorted), speed);
    }
  };

  // Linear Search Animation
  const linearSearch = (idx) => {
    if (idx >= array.length) {
      setIsSearching(false);
      return;
    }
    let newColorKey = Array(array.length).fill(0);
    newColorKey[idx] = 1; // current
    setColorKey(newColorKey);
    setStep(idx + 1);
    if (array[idx] === Number(searchValue)) {
      newColorKey[idx] = 2; // found
      setColorKey(newColorKey);
      setFoundIndex(idx);
      setIsSearching(false);
      return;
    }
    newColorKey[idx] = 3; // checked/not found
    setTimeout(() => linearSearch(idx + 1), speed);
  };

  // Binary Search Animation
  const binarySearch = (left, right, steps, arr) => {
    if (left > right) {
      setIsSearching(false);
      return;
    }
    let newColorKey = Array(arr.length).fill(0);
    for (let i = 0; i < left; i++) newColorKey[i] = 3; // checked
    for (let i = right + 1; i < arr.length; i++) newColorKey[i] = 3; // checked
    const mid = Math.floor((left + right) / 2);
    newColorKey[mid] = 1; // current
    setColorKey(newColorKey);
    setStep(steps);
    if (arr[mid] === Number(searchValue)) {
      newColorKey[mid] = 2; // found
      setColorKey(newColorKey);
      setFoundIndex(mid);
      setIsSearching(false);
      return;
    }
    setTimeout(() => {
      if (arr[mid] < Number(searchValue)) {
        binarySearch(mid + 1, right, steps + 1, arr);
      } else {
        binarySearch(left, mid - 1, steps + 1, arr);
      }
    }, speed);
  };

  return (
    <div className="visualizer-panel">
      <h2 style={{ marginBottom: "1rem" }}>Searching Visualizer</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleNewArray} disabled={isSearching}>Generate New Array</button>
        <select value={algorithm} onChange={e => setAlgorithm(e.target.value)} disabled={isSearching}>
          <option value="linear">Linear Search</option>
          <option value="binary">Binary Search</option>
        </select>
        <input
          type="number"
          placeholder="Value to search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          disabled={isSearching}
          style={{ marginLeft: 10, width: 120 }}
        />
        <button onClick={handleSearch} disabled={isSearching || searchValue === ""}>Search</button>
      </div>
      <div style={{ margin: "10px 0" }}>
        <strong>Step:</strong> {step}
        {foundIndex !== -1 && (
          <>
            {" | "}
            <strong>Found at index:</strong> {foundIndex}
          </>
        )}
      </div>
      {/* Color legend */}
      <div style={{ margin: "1rem 0" }}>
        <span style={{ display: "inline-block", width: 16, height: 16, background: "#e74c3c", borderRadius: 4, marginRight: 4 }} /> Current
        <span style={{ display: "inline-block", width: 16, height: 16, background: "#2ecc71", borderRadius: 4, margin: "0 8px 0 16px" }} /> Found
        <span style={{ display: "inline-block", width: 16, height: 16, background: "#95a5a6", borderRadius: 4, margin: "0 8px 0 16px" }} /> Checked
        <span style={{ display: "inline-block", width: 16, height: 16, background: "#3498db", borderRadius: 4, margin: "0 8px 0 16px" }} /> Default
      </div>
      <div className="bar-container" style={{ minHeight: 220 }}>
        {array.map((value, idx) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              className="array-bar"
              style={{
                height: `${value}px`,
                backgroundColor: COLOR_MAP[colorKey[idx] || 0],
              }}
              title={value}
            ></div>
            <span style={{ marginTop: 4, fontSize: 14, color: "#222" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
