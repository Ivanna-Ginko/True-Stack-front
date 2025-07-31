import React from 'react'
import { useLocation } from 'react-router-dom'
import UploadForm from '../../components/UploadForm/UploadForm'

const UploadPhoto = () => {
  const location = useLocation()
  const formData = location.state?.formData || {}
  return (
    <div>
      <UploadForm formData={formData} />
    </div>
  )
}

export default UploadPhoto