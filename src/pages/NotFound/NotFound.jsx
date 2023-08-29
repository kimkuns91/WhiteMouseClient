import './NotFound.css'

const NotFound = ()=>{
    return(
        <div className="NotFound Page Wrap">
            <p className="HL02">Whoops, that page is gone</p>
            <p className="HL03">404 ERROR</p>
            <p className="HL04">The site configured at this address does not contain the requested file.</p>
            <a className='Btn' href="/">Go Home</a>
        </div>
    )
}
export default NotFound