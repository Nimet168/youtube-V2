import React, { useState } from 'react'
import {Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebarOpen={sidebarOpen}/>}/>
        <Route path='/video/:categoryId/:videoId' element={<Video sidebarOpen={sidebarOpen}/>}/>
      </Routes>
    </div>
  )
}

export default App
