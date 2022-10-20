export const validatePost = (values) => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Post Title Is Required'
    }

    if (!values.body) {
        errors.body = 'Required'
    }

    return errors
}


export const validateComment = (values) => {

    const errors = {}
    if (!values.body) {
        errors.body = 'Comment is Required'
    }
    return errors
}


export const validateSignUp=values => {
    const errors = {}

    if (!values?.userName) {
      errors.userName = 'Required'
    } else if (values?.userName.length > 15) {
      errors.userName = 'Must be 15 characters or less'
    }

    if (!values?.password) {
      errors.password = 'Required'
    } else if (values?.password.length > 20) {
      errors.password = 'Must be 20 characters or less'
    }

    if (!values?.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }
