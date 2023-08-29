import { useSelector } from "react-redux"
import ContentForm from "../../components/ContentForm/ContentForm"
import { modeChange } from '../../redux/projectSlice';

const data = [
    {
        title : "Geegle",
        keyword : "#ChatGPT #JavaScript #React",
        desc : "ChatGPT를 이용한 Google 폼 검색 엔진",
        views : "Secret",
        comment : [],
        createdAt : "2023-08-22"
    },
    {
        title : "Goom",
        keyword : "#WTC #JavaScript #React",
        desc : "WTC 이용한 화상채팅",
        views : "Secret",
        comment : [],
        createdAt : "2023-08-22"
    },
]
const Projects = ()=>{
    const projectMode = useSelector((state) => state.project.value)
    const userRole = useSelector((state) => state.user.value.role)
    return(
        <div className="Page">
            <ContentForm 
                ContentTitle = { "PROJECTS" } 
                data = { data } 
                userRole = { userRole } 
                modeChange = { modeChange } 
                postMode = { projectMode }
            />
        </div>
    )
}
export default Projects