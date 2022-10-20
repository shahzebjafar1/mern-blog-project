import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { usersLoginApi } from '../../api/apiHandler'
import Login from '../../components/login/Login'

const UserLogin = props => {
  const navigate = useNavigate()

  const userData = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      usersLoginApi(values.email, values.password)
        .then(({ data: { token, message } }) => {
          localStorage.setItem('user', token)
          props.setIsLoggedIn(true)
          toast.success(message)
          setTimeout(() => {
            navigate('/posts')
          }, 1000)
        })
        .catch(err => toast.error(err.response.data.message))
    }
  })
  return <Login userData={userData} />
}

export default UserLogin

// if (res.data[0]) {
//   localStorage.setItem('user', JSON.stringify(res.data[0]));
//   props.setIsLoggedIn(true);
//   toast.success('User Logged In Successfully')
//   setTimeout(() => {
//     navigate('/posts')
//   }, 0)
// } else {
//   toast.error('Incorrect Email or Password')
// }
