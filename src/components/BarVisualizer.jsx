import React from 'react';
import './BarVisualizer.css';

const BarVisualizer = ({ array }) => {
  return (
    <div className="bar-container">
      {array.map((bar, idx) => (
        <div
          key={idx}
          className="bar"
          style={{
            height: `${bar.value}px`,
            backgroundColor: bar.color,
          }}
        />
      ))}
    </div>
  );
};

export default BarVisualizer;