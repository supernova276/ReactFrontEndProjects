import {Link} from 'react-router-dom'

const NavBar=({handleSearch})=>{

    const handleSearchValue=(e)=>{
        e.preventDefault()
        handleSearch(e.target.value)

    }

    const debounce=(callback,timer)=>{
        let timerId;
        return function(...args){
        
        clearTimeout(timerId)
         timerId=setTimeout(() => {
                callback(...args)
            }, timer);
        }
    }

    let debouncedFunction=debounce(handleSearchValue,500)

    return (
        <>
        <div>
            <nav className="navbar">
                <Link to="/" className="navbar__logo">
                    FotoGalri
                </Link>
               <div> 
                <form action="" className="navbar_search-form" onSubmit={handleSearch}>
                <input className="form-input" placeholder='search' onChange={debouncedFunction} style={{display:"inline-block"}}/>
                <button type="submit" className='submit-btn bi-search'style={{display:"inline-block"}}></button>
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