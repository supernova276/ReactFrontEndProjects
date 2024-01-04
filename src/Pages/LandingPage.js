import React from 'react'
import NavBar from '../common/NavBar'
import{useState, useEffect} from 'react'
import { getPhotos } from '../api/photos'
import {Link} from 'react-router-dom'
import Lightbox from 'react-image-lightbox'
import DisplayPhotos from '../common/DisplayPhotos'
const LandingPage = ({handleFavList}) => {

    const[data,setData]=useState([])
    const[loading,setLoading]=useState(false)
    const [fav,setFav]=useState([])
    const[lightBoxIndex,setLightBoxIndex]=useState(0)
    const[IsLightboxOpen,setIsLightboxOpen]=useState(false)
    const[searchQuery,setSearchQuery]=useState("")
    const[page,setPage]=useState(1)

    const init=async()=>{
        const {data}=await getPhotos(searchQuery,page)
        setData(data.results || data)
        setLoading(false)
    }
    useEffect(()=>{
       try{
        setLoading(true)
        init()
       }
       catch(error){
        console.log(error)
       }
    },[searchQuery,page])

    useEffect(()=>{
      const handleScroll=()=>{
        if(
          !loading && 
          window.innerHeight + window.scrollY>=document.body.scrollHeight-200
        ){
          setPage((prevPage)=>prevPage+1)
        }
      }
      window.addEventListener('scroll',handleScroll)
      return ()=> window.removeEventListener('scroll',handleScroll) 
    },[loading])

    const handleFavClick=(photoId)=>{

         const currIdex=fav.findIndex((favPhoto)=>favPhoto.id===photoId)
         if(currIdex!==-1){
           setFav((previousState)=>{
            previousState.filter((favPhoto)=>favPhoto.id!==photoId)
           })
         }
         else if(currIdex===-1){
                
                    let favPhotoToAdd=data.find((photo)=>photoId===photo.id)
                    let favlist=[...fav,favPhotoToAdd]
                    setFav((previousState)=>[...previousState,favPhotoToAdd])
                    handleFavList(favlist)

         }
    }

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

 const OpenLightbox=(index)=>{
    setLightBoxIndex(index)
    setIsLightboxOpen(true)
}

const CloseLightbox=()=>{
    setIsLightboxOpen(false)
}

const handleSearch=(searchValue)=>{
  setSearchQuery(searchValue)
}

  return (
    <main>
      <NavBar handleSearch={handleSearch}></NavBar>
      <section className='photos'>
        <div className="photos-center">
        {loading? <p>loading</p>:
            
          <DisplayPhotos photos={data} fav={fav}></DisplayPhotos>
        }
        </div>
      </section>

      {IsLightboxOpen && (

        <Lightbox mainSrc={data[lightBoxIndex].urls.full} onClose={CloseLightbox}></Lightbox>
      ) }

    </main>
  )
}

export default LandingPage
