

const PostEditModal = (props) => {
  return (
    <div>
      {/* Button trigger modal */}
      <button
        type='button'
        className='btn btn-primary mb-3'
        data-toggle='modal'
        data-target='#exampleModalCenter'
      >
        Edit Post
      </button>

      {/* Modal */}
      <div
        className='modal fade'
        id='exampleModalCenter'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='false'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Edit Post
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
            <form onSubmit={props.postData.handleSubmit}>
              <div className='modal-body'>
                <div className='m-5 '>
                  <div className=' mb-3'>
                    <label htmlFor='exampleFormControlInput1' className='form-label'>
                      Post Title
                    </label>
                    <input
                      type='text'
                      name='title'
                      className='form-control'
                      id='exampleFormControlInput1'
                      value={props.postData.values.title}
                      onChange={props.postData.handleChange}
                      onBlur={props.postData.handleBlur}
                    />
                    {props.postData.errors.title && props.postData.touched.title ? (
                      <p className='text-danger'>{props.postData.errors.title}</p>
                    ) : null}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='pbody' className='form-label'>
                      Post Body
                    </label>
                    <textarea
                      name='body'
                      className='form-control'
                      id='pbody'
                      rows={5}
                      value={props.postData.values.body}
                      onChange={props.postData.handleChange}
                      onBlur={props.postData.handleBlur}
                    />
                    {props.postData.errors.body && props.postData.touched.body ? (
                      <p className='text-danger'> {props.postData.errors.body}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>
                  Close
                </button>
                <button type='submit' className='btn btn-primary'>
                  Update Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostEditModal
