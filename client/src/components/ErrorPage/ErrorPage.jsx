import toast from 'react-hot-toast'

const ErrorPage = () => {
  //   toast('error')
  toast.error("This didn't work.")
  return (
    <div>
      <h1 className='text-primary    m-5'>There is nothing here: 404!</h1>
    </div>
  )
}

export default ErrorPage
