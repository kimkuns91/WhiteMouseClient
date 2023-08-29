import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Search.css'

const Search = ({ BaseURL })=>{
    const navigate = useNavigate()
    const [ keyword, setKeyword ] = useState('')
    const handleKeyword = (e)=>{
        setKeyword(e.target.value)
    }
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            searchBtn();
        }
    };
    const searchBtn = ()=>{
        navigate(`/${BaseURL}?search=${keyword}`)
    }
    return( 
        <div className="Search">  
            <input 
                className="SearchInput" 
                type="text" 
                value={ keyword }
                onChange={ handleKeyword }
                onKeyDown={ handleKeyDown }
                placeholder="Enter your search keyword"
            />
            <button 
                className="Btn"
                onClick={ searchBtn }
            >Search</button>
        </div>
    )
}
export default Search