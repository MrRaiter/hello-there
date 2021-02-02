import { useEffect, useRef, useState } from 'react';
import './App.css';
import video from './videos/MiddleEastMan01.webm';

function App() {
  const videoRef = useRef(null);
  const [value, setValue] = useState(0.1);
  const [oldValue, setOldValue] = useState(0.1);

  const handleChange = (e) => setValue(e.target.value)

  useEffect(() => {
    const duration = videoRef.current.duration;
    console.log(value);
    if (value >= oldValue) {
      for (let i = oldValue; i < value; i++) {
        const newTime = duration * parseInt(i) / 100
        console.log('1', newTime)
        videoRef.current.currentTime = newTime;
      }
    } else {
      for (let i = oldValue; i > value; i--) {
        const newTime = duration * parseInt(i) / 100
        console.log('2', newTime)
        videoRef.current.currentTime = newTime;
      }
    }
    setOldValue(value);
  }, [value])

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
