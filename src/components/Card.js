import React, { useState, useEffect, useRef } from 'react'
import '../assets/css/card.css'
import musics from '../assets/data'
import { timer } from '../utils/timer';

const Card = ({props: { musicNumber, setMusicNumber, setOpen }}) => {
    const [duration, setDuration] = useState(1);
    const[currentTime, setCurrentTime] = useState(0);
    const[play, setPlay] = useState(false);

    const audioRef = useRef()

    function handleLoadStart(e){
        const src = e.nativeEvent.srcElement.src;
        const audio = new Audio(src);
        audio.onloadedmetadata = function(){
            if(audio.readyState > 0){
                setDuration(audio.duration)
            }
        }
        console.log(e.nativeEvent.srcElement.src)
    }

    function handlePlayingAudio(){
        if(play){
            audioRef.current.pause();
            setPlay(false)
        }else{
            audioRef.current.play();
            setPlay(true)
        }
    }

    function handleTimeUpdate(){
        const currentTime = audioRef.current.currentTime;
        setCurrentTime(currentTime)
    }

    function changeCurrentTime(e){
        const currentTime = Number(e.target.value)
        audioRef.current.currentTime = currentTime
        setCurrentTime(currentTime)
    }

    function handleNextPrev(n){
        setMusicNumber(value => {
            if(n > 0)
                return value + n > musics.length - 1 ? 0 : value + n
            return value + n < 0 ? musics.length - 1 : value + n
        })
    }

    return (
        <div className='card'>
            <div className='nav'>
                <i className="material-icons">expand_more</i>

                <span>Now Playing {musicNumber + 1}/{musics.length}</span>

                <i className="material-icons" 
                onClick={() => setOpen(prev => !prev)}>queue_music</i>
            </div>
            <div className='img'>
                <img src={musics[musicNumber].thumbnail} alt="" />
            </div>
            <div className='details'>
                <p className='title'>{musics[musicNumber].title}</p>
                <p className='artist'>{musics[musicNumber].artist}</p>
            </div>
            <div className='progress'>
                <input type="range" min={0} max={duration}
                value={currentTime} onChange={e => changeCurrentTime(e)}/>
            </div>
            <div className='timer'>
                <span>{timer(currentTime)}</span>
                <span>{timer(duration)}</span>
            </div>
            <div className="controls">
                <i className='material-icons'>repeat</i>
                <i className='material-icons' id='prev'
                onClick={() => handleNextPrev(-1)}>skip_previous</i>       
                <div className="play" onClick={handlePlayingAudio}>
                    <i className='material-icons' id='play'>
                        {play ? 'pause' : 'play_arrow'}
                    </i>
                </div>
                <i className='material-icons' id='next' 
                onClick={() => handleNextPrev(1)}>skip_next</i>
                <i className='material-icons'>volume_up</i>
                <div className="volume">
                    <i className='material-icons' id='next'>volume_up</i>
                    <input type="range" min={0} max={100} />
                    <span>50</span>
                </div>
            </div>
            <audio src={musics[musicNumber].src} hidden ref={audioRef}
            onLoadStart={handleLoadStart} onTimeUpdate={handleTimeUpdate}/>
        </div>
  )
}

export default Card
