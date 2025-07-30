import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../redux/operations'
import { selectUser, selectIsLoading } from '../../redux/selectors'
import Container from '../container/Container'
import s from './UploadForm.module.css'
import placeholderImg from '../../assets/images/normal/UploadPhoto/up-camera-test.png'
import closeIcon from '../../assets/icons/close.svg'

const UploadForm = ({ formData }) => {
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectIsLoading)

  // Redirect to home page after successful registration (when not loading state changes and user has an id)
  useEffect(() => {
    if (!isLoading && user.id) {
      navigate('/')
    }
  }, [isLoading, user.id, navigate])

  const handleImageClick = () => {
    inputRef.current.click()
  }
  /* MAX 1MB IMAGE SIZE */
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
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
      //  here will be toast
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

  return (
    <Container>
      <form onSubmit={handleSubmit}>
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
          <button className={s.up_close_button} type="button">
            <img src={closeIcon} alt="Close" width="24" height="24" />
          </button>
        </div>
      </form>
    </Container>
  )
}

export default UploadForm