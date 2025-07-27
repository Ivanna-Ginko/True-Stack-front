import React from 'react'

const Header = () => {
  const isAuthenticated = useSelector(state => state.user?.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  return (
    <h1>Header</h1>
  )
}

export default Header