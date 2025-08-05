import { useEffect, useState } from 'react';
import s from './AuthorProfilePage.module.css';
import Container from '../../components/container/Container';
import { useSelector } from 'react-redux';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useParams } from 'react-router-dom';
import {
  fetchArticles,
  fetchAuthorById,
  getSavedArticles,
} from '../../services/api';
import { selectIsLoggedIn, selectUser } from '../../redux/selectors';
import { ProfileTabs } from '../../components/ProfileTabs/ProfileTabs';
import { Loader } from '../../components/Loader/Loader.jsx';
import { toast } from 'react-toastify';
import PaginatedArticles from '../../components/PaginatedArticles/PaginatedArticles.jsx';

const AuthorProfilePage = () => {
  const title = 'My Profile';
  const { id: userId } = useParams();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const loggedInUserId = user.id;

  const isMyPage = isAuthenticated && loggedInUserId === userId;

  const [isLoading, setIsLoading] = useState(false);
  const [authorData, setAuthorData] = useState(null);
  const [createdArticles, setCreatedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [selectedTab, setSelectedTab] = useState('My Articles');
  const [totalItems, setTotalItems] = useState(0);
  const [totalItemsSaved, setTotalItemsSaved] = useState(0);

  const isSavedTab = selectedTab === 'Saved Articles';
  const perPage = 12;

  // 🔁 Нормализация данных
  const normalizeArticles = fetched => {
    const timestamp = Date.now();
    return fetched.map(item => {
      const id = item._id?.$oid || item._id;
      return {
        ...item,
        _id: id,
        _keySuffix: `${timestamp}-${Math.random().toString(36).slice(2, 6)}`,
      };
    });
  };

  useEffect(() => {
    const getAuthorData = async () => {
      try {
        setIsLoading(true);

        const res = await fetchAuthorById(userId);
        setAuthorData(res.data);
      } catch (error) {
        toast.warning('No author found', {
          style: {
            backgroundColor: 'rgba(209, 224, 216, 1)',
            color: '#333',
          },
        });
      } finally {
        setIsLoading(false);
      }
    };
    getAuthorData();
  }, [userId]);

  useEffect(() => {
    const fetchSaved = async () => {
      if (selectedTab === 'Saved Articles') {
        try {
          setIsLoading(true);

          const response = await getSavedArticles();
          const savedItems = Array.isArray(response.data) ? response.data : [];
          const normalizedSaved = normalizeArticles(savedItems);
          setSavedArticles(normalizedSaved);
          setTotalItemsSaved(response.pagination.totalItems);
        } catch (error) {
          toast.warning('No articles found', {
            style: {
              backgroundColor: 'rgba(209, 224, 216, 1)',
              color: '#333',
            },
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSaved();
  }, [selectedTab]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);

        const config = {
          params: {
            ownerId: userId,
          },
        };
        const response = await fetchArticles(config);
        const fetched = response.data.data.data;
        const normalizedCreated = normalizeArticles(fetched);
        setCreatedArticles(normalizedCreated);
        setTotalItems(response.data.data.totalItems);
      } catch (error) {
        toast.warning('No articles found', {
          style: {
            backgroundColor: 'rgba(209, 224, 216, 1)',
            color: '#333',
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [userId]);

  const loadArticles = async page => {
    const config = { params: { page, perPage } };

    try {
      if (isSavedTab && user.id === userId) {
        const res = await getSavedArticles(config);
        const items = Array.isArray(res.data) ? res.data : [];
        const normalizedArticles = normalizeArticles(items);

        console.log(normalizedArticles);

        setSavedArticles(as => [...as, ...normalizedArticles]);

        return normalizedArticles;
        // return normalizeArticles(items);
      } else {
        const res = await fetchArticles({
          ...config,
          params: { ownerId: userId, ...config.params },
        });
        const items = Array.isArray(res.data?.data?.data)
          ? res.data.data.data
          : [];
        const normalizedArticles = normalizeArticles(items);

        setCreatedArticles(as => [...as, ...normalizedArticles]);

        return normalizedArticles;
      }
    } catch (error) {
      console.error('loadArticles error:', error);
      return [];
    }
  };

  return (
    <div>
      <Container>
        {isLoading && <Loader />}
        <div className={s.box}>
          {isMyPage ? <SectionTitle title={title} /> : null}
          {authorData && (
            <div
              className={`${s.aboutAuthor} ${
                !isMyPage ? s.aboutAuthorShifted : ''
              }`}
            >
              <img
                className={s.authorAvatar}
                src={authorData.avatarUrl || null}
                alt={`Фото автора ${authorData.name}`}
              />
              <div className={s.authorInfo}>
                <h2 className={s.authorName}>{authorData.name}</h2>
                <p className={s.articlesAmount}>{totalItems} articles</p>
              </div>
            </div>
          )}
          {isMyPage ? (
            <ProfileTabs
              selectedTab={selectedTab}
              onSelectTab={setSelectedTab}
            />
          ) : null}
        </div>

        <div className={s.container}>
          {isMyPage && selectedTab === 'My Articles' && (
            <PaginatedArticles
              user={user}
              totalItems={totalItems}
              isLoading={isLoading}
              articles={createdArticles}
              loadArticles={loadArticles}
            />
          )}

          {isMyPage && selectedTab === 'Saved Articles' && (
            <PaginatedArticles
              user={user}
              totalItems={totalItemsSaved}
              isLoading={isLoading}
              articles={savedArticles}
              loadArticles={loadArticles}
            />
          )}

          {!isMyPage && (
            <PaginatedArticles
              user={user}
              totalItems={totalItems}
              isLoading={isLoading}
              articles={createdArticles}
              loadArticles={loadArticles}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default AuthorProfilePage;
