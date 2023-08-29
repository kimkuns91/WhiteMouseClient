import { useNavigate } from "react-router-dom"
import './WriteButton.css'

const WriteButton = ()=>{
    const navigate = useNavigate()
    const writeBtn = ()=>{
        navigate('/project/editor')
    }
    return(
        <div className="WriteButtonWrap">
            <button className="Btn" onClick={ writeBtn }>Write</button>
        </div>
    )
}
export default WriteButton