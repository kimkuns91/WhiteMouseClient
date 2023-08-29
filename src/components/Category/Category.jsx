const Category = ({ category, handleCategory })=>{
    return(
        <select name="category" id="category" value={ category } onChange={ handleCategory }>
            <option value="카테고리 없음">카테고리 없음</option>
            <option value="React">React</option>
            <option value="NodeJS">NodeJS</option>
            <option value="AWS">AWS</option>
            <option value="Javascript">Javascript</option>
            <option value="Java">Java</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
        </select>
    )
}
export default Category