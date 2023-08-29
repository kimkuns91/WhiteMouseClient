import { useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signin } from '../../services/authService';
import { useDispatch } from "react-redux"
import { login } from '../../redux/userSlice';
import CatFrame from '../../components/CatFrame/CatFrame';
import './Login.css'

const Login = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const submit = async (values) => {
        const { email, password, autoLogin } = values;
        signin({ email, password, autoLogin })
            .then(response => {
                dispatch(login({ 
                    isLogined : true,
                    autoLogin, 
                    email: response.email,
                    username: response.username,
                    role : response.role
                }))
                toast.success(<h3>{ response.username } 친구! 반갑다 찍!<br/>🐭</h3>, {
                    position: "top-center",
                    autoClose: 2000
                });
                setTimeout(()=> {
                    navigate("/");
                }, 1000);
            })
            .catch( err => 
                toast.error(err.response.data.message + "🐱", {
                    position: "top-center",
                })
            )
    };
    
    return(
        <Formik
        initialValues={{
            email: "",
            password: "",
            autoLogin : false
        }}
            onSubmit={submit}
            validateOnMount={true}
        >
            {({values, handleSubmit, handleChange, errors}) => (
                <div className='Page Login'>
                    <ToastContainer/>
                    <CatFrame />
                    <form className='SmallWrap BG02 SmallForm' onSubmit={ handleSubmit } autoComplete="off">
                        <h3 className='HL05 TextCenter'>Sign In</h3>
                        <input 
                            type="email" 
                            name="email"
                            className='FormInput'
                            placeholder='Email'
                            value={ values.email }
                            onChange={ handleChange } 
                        />
                        <input 
                            className='FormInput'
                            type="password" 
                            name="password"
                            placeholder='Password'
                            value={ values.password }
                            onChange={ handleChange } 
                        />

                        <div className='CheckboxWrap'>
                            <label className='ST01' htmlFor="autoLogin">Remember Me</label>
                            <input 
                                className='FormCheckbox'
                                type="checkbox" 
                                id='autoLogin'
                                name="autoLogin"
                                value={ values.autoLogin }
                                onChange={ handleChange } 
                            />
                        </div>
                        <button className='LargeBtn' type="submit">SIGN IN</button>
                    </form>
                </div>
            )}
        </Formik>
    )
}
export default Login