import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { addPostAPI } from '../../api/apiHandler'
import { PostAdd } from '../../components/posts'

const AddPost = ({ user }) => {
  const navigate = useNavigate()

  const postData = useFormik({
    initialValues: {
      title: '',
      body: '',
      author: user?._id
    },
    validate: values => {
      const errors = {}

      if (!values.title) {
        errors.title = 'Post Title Is Required'
      }

      if (!values.body) {
        errors.body = 'Required'
      }

      return errors
    },
    onSubmit: (values, { resetForm }) => {
      addPostAPI(values)
        .then(() => {
          toast.success('Post Added Successfully')
          navigate('/users/posts')
        })
        .catch(err => toast.error(err.response.data.message))

      resetForm({ values: '' })
    }
  })
  return (
    <div>
      <PostAdd postData={postData} />
    </div>
  )
}

export default AddPost
