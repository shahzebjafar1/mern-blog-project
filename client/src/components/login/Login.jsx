import { Link } from 'react-router-dom'
import '../../styles/login.css'

const Login = props => {
  return (
    <div>
      <div className='login-body'>
        <div className='container '>
          <div className='screen'>
            <div className='screen__content'>
              <form className='login' onSubmit={props.userData.handleSubmit}>
                <div className='login__field'>
                  <i className='login__icon fas fa-user' />
                  <input
                    type='text'
                    name='email'
                    className='login__input'
                    placeholder='email'
                    onChange={props.userData.handleChange}
                    value={props.userData.values.email}
                  />
                </div>

                <div className='login__field'>
                  <i className='login__icon fas fa-lock' />
                  <input
                    type='password'
                    name='password'
                    className='login__input'
                    placeholder='Password'
                    onChange={props.userData.handleChange}
                  />
                </div>

                <button type='submit' className='button  login__submit'>
                  <span className='button__text'>Log In Now</span>
                  <i className='button__icon fas fa-chevron-right' />
                </button>

                <Link to='/users/register' type='button' className='button login__submit'>
                  <span className='button__text'>Register</span>
                  <i className='button__icon fas fa-chevron-right' />
                </Link>
              </form>
            </div>
            <div className='screen__background'>
              <span className='screen__background__shape screen__background__shape4' />
              <span className='screen__background__shape screen__background__shape3' />
              <span className='screen__background__shape screen__background__shape2' />
              <span className='screen__background__shape screen__background__shape1' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
