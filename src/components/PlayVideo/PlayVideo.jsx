import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY } from '../../Data'
import { value_converter } from '../../Data'
import moment from 'moment'

const PlayVideo = ({videoId}) => {
    const [apiData,setApiData]=useState(null);
    const [channelData,setChannelData]=useState(null) 
    const [commentData,setCommentData]=useState([])

    const fetchVideoData=async ()=>{
        const videoDetail_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetail_url).then(Response=>Response.json()).then(data=>setApiData(data.items[0]))
    }

    const fetchOtherData=async()=>{
        const channelData_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(channelData_url).then(Response=>Response.json()).then(data=>setChannelData(data.items[0]))

        const commentData_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
        await fetch(commentData_url).then(Response=>Response.json()).then(data=>setCommentData(data.items))
    }

    useEffect(()=>{
        fetchVideoData();
    },[])

    useEffect(()=>{
        fetchOtherData();
    },[])
    // Hide Description
    const [isExpanded,setIsExpanded]=useState(false)
    const toggleDescription=()=>{
        setIsExpanded(!isExpanded)
    }

  return (
    <div className='play-video'>
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&control=1`} autoplay frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"0"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
            
            <div>
                <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):"0"}</span>
                <span><img src={dislike} alt="" /></span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:""}</p>
                <span>{channelData?value_converter(channelData.statistics.subscriberCount):''} Subscriber</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="video-description">
            <p>{apiData?(isExpanded?apiData.snippet.description:apiData.snippet.description.slice(0,250)):""}</p>
            <div class="see-more" onClick={toggleDescription}>{isExpanded?"^^^hide":"...see more"}</div>
            <hr />
            <h4>{apiData?value_converter(apiData.statistics.commentCount):""} comment</h4>
            
            {commentData.map((item,index)=>{
                return(
                    <div key={index} className='comment'>
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>
                )
            })}           
        </div> 
      
    </div>
  )
}

export default PlayVideo
