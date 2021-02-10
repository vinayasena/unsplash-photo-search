import React from "react";
import { FcLike } from "react-icons/fc";
const Photo = ({
  urls: { regular },
  alt_description,
  user: {
    name,
    portfolio_url,
    profile_image: { medium }
  
  },
  height,
  width,
  likes,
}) => {
 const imageClass = height>width?'vertical':'horizontal'

  return (
    <div className={`${imageClass} photo-container`}>
    
      <img src={regular} alt={alt_description}
      className={imageClass}
      ></img>
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p className='likes'>{likes} likes <FcLike/></p> 
          <a href={regular} style={{color:'#fff', fontWeight:'bold'}} target='_blank' rel="noopener noreferrer">View Image</a> 
        </div>
        <a href={portfolio_url}>
            <img src={medium} alt="" className='user-avatar'/>
        </a>
        
      </div>
      
    </div>
  );
};

export default Photo;
