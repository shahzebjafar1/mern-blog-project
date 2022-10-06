const PostAdd = props => {
  return (
    <div>
      <form className='register' onSubmit={props.postData.handleSubmit}>
        <div className='d-flex justify-content-center'>
          <div className='col m-5 '>
            <h1 className='text-primary mb-5'>Add Post</h1>
            <div className='col-md-6 mb-3'>
              <label htmlFor='exampleFormControlTextarea1' className='form-label'>
                Post Title{' '}
              </label>
              <input
                type='text'
                name='title'
                className='form-control'
                id='postTitle'
                value={props.postData.values.title}
                onChange={props.postData.handleChange}
                onBlur={props.postData.handleBlur}
              />
              {props.postData.errors.title && props.postData.touched.title ? (
                <p className='text-danger'>{props.postData.errors.title}</p>
              ) : null}
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor='exampleFormControlTextarea1' className='form-label'>
                Post Body
              </label>
              <textarea
                name='body'
                className='form-control'
                id='postBody'
                rows={5}
                value={props.postData.values.body}
                onChange={props.postData.handleChange}
                onBlur={props.postData.handleBlur}
              />

              {props.postData.errors.body && props.postData.touched.body ? (
                <p className='text-danger'> {props.postData.errors.body}</p>
              ) : null}
            </div>

            <button type='submit' className='btn btn-outline-primary'>
              Add Post
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PostAdd
