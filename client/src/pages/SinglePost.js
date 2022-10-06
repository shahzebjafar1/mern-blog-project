import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { getCommentsAPI } from '../api/apiHandler'
import EditPost from '../containers/posts/EditPost'
import ManageComment from './ManageComment'
import NewComment from '../containers/comments/AddComment'
import PostDelete from '../containers/posts/DeletePost'
import toast from 'react-hot-toast'

const SinglePost = props => {

  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  // const [isCommentAdded, setIsCommentAdded] = useState(false)
  const [isPostEdited, setIsPostEdited] = useState(false)
  const user = props?.user
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/posts/${id}`)
      .then(res => {
        setPost(res.data.post)
        setComments(res.data.post.comment)
      })
      .catch(err => toast.error(err.response.data.message))
  }, [isPostEdited])


  // useEffect(() => {
  //   getCommentsAPI(id)
  //     .then(res => setComments(res.data))
  //     .catch(err => toast.error(err.response.data.message))
  // }, [isCommentAdded])

  return (
    <div>
      <div className='m-5 d-flex flex-column align-content-center'>
        <div className='mb-5'>
          <h2 className='text-primary'>{post.title?.toUpperCase()}</h2>
          <p className='mb-5'>{post.body}</p>
          {user && user.id === post.userId ? (
            <EditPost post={post} postEdited={setIsPostEdited} />
          ) : (
            ''
          )}
          {user && user.id === post.userId ? <PostDelete id={id} /> : ''}
        </div>
        <div className='mb-5 border p-3'>
          <h6 className='text-primary'> Add New Comment</h6>
          {user ? (
            <NewComment id={id} user={props.user} />
          ) : (
            <p className='m-5'>
              You are not Logged In. Please <Link to='/users/login'>Login</Link> First to add a
              comment
            </p>
          )}
        </div>

        <div className='mb-5 border p-3'>
          <h3 className='text-primary'> Recent Comments</h3>
          <div className='d-flex flex-column'>
            {comments.map(curr => (
              <div key={curr?.id}>
                {curr?.body ? (
                  <React.Fragment>
                    <p>{curr.body}</p>
                    <ManageComment key={curr.id} comment={curr} />
                    <hr />
                  </React.Fragment>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost
