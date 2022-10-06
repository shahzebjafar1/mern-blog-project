import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { editPostAPI } from '../../api/apiHandler'
import PostEditModal from '../../components/modal/PostEditModal'
import { validatePost } from '../../utils/validateForm'

const EditPost = props => {
  const postData = useFormik({
    initialValues: {
      title: props.post.title,
      body: props.post.body,
      userId: props.post.userId
    },
    validate: validatePost,
    onSubmit: (values, { resetForm }) => {
      editPostAPI(props.post.id, values)
        .then(() => {
          props.postEdited(prev => !prev)
          toast.success("Posted Updated Successfully")
        })
        .catch(err => toast.error(err.message))

      resetForm({ values: '' })
    }
  })

  return (
    <PostEditModal postData={postData} />
  )
}

export default EditPost
