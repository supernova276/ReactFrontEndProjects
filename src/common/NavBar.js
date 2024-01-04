import {Link} from 'react-router-dom'


import { useState } from 'react';
const NavBar=({handleSearch})=>{

    const handleSearchValue=(e)=>{
        e.preventDefault()
        handleSearch(e.target.value)
    }
    return (
        <>
        <div>
            <nav className="navbar">
                <Link to="/" className="navbar__logo">
                    FotoFlix
                </Link>
               <div> 
                <form action="" className="navbar_search-form" onSubmit={handleSearch}>
                <input className="form-input" placeholder='search' onChange={handleSearchValue}/>
                <button type="submit" className='submit-btn bi-search'></button>
                </form>
               </div>
                <div className="navbar__links">
                    <Link to="/favourites">Favourites</Link>
                </div>
            </nav>
        </div>
        </>
    )
}
export default NavBar