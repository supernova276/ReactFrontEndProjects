import React from 'react'
import {Link} from 'react-router-dom'
import Lightbox from 'react-image-lightbox'
import { useState } from 'react'

const DisplayPhotos = ({photos,handleFavList,isFav}) => {

    console.log("photos",photos)

    const [fav,setFav]=useState(isFav?photos:[])
    console.log("value of fav is",fav)
    // const[isFav,setIsFav]=useState(true)
    const[IsLightboxOpen,setIsLightboxOpen]=useState(false)
    const[lightBoxIndex,setLightBoxIndex]=useState(0)

    const handleShare=(photoUrl)=>{
        const shareUrl=`https://api.whatsapp.com/send?text=${encodeURIComponent(`Checkout this amazing photo :
        ${photoUrl}`)}`
        window.open(shareUrl,'_blank')
}

const handleDownload=(photoUrl,photoId)=>{
         
    const link=document.createElement(`a`)
    link.href=photoUrl
    link.download=`photo_${photoId}.jpg`
    link.click()
}

const handleFavClick=(photoId)=>{

   console.log(fav.length)
    const currIdex=fav.findIndex((favPhoto)=>favPhoto.id===photoId)
    if(currIdex!==-1){
       
    //     handleFavList(setFav((previousState)=>{
    //    return previousState.filter((favPhoto)=>favPhoto.id!==photoId)
    //   }))
    let favlist=fav.filter((favPhoto)=>favPhoto.id!==photoId)
    handleFavList(favlist)
    setFav(favlist)
    }
    else if(currIdex===-1){
            
               let favPhotoToAdd=photos.find((photo)=>photoId===photo.id)
               let favlist=[...fav,favPhotoToAdd]
               setFav((previousState)=>[...previousState,favPhotoToAdd])
               handleFavList(favlist)
    }
}

const OpenLightbox=(index)=>{
    setLightBoxIndex(index)
    setIsLightboxOpen(true)
}

const CloseLightbox=()=>{
    setIsLightboxOpen(false)
}

const handleRemove=(photoId)=>{
    // setFav(previousState=>previousState.filter(photos.id!==photoId))
    // let favlist=fav
}

  return (
 <div>
 <section className='photos'>
<div className="photos-center">
{ 
photos.map((photo,index)=>{
          return <article key={photo.id} className={`photo 
          ${fav.some((favPhoto)=>favPhoto.id===photo.id)?'favourite-photo':""}`}>
            <img src={photo.urls.regular} alt={`${photo.alt_description}`} onClick={()=>OpenLightbox(index)}></img>
            <div className='photo-info'>
                <div className='photo-header'>
                    <h4>{`${photo.user.name}`}</h4>
                    <button className={`favourite-btn${fav.some(favPhoto=>favPhoto.id===photo.id)?' active':
                ""}`} onClick={()=>handleFavClick(photo.id)}><i className="bi bi-heart-fill"></i></button>
                </div>
                <div className='photo-actions'>
                    <p><i className="bi bi-heart-fill"/>{photo.likes}</p>
                    <button className='share-btn'onClick={()=>handleShare(photo.urls.regular)}><i className="bi bi-share-fill"></i></button>
                    <button className='download-btn'onClick={()=>handleDownload(photo.urls.full,photo.id)}><i className="bi bi-box-arrow-down"></i></button>
                </div>
                <Link>
                <img src={photo.user.profile_image.medium} className='user-img' alt={photo.user.name}></img>
                </Link>
            </div>
           </article>
        })}

        {IsLightboxOpen && (

        <Lightbox mainSrc={photos[lightBoxIndex].urls.full} onClose={CloseLightbox}></Lightbox>
      ) } 
      
    </div>
    </section>
    </div>
  )
}

export default DisplayPhotos
