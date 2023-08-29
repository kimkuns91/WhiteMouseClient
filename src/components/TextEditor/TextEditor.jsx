import React, { useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import TextareaAutosize from 'react-textarea-autosize';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css'
import { useNavigate } from 'react-router-dom';
import Category from '../Category/Category';
import { uploadImg } from '../../services/uploadService';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

const TextEditor = ({ category, setCategory, keyword, setKeyword, title, setTitle, desc, setDesc, writeEndBtn })=>{
    const quillRef = useRef()
    const navigate = useNavigate()
    const imageHandler = () => {
      const input = document.createElement('input');
  
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click(); 
  
      input.addEventListener('change', async () => {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
          const result = await uploadImg({ formData : formData });
          const IMG_URL = result.data.url;
          const editor = quillRef.current.getEditor(); 
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', IMG_URL);
        } catch (error) {
          console.log(error.message);
        }
      });
    };
    const modules = useMemo(() => {
        return {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6,false] }],
              ["bold", "italic", "underline", "strike", 'blockquote'],
              [{ list: "ordered" }, { list: "bullet" }, {'indent' : '-1'}, {'indent' : '+1'}],
              ["link", "image"],
              [{ align: [] }, { color: [] }, { background: [] }],
              ['clean']
            ],
            handlers: {
              image: imageHandler,
            },
          },
          ImageResize: {
            parchment: Quill.import('parchment')
          }
        }
    }, [])

    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'image',
    ];
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault(); // Enter 키 입력 막기
        }
    };
    const handleCategory = (e) => {
        setCategory(e.target.value)
    };
    const handleTitle = (e) => {
        setTitle(e.target.value)
    };
    const handleKeyword = (e) => {
        setKeyword(e.target.value)
    };
    const writeCancelBtn = ()=>{
        navigate('/post')
    }

    return (
      <div className='TextEditorWrap'> 
        <div className='TextEditor'>
            <Category 
              category = { category }
              handleCategory={ handleCategory }
            />
            <TextareaAutosize 
                cacheMeasurements 
                className='TitleInput' 
                type="text" 
                placeholder='제목을 입력하세요' 
                value={ title }
                onKeyDown={ handleKeyDown } 
                onChange={ handleTitle }
            />
            <div className='keywordWrap'>
              <input type="text" className='keyword' placeholder='키워드' value={ keyword } onChange={ handleKeyword }/>
            </div>
            <ReactQuill 
                ref={quillRef}
                value={desc}
                onChange={setDesc}
                placeholder="내용을 입력하세요"
                theme="snow"
                modules={modules}
                formats={formats}
            />            
        </div>
        <div className='TextEditorBottom'>
            <div className='TextEditorBottomWrap'>
                <button className='Btn' onClick={ writeCancelBtn }>뒤로가기</button>
                <button className='Btn' onClick={ writeEndBtn }>완료</button>
            </div>
        </div>
      </div>
    );  
}

export default TextEditor