import { useEffect, useRef, useState } from 'react';
import './App.css';
import video from './videos/MiddleEastMan01.webm';

const epsEq = (val1, val2) => Math.abs(val1 - val2) < 0.1

function App() {
  const videoRef = useRef(null);
  const [value, setValue] = useState(0.1);
  const [oldValue, setOldValue] = useState(0.1);

  const interval = useRef(null);
  const actualValue = useRef(value);
  const handleChange = (e) => {
    setValue(e.target.value);
    const delta = (e.target.value - actualValue.current) / 100;
    console.log(delta);

    if (interval.current) {
      clearInterval(interval.current);
    }

    let i = 0;

    interval.current = setInterval(() => {
      actualValue.current += delta;
      videoRef.current.currentTime = videoRef.current.duration * actualValue.current / 100;
      if (i++ === 100) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }, 10);
  }

  // useEffect(() => {
  //   const duration = videoRef.current.duration;
  //   console.log(value);
  //   if (value >= oldValue) {
  //     for (let i = oldValue; i < value; i++) {
  //       const newTime = duration * parseInt(i) / 100
  //       console.log('1', newTime)
  //       videoRef.current.currentTime = newTime;
  //     }
  //   } else {
  //     for (let i = oldValue; i > value; i--) {
  //       const newTime = duration * parseInt(i) / 100
  //       console.log('2', newTime)
  //       videoRef.current.currentTime = newTime;
  //     }
  //   }
  //   setOldValue(value);
  // }, [value])

  return (
    <div className="App">
      <video ref={videoRef} width="750" height="500" >
        <source src={video} type="video/webm" />
      </video>
      <input value={value} onChange={handleChange} type="range" min="0.1" max="100" id="range" name="range" />
      <label for="volume" />
    </div>
  );
}

export default App;
