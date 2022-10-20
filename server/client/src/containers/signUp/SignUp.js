import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { usersSignUpApi } from '../../api/apiHandler'
import UserSignUp from '../../components/signup/UserSignUp'
import { validateSignUp } from '../../utils/validateForm'

const SignUp = props => {
  const navigate = useNavigate()

  const userSignup = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: ''
    },
    validate: validateSignUp,
    onSubmit: (values, { resetForm }) => {
      usersSignUpApi(values)
        .then(({ data: { token, message } })  => {
          localStorage.setItem('user', token)
          props.setIsLoggedIn(true)

          resetForm({ values: '' })
          toast.success(message)
          setTimeout(() => navigate('/posts'), 0)
        })
        // FIXME: Fix validation Error  messsage
        .catch(err => {
          toast.error('Validation Error')
          console.log(err)
        })
    }
  })
  return (
    <div>
      <UserSignUp data={userSignup} />
    </div>
  )
}

export default SignUp
