import React, { useState } from 'react';
import './Counter.css';

export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  return (
    <div className="counter-container">
      <div className="count"><h1>{count}</h1></div>
      <div className="counter-buttons-div">
        <button className="minus-button" onClick={decrement}>-</button>
        <button className="add-button" onClick={increment}>+</button>
      </div>
      <button className="reset-button" onClick={reset}>Reset</button>
    </div>
  );
}

