import React from 'react'
import '../Video/Video.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import Recommented from '../../components/Recommented/Recommented'
import { useParams } from 'react-router'

const Video = ({sidebarOpen}) => {
  const {videoId,categoryId}=useParams();
  return (
    <>
    <Sidebar sidebarOpen={sidebarOpen}/>
    <div className='play-container'>
        <PlayVideo videoId={videoId}/>
        <Recommented/>
    </div>
    </>
  )
}

export default Video
