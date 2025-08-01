import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { registerUser } from '../../redux/operations'
import { selectUser } from '../../redux/selectors'
import Container from '../container/Container'
import s from './UploadForm.module.css'
import placeholderImg from '../../assets/images/normal/UploadPhoto/up-camera-test.png'
import closeIcon from '../../assets/icons/close.svg'
import { toast } from 'react-toastify'

const UploadForm = ({ formData }) => {
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(selectUser)
  const isLoading = useSelector(state => state.user.isLoading)
  const error = useSelector(state => state.user.error)

  // Restore preserved photo if available
  useEffect(() => {
    if (location.state?.preservedPhoto) {
      setImage(location.state.preservedPhoto.image)
      setFile(location.state.preservedPhoto.file)
    }
  }, [location.state])

  // Redirect to home on success
  useEffect(() => {
    if (!isLoading && user.id) {
      navigate('/')
    }
  }, [isLoading, user.id, navigate])

  // Show toast and redirect to /register on backend error
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      navigate('/register', { state: { formData, image, file } })
    }
  }, [error, navigate, formData, image, file])

  const handleImageClick = () => {
    inputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error('Image must be less than 1MB.')
        return
      }
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) {
      toast.error('No file selected!')
      return
    }
    // Prepare FormData for dispatch
    const formDataInstance = new FormData()
    // Append registration fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataInstance.append(key, value)
    })
    // Append avatar file
    formDataInstance.append('avatar', file)
    dispatch(registerUser(formDataInstance))
  }

  const skipAvatar = () => {
    const formDataInstance = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      formDataInstance.append(key, value)
    })

    formDataInstance.append('avatar', '')

    dispatch(registerUser(formDataInstance))
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} className={s.up_form}>
        <div className={s.up_container}>
          <h1 className={s.up_header}>Upload your photo</h1>
          <div className={s.up_inner_container}>
            <input
              ref={inputRef}
              className={s.up_photo_input}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <img
              src={image || placeholderImg}
              alt="Upload preview"
              className={s.up_image_upload}
              onClick={handleImageClick}
            />
          </div>
          <button disabled={!image} className={s.up_submit_btn} type='submit'>Save</button>
          <button className={s.up_close_button} type="button" onClick={skipAvatar}>
            <img src={closeIcon} alt="Close" width="24" height="24" />
          </button>
        </div>
      </form>
    </Container>
  )
}

export default UploadForm