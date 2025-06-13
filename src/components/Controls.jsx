import React from "react";

export default function Controls({
  mode,
  setMode,
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={() => setMode("sorting")} disabled={mode === "sorting"}>
        Sorting
      </button>
      <button onClick={() => setMode("searching")} disabled={mode === "searching"}>
        Searching
      </button>
      {mode === "sorting" && (
        <>
          <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
          </select>
          <label style={{ marginLeft: 10 }}>
            Speed:
            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              style={{ marginLeft: 5 }}
            />
          </label>
        </>
      )}
    </div>
  );
}
