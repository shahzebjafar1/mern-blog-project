import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import verifyUser from '../../utils/verifyUser'

const Header = props => {
  const user = verifyUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    props.setIsLoggedIn(false)
    toast.success('User logged Out Successfully')
    setTimeout(() => {
      navigate('/posts')
    }, 0)
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light ' style={{ backgroundColor: '#e3f2fd' }}>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/posts'>
            My Blog
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link to='/posts' className='nav-link active' aria-current='page' href='#'>
                  All Posts
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/users/posts/'} className='nav-link' href='#'>
                  My Posts
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={`/users/${user?._id}`} className='nav-link' href='#'>
                  My Profile
                </Link>
              </li>
            </ul>
            <form>
              <Link to='/posts/add' className='btn btn-outline-success mx-3' type='submit'>
                Add Post
              </Link>
              {user ? (
                <Link to='' className='btn btn-outline-danger' type='button' onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <Link to='/users/login' className='btn btn-outline-primary ' type='button'>
                  Login
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
