import ChangeMode from "../ChangeMode/ChangMode"
import CardMode from "../CardMode/CardMode"
import ListMode from "../ListMode/ListMode"
import './ContentForm.css'
import CatFrame from "../CatFrame/CatFrame"

const ContentForm = ({ ContentTitle, data, userRole, modeChange, postMode, BaseURL }) => {
    return(
        <div className="OpeningForm Wrap">
            <CatFrame />
            <div className="ContentForm">
                <h3 className="HL04 TextCenter">{ ContentTitle }</h3>
                <ChangeMode modeChange={ modeChange } postMode={ postMode }/>
                {
                    postMode === 'grid'
                    ? <CardMode data={ data } userRole={ userRole } ContentTitle={ ContentTitle } BaseURL={ BaseURL }/>    
                    : <ListMode data={ data } userRole={ userRole } ContentTitle={ ContentTitle } BaseURL={ BaseURL }/>
                }
            </div>
        </div>
    )
}
export default ContentForm