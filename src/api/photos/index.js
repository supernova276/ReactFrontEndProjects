 import axios from 'axios'

 const BASE_URL=process.env.REACT_APP_BASE_URL
 const ACCESS_KEY=process.env.REACT_APP_UNSPLASH_ACCESS_KEY

 export const getPhotos=async(searchQuery,page)=>{
  console.log("search query is",searchQuery)
   let url=BASE_URL+ACCESS_KEY
   if(searchQuery){
    url=`${BASE_URL}${ACCESS_KEY}&query=${searchQuery}`
    console.log(searchQuery)
   }
   url+=`&page=${page}`
   console.log(url)
   return axios.get(url)

 }

