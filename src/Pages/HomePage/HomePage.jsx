import React from 'react'
// import { useSelector } from 'react-redux'
// import { selectUser } from '../../redux/selectors'
import Hero from '../../components/Hero/Hero'
import About from '../../components/About/About'
import PopularArticles from '../../components/PopularArticles/PopularArticles'
import TopCreators from '../../components/TopCreators/TopCreators'

const Outlet = () => {
  // const user = useSelector(selectUser)
  return (
    <>
      {/* TEST BLOCK */}
      {/*   {user && user.id && (
        <div style={{ background: '#f0f0f0', padding: 16, marginBottom: 16, borderRadius: 8 }}>
          <strong>User Info:</strong><br />
          <span>ID: {user.id}</span><br />
          <span>Name: {user.name}</span><br />
          {user.avatar && (
            <img src={user.avatar} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', marginTop: 8 }} />
          )}
        </div>
      )} */}
      <Hero />
      <About />
      <PopularArticles />
      <TopCreators />
    </>
  )
}

export default Outlet