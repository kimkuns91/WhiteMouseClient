import { useNavigate } from 'react-router-dom'
import './PostCRUD.css'
import { deletePost } from '../../services/postService'

const PostCRUD = ({ postId })=>{
    const navigate = useNavigate()
    const updateBtn = ()=>{
        navigate(`/project/editor/${postId}`)
    }
    const deleteBtn = ()=>{
        if(window.confirm("해당 글을 삭제하시겠습니까?")){
            deletePost({ id : postId })
                .then(()=>{
                    navigate('/post')
                })
                .catch(err => console.log(err))
        }
    }
    return(
        <div className="PostCRUD">
            <p className='CT01' onClick={ updateBtn }>수정</p>
            <p className='CT01' onClick={ deleteBtn }>삭제</p>
        </div>
    )
}
export default PostCRUD