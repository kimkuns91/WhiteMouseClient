import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrip, faList } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'

const ChangeMode = ({ modeChange, postMode })=>{
    const dispatch = useDispatch()
    return(
        <div className="PostControlWrap">
            <div className="modeChangeWrap BD02">
                <div onClick={()=>{
                    dispatch(modeChange('grid'))
                }} className={
                    postMode === 'grid'
                    ? 'modeChangeBtn modeChangeBtnActive'
                    : 'modeChangeBtn'
                }>
                    <FontAwesomeIcon icon={faGrip} />
                </div>
                <div onClick={()=>{
                    dispatch(modeChange('list'))
                }} className={
                    postMode === 'list'
                    ? 'modeChangeBtn modeChangeBtnActive'
                    : 'modeChangeBtn'
                }>
                    <FontAwesomeIcon icon={faList} />
                </div>
            </div>
        </div>  
    )
}
export default ChangeMode