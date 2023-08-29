import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from '../../assets/images/Logo.png'
import LogoBlack from '../../assets/images/LogoBlack.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserPlus, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';

const Header = ()=>{
    const userInfo = useSelector((state) => state.user.value)
    const themeMode = useSelector((state) => state.theme.value.darkMode)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const [ sidebar, setSidebar ] = useState(false)
    const logoutBtn = ()=>{
        toast.info(<h3>다음에 봐요 찍찍!<br/>🐭</h3>, {
            position: "top-center",
            autoClose: 2000
        });
        setTimeout(()=> {
            localStorage.removeItem('Token'); 
            sessionStorage.removeItem('User'); 
            dispatch(logout())
            navigate("/");
        }, 2000);
    }
    return(
        <div className='Header'>
            <ToastContainer/>
            <Sidebar 
                sidebar = { sidebar }
                setSidebar = { setSidebar }
            />
            <div className='Wrap'>
                <div className='SideBarBtn NavMenu' onClick={()=>{
                    setSidebar(true)
                }}>
                    <FontAwesomeIcon icon={ faBars } />
                </div>
                <div className='NavLeft'>
                    <Link to='/'>
                        {
                            themeMode
                            ? <img className='Logo' src={ Logo } alt="" />
                            : <img className='Logo' src={ LogoBlack } alt="" />
                        }
                    </Link>
                    <Link to='about'className='NavMenu'>About</Link>
                    <Link to='post'className='NavMenu'>Post</Link>
                    <Link to='projects'className='NavMenu'>Projects</Link>
                    <Link to='contact'className='NavMenu'>Contact</Link>
                </div>
                <div className='NavRight'>
                    {
                        !userInfo.isLogined
                        ? <>
                            <Link to='login' className='NavMenu'>
                                <FontAwesomeIcon icon={ faRightToBracket } />
                            </Link>
                            <Link to='register' className='NavMenu registerBtn'>
                                <FontAwesomeIcon icon={faUserPlus} />
                            </Link>
                        </>
                        : <>
                            <FontAwesomeIcon onClick={ logoutBtn } className='NavMenu LogoutBtn' icon={faRightFromBracket} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
export default Header
