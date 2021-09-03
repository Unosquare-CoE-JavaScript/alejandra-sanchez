import React from 'react';
import logo from './logo.svg';
import styles from './App.css';


function App() {
  const [count, setCount] = React.useState(0);
  const [error, setError] = React.useState(false)

  const incrementVal = () => {
    setCount(count+1)
    setError(false)
  }

  const decrementVal = () => {
    if (count > 0){
      return setCount(count-1)
    }
    setError(true)
  }

  return (
   <div data-test="component-app">
    <h1 data-test="counter-display">
      The counter is currently&nbsp;
      <span data-test="count">{count}</span>
    </h1> 
    {error && <h3 className="error">The counter cannot go below 0</h3>}
    <button data-test="increment-button" onClick={incrementVal}>
      Increment counter
    </button>
    <button data-test="decrement-button" onClick={decrementVal}>
      Decrement counter
    </button>
   </div> 
  );
}

export default App;
