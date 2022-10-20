import { Link } from 'react-router-dom'
import logo from '../../assets/SVG/logo.svg'

const PostCard = props => {
  const post = props.data

  return (
    <div>
      <div className='row '>
        <div className='col-md-12 h-100'>
          <div className='card' style={{ width: '18rem' }}>
            <img src={logo} className='card-img-top' alt='...' />
            <div className='card-body d-flex flex-column justify-content-center'>
              <h5 className='card-title text-primary text-center '>{post.title?.toUpperCase()}</h5>
              <p className='card-text text-center text-truncate'>{post?.body}</p>
              <Link to={`${post.id}`} className='btn btn-primary text-center'>
                View Post
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
