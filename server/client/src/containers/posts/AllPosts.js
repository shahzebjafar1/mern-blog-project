import { useEffect, useState } from 'react'
import { getAllPostsAPI } from '../../api/apiHandler'
import { DisplayPosts } from '../../components/posts/'

const AllPosts = () => {
  const [postData, setPostData] = useState([])

  useEffect(() => {
    getAllPostsAPI()
      .then(({data:{posts}}) => setPostData(posts))
      .catch(error => console.log(error))
  }, [])
  return (
    <div>
      <div>
        <DisplayPosts data={postData} />
      </div>
    </div>
  )
}

export default AllPosts
