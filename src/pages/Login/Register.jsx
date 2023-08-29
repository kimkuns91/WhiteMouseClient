import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser } from '../../services/userService';
import './Register.css'
import CatFrame from '../../components/CatFrame/CatFrame';

const Register = ()=>{
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("올바른 이메일 형식이 아닙니다!")
            .required("이메일을 입력하세요!"),
        username: Yup.string()
            .min(2, "닉네임은 최소 2글자 이상입니다!")
            .max(10, "닉네임은 최대 10글자입니다!")
            .matches(
            /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
            "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
            )
            .required("닉네임을 입력하세요!"),
        password: Yup.string()
            .min(8, "비밀번호는 최소 8자리 이상입니다")
            .max(16, "비밀번호는 최대 16자리입니다!")
            .required("패스워드를 입력하세요!")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
                "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
            ),
        password2: Yup.string()
            .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다!")
            .required("필수 입력 값입니다!"),
    });
    const submit = async (values) => {
        const { email, username, password } = values;
        createUser({ email, username, password })
            .then(() => {
                toast.success(<h3>회원가입이 완료되었습니다.<br/>로그인 하세요😎</h3>, {
                    position: "top-center",
                    autoClose: 2000
                });
                setTimeout(()=> {
                    navigate("/login");
                }, 2000);
            })
            .catch( err => 
                toast.error(err.response.data.message + "😭", {
                    position: "top-center",
                })
            )
    };
    return(
        <Formik
            initialValues={{
                email: "",
                username: "",
                password: "",
                password2: "",
        }}
            validationSchema={validationSchema}
            onSubmit={submit}
            validateOnMount={true}
        >
            {({values, handleSubmit, handleChange, errors}) => (
                <div className='Register Pages'>
                    <ToastContainer/>
                    <CatFrame />
                    <form className='LoginWrap BG02' onSubmit={ handleSubmit } autoComplete="off">
                        <div>
                            <label className='HL05' htmlFor="">이메일</label>
                            <input 
                                type="text" 
                                name="email"
                                className='Input'
                                value={ values.email }
                                onChange={ handleChange } 
                            />
                            <div className='Message NT'>
                                {
                                    !values.email
                                    ? null
                                    : <p>{errors.email}</p>
                                }
                            </div>
                        </div>
                        <div>
                            <label className='HL05' htmlFor="">닉네임</label>
                            <input 
                                type="text" 
                                name="username"
                                className='Input'
                                value={ values.username }
                                onChange={ handleChange } 
                            />
                            <div className='Message NT'>
                                {
                                    !values.username
                                    ? null
                                    : <p>{errors.username}</p>
                                }
                            </div>
                        </div>
                        <div>
                            <label className='HL05' htmlFor="">비밀번호</label>
                            <input 
                                type="password" 
                                name="password"
                                className='Input'
                                value={ values.password }
                                onChange={ handleChange } 
                            />
                            <div className='Message NT'>
                                {
                                    !values.password
                                    ? null
                                    : <p>{errors.password}</p>
                                }
                            </div>
                        </div>
                        <div>
                            <label className='HL05' htmlFor="">비밀번호 확인</label>
                            <input 
                                type="password" 
                                name="password2"
                                className='Input'
                                value={ values.password2 }
                                onChange={ handleChange } 
                            />
                            <div className='Message NT'>
                                {
                                    !values.password2
                                    ? null
                                    : <p>{errors.password2}</p>
                                }
                            </div>
                        </div>
                        <button 
                            type="submit"
                            className='LoginBtn Btn'
                        >회원가입</button>
                    </form>
                </div>
            )}
        </Formik>

    )
}
export default Register