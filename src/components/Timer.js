import React, { useState, useEffect, useRef } from 'react'
import '../assets/css/timer.css'

const Timer = () => {
  const [time, setTime] = useState(30)
  const [isRunning, setIsRunning] = useState(false)
  const beepSound = useRef(new Audio(require('../assets/sounds/beep.mp3')));
  const tickingSound = useRef(new Audio(require('../assets/sounds/clock-ticking.mp3')));


  const toggleTimer = () => {
    setIsRunning((prev) => !prev)
  }

  const resetTimer = () => {
    setTime(30)
    setIsRunning(false)
    tickingSound.current.pause()
    tickingSound.current.currentTime = 0
  }

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            beepSound.current.play()
            tickingSound.current.pause()
            tickingSound.current.currentTime = 0
            return 30
          }
          return prevTime - 1
        });
      }, 1000)
    } else {
      clearInterval(timerInterval)
    }

    return () => clearInterval(timerInterval)
  }, [isRunning]);

  useEffect(() => {
    if (time === 5) {
      tickingSound.current.loop = true
      tickingSound.current.play()
    } else if (time > 5) {
      tickingSound.current.pause()
      tickingSound.current.currentTime = 0
    }
  }, [time])

  return (
    <div className="timer-section">
      <h2>Timer</h2>
      <div className="timer-display">
        <span>{time}s</span>
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer
