import React from 'react'
import LandingPage from './LandingPage'
import NavBar from '../common/NavBar'

const FavouritesPage = ({favPhotos}) => {
  console.log(favPhotos)
  return (
    <div>
        <NavBar></NavBar>
        <main>
          <section className='photos'>
          <div className='photos-center'>
          { favPhotos.map((photo,index)=>{
               console.log("hello")
               return photo
          })}
          </div>
          </section>
        </main>
    </div>
  )
}
export default FavouritesPage
