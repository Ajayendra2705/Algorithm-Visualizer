// src/components/SortingVisualizer.jsx

import React, { useState, useRef } from 'react';
import { bubbleSortSteps, selectionSortSteps, COLOR_MAP } from '../utils/algorithms';

const ALGORITHMS = {
  Bubble: bubbleSortSteps,
  Selection: selectionSortSteps,
};

export default function SortingVisualizer() {
  const [array, setArray] = useState(generateRandomArray(30));
  const [colorKey, setColorKey] = useState(Array(30).fill("default"));
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('Bubble');
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const generatorRef = useRef(null);

  function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  }

  function resetArray() {
    const newArr = generateRandomArray(30);
    setArray(newArr);
    setColorKey(Array(30).fill("default"));
    setComparisons(0);
    setSwaps(0);
    setIsSorting(false);
  }

  function startSorting() {
    const generator = ALGORITHMS[algorithm](array);
    generatorRef.current = generator;
    setIsSorting(true);
    stepThrough(generator);
  }

  function stepThrough(generator) {
    const step = generator.next();
    if (!step.done) {
      const { arr, colorKey, comparisons, swaps } = step.value;
      setArray(arr);
      setColorKey(colorKey);
      setComparisons(comparisons);
      setSwaps(swaps);
      setTimeout(() => stepThrough(generator), 100);
    } else {
      setIsSorting(false);
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1 style={{ marginBottom: 10 }}>Sorting Visualizer</h1>
      <div style={{ marginBottom: 10 }}>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isSorting}>
          {Object.keys(ALGORITHMS).map((alg) => (
            <option key={alg} value={alg}>{alg} Sort</option>
          ))}
        </select>
        <button onClick={resetArray} disabled={isSorting} style={{ marginLeft: 10 }}>Generate New Array</button>
        <button onClick={startSorting} disabled={isSorting} style={{ marginLeft: 10 }}>Start Sorting</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '300px', margin: '0 auto', width: '90%' }}>
        {array.map((value, i) => (
          <div
            key={i}
            style={{
              height: `${value * 2}px`,
              width: '100%',
              backgroundColor: COLOR_MAP[colorKey[i]],
              margin: '0 1px',
              transition: 'height 0.2s ease, background-color 0.2s ease',
              borderRadius: '4px'
            }}
          ></div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <p>Comparisons: {comparisons} | Swaps: {swaps}</p>
      </div>
    </div>
  );
}