import { useState } from "react";
import Paging from "../Paging/Paging";
import './ListMode.css'
import Search from "../Search/Search";
import WriteButton from "../WriteButton/WriteButton";

const ListMode = ({ data, userRole, ContentTitle, BaseURL }) => {
    const [ page, setPage ] = useState(1);

    const itemsCountPerPage = 10
    const indexOfLast = page * itemsCountPerPage;
    const indexOfFirst = indexOfLast - itemsCountPerPage;
    let currentData = data.slice(indexOfFirst, indexOfLast);
    let dataNum = data.length - indexOfFirst
    return(
        <> 
            <div className="ListWrap ST01">
                <div className="ListHead">
                    <div className="ListWrap01">번호</div>
                    <div className="ListWrap02">제목</div>
                    <div className="ListWrap03">조회수</div>
                    <div className="ListWrap04">작성시간</div>
                </div>
                {
                    currentData.map((post, index)=>
                        <div className="ListBody" key={ index }>
                            <div className="ListWrap01">{ dataNum - index }</div>
                            <a href={`/post/${ post._id }`} className="ListWrap02">{ post.title }</a>
                            <div className="ListWrap03">{ post.views }</div>
                            <div className="ListWrap04">{ post.createdAt.slice(0, 10) }</div>
                        </div>
                    )
                }
            </div>
            {
                userRole === 'Admin' && ContentTitle === 'POST'
                ? <WriteButton />
                : null
            }
            <Search BaseURL = { BaseURL }/>
            <Paging
                page={ page } 
                itemsCountPerPage = { itemsCountPerPage }
                count={ data.length } 
                setPage={ setPage }
            />

        </>
    )
}
export default ListMode