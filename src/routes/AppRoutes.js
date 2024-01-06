import React, { useState } from 'react'
import {Routes, Route,NavLink} from "react-router-dom"
import FavouritesPage from '../Pages/FavouritesPage'
import LandingPage from '../Pages/LandingPage'

const AppRoutes = () => {

  const [favlist,setFavlist]=useState([])

  const handleFavList=(favArray)=>{
    setFavlist(favArray)
  }
  return (
    <Routes>
        <Route path="/" element={<LandingPage  handleFavList={handleFavList} isFav={false}></LandingPage>}></Route>
        <Route path="/favourites" element={<FavouritesPage favPhotos={favlist} handleFavList={handleFavList} isFav={true}></FavouritesPage>}></Route>
    </Routes>
  )
}

export default AppRoutes
