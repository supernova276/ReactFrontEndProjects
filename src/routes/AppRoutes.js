import React, { useState } from 'react'
import {Routes, Route,NavLink} from "react-router-dom"
import FavouritesPage from '../Pages/FavouritesPage'
import LandingPage from '../Pages/LandingPage'

const AppRoutes = () => {

  const [favlist,setFavlist]=useState([])

  const handleFavList=(favArray)=>{
    setFavlist(favArray)
    console.log("favarray is",favArray)
  }
  return (
    <Routes>
        <Route path="/" element={<LandingPage handleFavList={handleFavList}></LandingPage>}></Route>
        <Route path="/favourites" element={<FavouritesPage favPhotos={favlist}></FavouritesPage>}></Route>
    </Routes>
  )
}

export default AppRoutes
