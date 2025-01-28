import React, { useState } from 'react'
import Card from './components/Card'
import List from './components/List'
import Timer from './components/Timer'

const App = () => {
  const [musicNumber, setMusicNumber] = useState(0)
  const [open, setOpen] = useState(false)
  return (
    <div className='container'>
      <main>
        <Timer />
        <Card props={{musicNumber, setMusicNumber, setOpen}} />
        <List props={{open, setOpen, musicNumber, setMusicNumber}} />
      </main>
    </div>
  )
}

export default App
