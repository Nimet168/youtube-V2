import React, { useState } from 'react'
import '../Home/Home.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'

const Home = ({ sidebarOpen }) => {

  const [category,setCategory]=useState(0)

  return (
    <>
    <Sidebar sidebarOpen={sidebarOpen} category={category} setCategory={setCategory}/>
    <div className={`contianer ${sidebarOpen?"large-container":""}`} >
        <Feed category={category}/> 
    </div>  
    </>
  )
}

export default Home
