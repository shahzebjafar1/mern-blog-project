import Spinner from '../spinner/Index'
import PostCard from './PostCard'

const DisplayPosts = props => {
  return (
    <div>
      <div className='row'>
        {props.data.length ? (
          props.data?.map(curr => {
            return (
              <div key={curr.id} className='col-md-3 p-3 d-flex justify-content-center'>
                <PostCard data={curr} />
              </div>
            )
          })
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default DisplayPosts
