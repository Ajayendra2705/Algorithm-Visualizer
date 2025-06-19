import React, { useState, useEffect, useRef } from 'react';
import { bubbleSort } from '../algorithms/sorting/bubbleSort';
import { selectionSort } from '../algorithms/sorting/selectionSort';
import { insertionSort } from '../algorithms/sorting/insertionSort';
import { mergeSort } from '../algorithms/sorting/mergeSort';
import { quickSort } from '../algorithms/sorting/quickSort';

const SortingPage = () => {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(200);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const speedRef = useRef(speed);
  const audioRef = useRef(audioEnabled);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    audioRef.current = audioEnabled;
  }, [audioEnabled]);

  const generateArray = () => {
    const newArray = Array.from({ length: 30 }, () => ({
      value: Math.floor(Math.random() * 300) + 20,
      color: 'steelblue',
    }));
    setArray(newArray);
  };

  const playTone = (value) => {
    if (!audioRef.current) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(100 + value, ctx.currentTime);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    generateArray();
  }, []);

  return (
    <div className="sorting-page">
      <div className="controls">
        <div className="row">
          <button onClick={generateArray}>🔄 Generate Array</button>
          <button onClick={() => bubbleSort(array, setArray, speedRef, playTone)}>🫧 Bubble Sort</button>
          <button onClick={() => selectionSort(array, setArray, speedRef, playTone)}>📌 Selection Sort</button>
          <button onClick={() => insertionSort(array, setArray, speedRef, playTone)}>📥 Insertion Sort</button>
          <button onClick={() => mergeSort(array, setArray, speedRef, playTone)}>🔀 Merge Sort</button>
          <button onClick={() => quickSort(array, setArray, speedRef, playTone)}>⚡ Quick Sort</button>
        </div>

        <div className="row slider-row">
          <label>Speed:</label>
          <span>🐢 Slow</span>
          <input
            type="range"
            min="1"
            max="2000"
            value={2001 - speed}
            onChange={(e) => setSpeed(2001 - Number(e.target.value))}
          />
          <span>⚡ Fast</span>

          <label>
            <input
              type="checkbox"
              checked={audioEnabled}
              onChange={() => setAudioEnabled(!audioEnabled)}
            />
            🔈 Audio
          </label>
        </div>
      </div>

      <div className="bar-container">
        {array.map((bar, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${bar.value}px`,
              backgroundColor: bar.color,
              width: `${100 / array.length}%`,
              position: 'relative',
            }}
          >
            <span className="bar-label">{bar.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingPage;
