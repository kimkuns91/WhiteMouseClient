import { useSelector } from "react-redux"
import { modeChange } from '../../redux/postSlice';
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import { findAllPost } from "../../services/postService"
import ContentForm from "../../components/ContentForm/ContentForm";

const Post = ()=>{
    const [ loading, setLoading ] = useState(true)
    const [ data, setData ] = useState([])
    const postMode = useSelector((state) => state.post.value)
    const userRole = useSelector((state) => state.user.value.role)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('search');

    useEffect(()=>{
        setLoading(true)
        const fetchData = async ()=>{
            await findAllPost()
                .then(response => {
                    if(keyword){
                        const resData = response.data                  
                        const filteredData = resData.filter(data => 
                            data.category.toLowerCase().includes(keyword.toLowerCase()) || data.title.toLowerCase().includes(keyword.toLowerCase())
                        )
                        return setData(filteredData)
                    }
                    setData(response.data)
                })
                .catch(err => console.log(err))
            setLoading(false)    
        }
        fetchData()
    },[keyword])
    return(
        <div className="Page">
            <ContentForm 
                ContentTitle = { "POST" } 
                data = { data } 
                userRole = { userRole } 
                modeChange = { modeChange } 
                postMode = { postMode }
                BaseURL = { 'post' }
            />
        </div>
    )
}
export default Post