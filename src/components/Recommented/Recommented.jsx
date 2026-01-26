import React, { useState, useEffect } from 'react'
import './Recommented.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../Data'
import moment from 'moment'

const Recommented = ({category}) => {

  const [data,setData]=useState([])
  
      const fetchData=async()=>{
          const videoList_url =`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=KH&videoCategoryId=${category}&key=${API_KEY}`
          await fetch(videoList_url).then(Response=>Response.json()).then(data=>setData(data.items))
      }
      useEffect(()=>{
          if(category){
              fetchData();
          }
      },[category])
  return (
    <div className='recommented'>
      {data.map((item,index)=>{
        return (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index}>
          <div className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_converter(item.statistics.viewCount)} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
            </div>
          </div>
        </Link>
        )
      })}
    </div>
  )
}

export default Recommented
