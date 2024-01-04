import React from 'react'


const DisplayPhotos = ({photos}) => {

    const [fav,setFav]=useState([])

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

    const currIdex=fav.findIndex((favPhoto)=>favPhoto.id===photoId)
    if(currIdex!==-1){
      setFav((previousState)=>{
       previousState.filter((favPhoto)=>favPhoto.id!==photoId)
      })
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
  return (
    <div>

{photos.map((photo,index)=>{
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
      
    </div>
  )
}

export default DisplayPhotos
