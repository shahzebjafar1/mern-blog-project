const AddComments = props => {
  return (
    <div>
      <form className='row g-3' onSubmit={props.commentData.handleSubmit}>
        <div className='col-md-6'>
          <input
            type='text'
            name='body'
            className='form-control'
            id='inputPassword2'
            placeholder='Your Comment...'
            value={props.commentData.values.body}
            onChange={props.commentData.handleChange}
            onBlur={props.commentData.handleBlur}
          />
          {props.commentData.errors.body && props.commentData.touched.body ? (
            <p className='text-danger'> {props.commentData.errors.body}</p>
          ) : null}
        </div>
        <div className='col-auto'>
          <button type='submit' className='btn btn-primary mb-3'>
            Add Comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddComments
