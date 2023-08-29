import './Sidebar.css'

const Sidebar = ({ sidebar, setSidebar })=>{
    return(
        <>
            <div className={
                !sidebar
                ? "Sidebar"
                : "Sidebar SidebarActive"
            }></div>
            <div className={
                !sidebar
                ? "Outside"
                : "Outside OutsideActive"
            } onClick={()=>{
                setSidebar(false)
            }}></div>
        </>
    )
}
export default Sidebar