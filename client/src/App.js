import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './containers/signUp/SignUp'
import UserProfile from './components/user/UserProfile'
import AddPost from './containers/posts/AddPost'
import SinglePost from './pages/SinglePost'
import Header from './layout/header/Header'
import AllPosts from './containers/posts/AllPosts'
import UsersPosts from './containers/posts/UsersPosts'
import UserLogin from './containers/login/UserLogin'
import verifyUser from './utils/verifyUser'
import { useEffect, useState } from 'react'
import ErrorPage from './components/ErrorPage/ErrorPage'
import { Toaster } from 'react-hot-toast'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = verifyUser()
    setUser(loggedUser)
    if (loggedUser) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])
  return (
    <>
      <Header setIsLoggedIn={setIsLoggedIn} user={user} />
      <div>
        <Toaster position='top-right' reverseOrder={false} />
      </div>

      <Routes>
        <Route path='/' element={<AllPosts />} />
        <Route path='/posts/:id' element={<SinglePost user={user} />} />
        <Route path='/users/posts/:id' element={<SinglePost user={user} />} />
        <Route path='/posts/' element={<AllPosts />} />
        <Route
          path='users/posts/'
          element={isLoggedIn ? <UsersPosts user={user} /> : <Navigate to='/users/login' />}
        />
        <Route
          path='/posts/add'
          element={isLoggedIn ? <AddPost user={user} /> : <Navigate to='/users/login' />}
        />
        <Route
          path='/users/login'
          element={isLoggedIn ? <Navigate to='/' /> : <UserLogin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path='/users/register' element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path='/users/:id'
          element={isLoggedIn ? <UserProfile user={user} /> : <Navigate to='/users/login' />}
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
