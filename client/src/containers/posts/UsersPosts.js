import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getUserPostsAPI } from '../../api/apiHandler'
import { DisplayPosts } from '../../components/posts/'

const UsersPosts = ({ user }) => {
  const [postData, setPostData] = useState([])

  useEffect(() => {
    getUserPostsAPI({userId:user?._id})
      .then(({data:{posts}}) => setPostData(posts))
      .catch(err => toast.error(err))
  }, [user?.id])
  return (
    <div>
      <DisplayPosts data={postData} />
    </div>
  )
}

export default UsersPosts
