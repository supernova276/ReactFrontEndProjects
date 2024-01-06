import React from 'react'
import LandingPage from './LandingPage'
import NavBar from '../common/NavBar'
import{useState, useEffect} from 'react'
import DisplayPhotos from '../common/DisplayPhotos'

const FavouritesPage = ({favPhotos,handleFavList,isFav}) => {
  return (
    <div>
        <NavBar></NavBar>
        <main>
        <DisplayPhotos photos={favPhotos} handleFavList={handleFavList} isFav={isFav}></DisplayPhotos>
        </main>
    </div>
  )
}
export default FavouritesPage
