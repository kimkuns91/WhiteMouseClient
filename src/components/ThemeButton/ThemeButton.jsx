import { themeModeChange } from "../../redux/themeSlice"
import { useDispatch, useSelector } from 'react-redux';
import Cheese from '../../assets/images/Cheese.png'
import './ThemeButton.css'

const ThemeButton = ()=>{
    const themeMode = useSelector((state) => state.theme.value.darkMode)
    const dispatch = useDispatch()
    const changeTheme = ()=>{
        dispatch(themeModeChange())
    }
    return(
        <img className={
            themeMode
            ? "ThemeButton"
            : "ThemeButton ThemeButtonDark"
        } onClick={ changeTheme } src={ Cheese } alt="Cheese" />
    )
}
export default ThemeButton