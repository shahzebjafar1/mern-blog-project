import { useEffect, useState } from "react"
import { getUserPostsAPI } from "../../api/apiHandler"
import {DisplayPosts} from "../../components/posts/"



const UsersPosts = (props) => {
    const [postData, setPostData] = useState([])
    const user = props?.user;

    useEffect(() => {
      getUserPostsAPI(user?.id)
        .then(res => setPostData(res.data))
        .catch(err => console.log(err))
    }, [user?.id])
  return (
    <div>
        <DisplayPosts data={postData}/>
    </div>
  )
}

export default UsersPosts
