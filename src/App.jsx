import { Routes, Route } from 'react-router-dom';
// import RegisterPage from './Pages/RegisterPage/RegisterPage.jsx';
// import LoginPage from './Pages/LoginPage/LoginPage.jsx';
// import ArticlesPage from './Pages/ArticlesPage/ArticlesPage.jsx';
// import ArticlePage from './Pages/ArticlePage/ArticlePage.jsx';
// import AuthorsPage from './Pages/AuthorsPage/AuthorsPage.jsx';
// import AuthorProfilePage from './Pages/AuthorProfilePage/AuthorProfilePage.jsx';
// import CreateArticlePage from './Pages/CreateArticlePage/CreateArticlePage.jsx';
// import UploadPhoto from './Pages/UploadPhoto/UploadPhoto.jsx';
// import HomePage from './Pages/HomePage/HomePage.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';
import { getUserData } from './redux/operations.js';
import { selectIsFetchingUser } from './redux/selectors.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout.jsx';
import { Loader } from './components/Loader/Loader.jsx';

const RegisterPage = lazy(() =>
  import('./Pages/RegisterPage/RegisterPage.jsx')
);
const LoginPage = lazy(() => import('./Pages/LoginPage/LoginPage.jsx'));
const ArticlesPage = lazy(() =>
  import('./Pages/ArticlesPage/ArticlesPage.jsx')
);
const ArticlePage = lazy(() => import('./Pages/ArticlePage/ArticlePage.jsx'));
const AuthorsPage = lazy(() => import('./Pages/AuthorsPage/AuthorsPage.jsx'));
const AuthorProfilePage = lazy(() =>
  import('./Pages/AuthorProfilePage/AuthorProfilePage.jsx')
);
const CreateArticlePage = lazy(() =>
  import('./Pages/CreateArticlePage/CreateArticlePage.jsx')
);
const UploadPhoto = lazy(() => import('./Pages/UploadPhoto/UploadPhoto.jsx'));
const HomePage = lazy(() => import('./Pages/HomePage/HomePage.jsx'));

import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

function App() {
  const dispatch = useDispatch();
  const isFetchingUser = useSelector(selectIsFetchingUser);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  if (isFetchingUser) return null;

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
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
              <Route element={<PrivateRoute />}>
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
              </Route>
          </Routes>
        </Suspense>
      </Layout>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        theme='colored'
      />
    </>
  );
}

export default App;
