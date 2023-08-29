import { Outlet } from "react-router-dom"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import ThemeButton from "../../components/ThemeButton/ThemeButton"

const Layout = ()=>{
    return(
        <div>
            <Header />
            <Outlet />
            <ThemeButton />  
            <Footer />
        </div>
    )
}
export default Layout