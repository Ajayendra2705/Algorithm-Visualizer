import React, { useState, useEffect, useRef } from 'react';
import { linearSearch } from '../algorithms/searching/linearSearch';
import { binarySearch } from '../algorithms/searching/binarySearch';

const SearchingPage = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState('');
  const [speed, setSpeed] = useState(300);
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
    const newArray = Array.from({ length: 20 }, () => ({
      value: Math.floor(Math.random() * 100),
      color: 'steelblue',
    }));
    setArray(newArray); // Unsorted by default
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
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(100 + value, ctx.currentTime);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    generateArray();
  }, []);

  // Handler for Binary Search: Sort first
  const handleBinarySearch = async () => {
    const sorted = [...array].sort((a, b) => a.value - b.value);
    setArray(sorted);
    await binarySearch(sorted, setArray, +target, speedRef, playTone);
  };

  return (
    <div className="searching-page">
      <div className="controls">
        <div className="row">
          <button onClick={generateArray}>🔄 Generate</button>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter target"
          />
          <button onClick={() => linearSearch(array, setArray, +target, speedRef, playTone)}>🔍 Linear</button>
          <button onClick={handleBinarySearch}>📚 Binary</button>
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
              height: `${bar.value * 3}px`,
              backgroundColor: bar.color,
              width: `${100 / array.length}%`,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-24px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#fff',
                padding: '1px 5px',
                borderRadius: '3px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {bar.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchingPage;
