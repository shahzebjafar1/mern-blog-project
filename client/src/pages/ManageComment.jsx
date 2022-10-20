import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { deleteCommentsAPI, editCommentsAPI } from '../api/apiHandler'

const ManageComment = props => {
  const [commentBody, setCommentBody] = useState(props?.comment?.body)

  const updateComment = () => {
    editCommentsAPI(props.comment.post, props.comment._id, {
      body: commentBody,
      author: props.comment.author,
      post: props.comment.post
    })
      .then(() => {
        props.setIsCommentAdded(prev => !prev)
        setTimeout(()=> toast.success('Comment Updated Successfully'),1000)
      })
      .catch(err => toast.error(err))
  }

  const deleteCommentHandler = () => {
    deleteCommentsAPI(props.comment.post, props.comment.id)
      .then(() => {
        props.setIsCommentAdded(prev => !prev)
        setTimeout(()=> toast.success('Comment Deleted Successfully'),1000)
      })
      .catch(err => toast.error(err.message))
  }

  return (
    <div>
      {/* Modal */}
      <div
        className='modal fade'
        id='commentModal'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Update Comment
              </h5>
              <button
                type='button'
                className='close p-2 btn btn-danger'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <label htmlFor='exampleFormControlTextarea1' className='form-label'>
                Comment
              </label>
              <input
                type='text'
                name='title'
                className='form-control'
                id='commentBody'
                value={commentBody}
                onChange={e => setCommentBody(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={updateComment}
                data-dismiss='modal'
              >
                Update Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex'>
        <Link to='' className=' mx-3' data-toggle='modal' data-target='#commentModal'>
          Edit
        </Link>
        <Link to='' className='text-danger mx-3' onClick={deleteCommentHandler}>
          Delete
        </Link>
      </div>
    </div>
  )
}

export default ManageComment
