import { useFormik } from 'formik'
import { addCommentsAPI } from '../../api/apiHandler'
import { validateComment } from '../../utils/validateForm'
import AddComments from '../../components/comments/AddComments'
import toast from 'react-hot-toast'
import verifyUser from '../../utils/verifyUser'

const AddComment = props => {
  const user = verifyUser()
  const commentData = useFormik({
    initialValues: {
      post: props.id,
      body: '',
      author: user?._id
    },
    validate: validateComment,
    onSubmit: (values, { resetForm }) => {
      addCommentsAPI(props.id, values)
        .then(() => {
          props.setIsCommentAdded(prev => !prev)
          setTimeout(()=>toast.success('comment Added Successfully'),1000)

        })
        .catch(err => toast.error(err))

      resetForm({ values: '' })
    }
  })

  return <AddComments commentData={commentData} />
}

export default AddComment
