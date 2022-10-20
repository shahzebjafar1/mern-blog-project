import jwt_decode from 'jwt-decode'
const verifyUser = () => {
  let decodedUser
  if (localStorage?.getItem('user')) {
    const { user } = jwt_decode(localStorage?.getItem('user'))
    decodedUser = user
  }
  return decodedUser
}

export default verifyUser
