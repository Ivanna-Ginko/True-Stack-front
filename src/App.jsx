import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer.jsx'
import Outlet from './components/Outlet/Outlet.jsx'
import Header from './components/Header/Header.jsx'
import RegisterPage from './Pages/RegisterPage/RegisterPage.jsx'
import LoginPage from './Pages/LoginPage/LoginPage.jsx'
import ArticlesPage from './Pages/ArticlesPage/ArticlesPage.jsx'
import ArticlePage from './Pages/ArticlePage/ArticlePage.jsx'
import AuthorsPage from './Pages/AuthorsPage/AuthorsPage.jsx'
import AuthorProfilePage from './Pages/AuthorProfilePage/AuthorProfilePage.jsx'
import CreateArticlePage from './Pages/AuthorProfilePage/AuthorProfilePage.jsx'

function App() {

  return (
    <>

     <Header />
     <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Outlet />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:id" element={<ArticlePage />} />
      <Route path="/authors" element={<AuthorsPage />} />
      <Route path="/authors/:id" element={<AuthorProfilePage />} />
      <Route path="/create" element={<CreateArticlePage />} />
     </Routes>
     <Footer/>
    </>
  )
}

export default App
