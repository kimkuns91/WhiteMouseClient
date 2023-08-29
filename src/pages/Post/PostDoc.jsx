import { useEffect, useState } from "react"
import { findPost, postViewUp } from "../../services/postService"
import { useParams } from "react-router-dom"
import TextareaAutosize from 'react-textarea-autosize';
import './PostDoc.css'
import PostCRUD from "../../components/PostCRUD/PostCRUD";

const PostDoc = ()=>{
    const { postId } = useParams()
    const [ data, setData ] = useState({})
    const fetchData = async ()=>{
        await findPost({ id: postId })
            .then(response => setData(response.data))
            .catch(err =>
                console.log(err.message.message)    
            )
    }
    useEffect(()=>{
        fetchData()
        postViewUp({ id: postId })
    },[postId])
    return(
        <div>
            {
                !data
                ? null
                : <Post data={ data }/>
            }
        </div>
    )
}
const Post = ({ data })=>{
    // const [ comment, setComment ] = useState('')
    // const handleKeyDown = (e) => {
    //     if (e.keyCode === 13) {
    //       e.preventDefault(); // Enter 키 입력 막기
    //     }
    // };
    // const handleComment = (e)=>{
    //     setComment(e.target.value)
    // }
    return(
        <div className="Wrap Page">
            <div className="PostHead">
                <p className="ST01">{ data.category }</p>
                <p className="HL04">{ data.title }</p>
                <p className="CT01">{ data.keyword }</p>
                <p className="CT02 ">{ data.createdAt }</p>
                <PostCRUD postId = { data._id } />
            </div>
            <div className="InnerHTML" dangerouslySetInnerHTML={{ __html : data.desc }}/>
            {/* <div className="PostFoot">
                <TextareaAutosize
                    cacheMeasurements 
                    className='TitleInput' 
                    type="text" 
                    placeholder='댓글을 입력하세요' 
                    onKeyDown={ handleKeyDown } 
                    onChange={ handleComment }
                />
            </div> */}

        </div>
    )
}
export default PostDoc