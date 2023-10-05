import './Reset.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import ProjectsLayout from './pages/Layout/ProjectsLayout';
import Main from './pages/Main/Main';
import About from './pages/About/About';
import Post from './pages/Post/Post';
import PostEditor from './pages/Post/PostEditor';
import Projects from './pages/Projects/Projects';
import Register from './pages/Login/Register';
import Login from './pages/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './services/authService';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, logout } from './redux/userSlice';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.js';
import { lightTheme, darkTheme } from './styles/theme';
import PostDoc from './pages/Post/PostDoc';
import NotFound from './pages/NotFound/NotFound';
import ChatRoom from './pages/ChatRoom/ChatRoom';

function App() {
  const userInfo = useSelector((state) => state.user.value)
  const themeMode = useSelector((state) => state.theme.value.darkMode)
  const dispatch = useDispatch()
  useEffect(()=>{
    const Tokens = JSON.parse(localStorage.getItem('Tokens'));
    if(!Tokens){
      dispatch(logout())
      return 
    }
    if(Tokens && userInfo.autoLogin){
      const fetchAuth = async () => {
        await getUser()
          .then(response => {
            dispatch(login({
              isLogined : true,
              email : response.email,
              username : response.username,
            }))
          })
          .catch(()=>{
              toast.error(<h3>유저 정보를 불러오지 못했다냥!<br/>로그인을 다시해달라냥!<br/>🐱</h3>, {
                position: "top-center",
                autoClose: 2000
              })
              dispatch(logout())
              localStorage.removeItem('Tokens')
          })
      }
      return fetchAuth()
    }
  },[userInfo.autoLogin, dispatch])

  return (
    <ThemeProvider theme={ themeMode ? darkTheme : lightTheme }>
      <GlobalStyle />
      <div className="App">
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='' element={<Main />} />
              <Route path='about' element={<About />} />
              <Route path='post' element={<Post />} />
              <Route path='post/:postId' element={<PostDoc />} />
              <Route path='projects' element={<Projects />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='/project' element={<ProjectsLayout />}>
              <Route path='editor' element={<PostEditor />} />
              <Route path='editor/:postId' element={<PostEditor />} />
              <Route path='chatroom' element={<ChatRoom />} />
            </Route>
          </Routes>    
      </div>
    </ThemeProvider>
  );
}

export default App;
