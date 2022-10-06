
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { deletePostAPI } from '../../api/apiHandler'

const PostDelete = props => {
  const navigate = useNavigate()

  const handlePostDelete = () => {
    deletePostAPI(props.id)
      .then(() => {
        toast.success('Post Deleted Successfully')
        setTimeout(() => {
          navigate(-1)
        }, 1000)
      })
      .catch(err => toast.error(err.message))
  }
  return (
    <div>
      <button className='btn btn-danger' onClick={handlePostDelete}>
        Delete Post
      </button>
    </div>
  )
}

export default PostDelete
