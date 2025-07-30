import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import RegisterPage from './Pages/RegisterPage/RegisterPage.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import ArticlesPage from './Pages/ArticlesPage/ArticlesPage.jsx';
import ArticlePage from './Pages/ArticlePage/ArticlePage.jsx';
import AuthorsPage from './Pages/AuthorsPage/AuthorsPage.jsx';
import AuthorProfilePage from './Pages/AuthorProfilePage/AuthorProfilePage.jsx';
import CreateArticlePage from './Pages/AuthorProfilePage/AuthorProfilePage.jsx';
import UploadPhoto from './Pages/UploadPhoto/UploadPhoto.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from './redux/operations.js';
import HomePage from './Pages/HomePage/HomePage.jsx';
import { selectIsFetchingUser } from './redux/selectors.js';

function App() {
  const dispatch = useDispatch();
  const isFetchingUser = useSelector(selectIsFetchingUser);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isFetchingUser) return null;

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/register'
          element={<RegisterPage />}
        />
        <Route
          path='/photo'
          element={<UploadPhoto />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/articles'
          element={<ArticlesPage />}
        />
        <Route
          path='/articles/:id'
          element={<ArticlePage />}
        />
        <Route
          path='/authors'
          element={<AuthorsPage />}
        />
        <Route
          path='/authors/:id'
          element={<AuthorProfilePage />}
        />
        <Route
          path='/create'
          element={<CreateArticlePage />}
        />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
