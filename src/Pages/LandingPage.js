import React from 'react'
import NavBar from '../common/NavBar'
import{useState, useEffect} from 'react'
import { getPhotos } from '../api/photos'
import {Link} from 'react-router-dom'
import Lightbox from 'react-image-lightbox'
import DisplayPhotos from '../common/DisplayPhotos'
const LandingPage = ({handleFavList,isFav}) => {

    const[data,setData]=useState([])
    const[loading,setLoading]=useState(false)
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


const handleSearch=(searchValue)=>{
  setSearchQuery(searchValue)
}
  return (
    <main>
      <NavBar handleSearch={handleSearch}></NavBar>
        {loading? <p>loading</p>:
            
          <DisplayPhotos photos={data}handleFavList={handleFavList} isFav={isFav}></DisplayPhotos>
        }

    </main>
  )
}

export default LandingPage
