import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCommentsAPI,getPostByIdAPI } from '../api/apiHandler'
import EditPost from '../containers/posts/EditPost'
import ManageComment from './ManageComment'
import NewComment from '../containers/comments/AddComment'
import PostDelete from '../containers/posts/DeletePost'
import toast from 'react-hot-toast'

const SinglePost = props => {
  const navigate = useNavigate()

  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [isCommentAdded, setIsCommentAdded] = useState(false)
  const [isPostEdited, setIsPostEdited] = useState(false)
  const user = props?.user
  const { id } = useParams()

  useEffect(() => {
    getPostByIdAPI(id)
      .then(res => {
        setPost(res.data.post)
        setComments(res.data.post.comment)
      })
      .catch(err => {
        toast.error(err.response.data.message)
        navigate('/')
      })
  }, [isPostEdited])

  useEffect(() => {
    getCommentsAPI(id)
      .then(({ data: { comments } }) => setComments(comments))
      .catch(err => toast.error(err.response.data.message))
  }, [isCommentAdded])

  return (
    <div>
      <div className='m-5 d-flex flex-column align-content-center'>
        {post.title ? (
          <div className='mb-5'>
            <h2 className='text-primary'>{post?.title?.toUpperCase()}</h2>
            <p className='mb-5'>{post?.body}</p>
            {user?._id && user?._id === post.author ? (
              <EditPost post={post} postEdited={setIsPostEdited} />
            ) : (
              ''
            )}
            {user?._id && user?._id === post.author ? <PostDelete id={id} /> : ''}
          </div>
        ) : (
          ''
        )}

        <div className='mb-5 border p-3'>
          <h6 className='text-primary'> Add New Comment</h6>
          {user?.userName ? (
            <NewComment id={id} user={user} setIsCommentAdded={setIsCommentAdded} />
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
            {comments?.map(curr => (
              <div key={curr?.id}>
                {curr?.body ? (
                  <React.Fragment>
                    <div className='d-flex justify-content-between'>
                      <p>{curr?.body}</p>
                      <p>By: {curr?.author?.userName?.toUpperCase() || 'Nil'}</p>
                    </div>
                    {(user?._id === curr.author._id) || user?._id === post?.author ? (
                      <ManageComment
                        key={curr.id}
                        comment={curr}
                        deleteComment={!(user?._id === curr.author._id) && (user?._id === post?.author)}
                        setIsCommentAdded={setIsCommentAdded}
                      />
                    ) : (
                      ''
                    )}
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

