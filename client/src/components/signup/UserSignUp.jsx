import { Link } from 'react-router-dom'
import '../../styles/login.css'
const UserSignUp = props => {
  return (
    <div>
      <div className='login-body'>
        <div className='container '>
          <div className='screen'>
            <div className='screen__content'>
              <form className='register' onSubmit={props.data.handleSubmit}>
                <div className='login__field'>
                  <i className='login__icon fas fa-user' />
                  <input
                    type='text'
                    name='userName'
                    className='login__input'
                    placeholder='username'
                    value={props.data.values.userName}
                    onChange={props.data.handleChange}
                  />
                  {props.data.errors.userName ? <div>{props.data.errors.userName}</div> : null}
                </div>

                <div className='login__field'>
                  <i className='login__icon fas fa-user' />
                  <input
                    type='email'
                    name='email'
                    className='login__input'
                    placeholder='Email'
                    value={props.data.values.email}
                    onChange={props.data.handleChange}
                  />
                </div>
                {props.data.errors.email ? <div>{props.data.errors.email}</div> : null}

                <div className='login__field'>
                  <i className='login__icon fas fa-lock' />
                  <input
                    type='password'
                    name='password'
                    className='login__input'
                    placeholder='Password'
                    value={props.data.values.password}
                    onChange={props.data.handleChange}
                  />
                </div>
                {props.data.errors.password ? <div>{props.data.errors.password}</div> : null}

                <button type='submit' className='button login__submit'>
                  <span className='button__text'>Register</span>
                  <i className='button__icon fas fa-chevron-right' />
                </button>

                <Link to='/users/login' type='button' className='button  login__submit'>
                  <span className='button__text'>Log In Now</span>
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

export default UserSignUp
