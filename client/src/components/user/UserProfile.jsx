const UserProfile = props => {
  let user = props.user
// FIXME: On refresh page navigates to home
  return (
    <div>
      <div className='d-flex justify-content-center'>
        <div className='col m-5'>
          <div className='col-md-6 mb-3'>
            <label className='form-label'>User Id</label>
            <input
              type='text'
              name='title'
              className='form-control  border-bottom-1'
              readOnly
              value={user?._id}
            />
          </div>
          <div className='col-md-6 mb-3'>
            <label className='form-label'>User Name</label>
            <input
              type='text'
              name='title'
              className='form-control'
              readOnly
              value={user?.userName}
            />
          </div>
          <div className='col-md-6 mb-3'>
            <label className='form-label'>Email</label>
            <input type='text' name='title' className='form-control' readOnly value={user?.email} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
