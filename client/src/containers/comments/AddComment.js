import { useFormik } from 'formik'
import { addCommentsAPI } from '../../api/apiHandler'
import { validateComment } from '../../utils/validateForm'
import AddComments from '../../components/comments/AddComments'
import toast from 'react-hot-toast'

const AddComment = props => {
  const user = props.user;
  const commentData = useFormik({
    initialValues: {
      body: '',
      userId: user?.id,
      postId: props.id
    },
    validate: validateComment,
    onSubmit: (values, { resetForm }) => {
      addCommentsAPI(values)
        .then(() => {
          props.checkComment(prev => !prev)
          toast.success("comment Added Successfully")
        })
        .catch(err => toast.error(err.message))

      resetForm({ values: '' })
    }
  })

  return (

    <AddComments commentData={commentData} />

  )
}

export default AddComment
